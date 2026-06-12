# frozen_string_literal: true

require 'json'
require 'fileutils'

module Jekyll
  module TopicGraphHelpers
    module_function

    def tag_slug(name)
      name.to_s.downcase.tr(' ', '-')
    end

    def tag_id(name)
      tag_slug(name)
    end
  end

  class TopicGraphGenerator < Generator
    safe true
    priority :lowest

    def generate(site)
      builder = TopicGraphBuilder.new(site)
      graph = builder.build
      path = File.join(site.source, 'assets', 'data', 'topic-graph.json')
      FileUtils.mkdir_p(File.dirname(path))
      File.write(path, JSON.generate(graph))
      Jekyll.logger.info 'TopicGraph:', "Wrote #{path} (#{graph['nodes'].size} nodes, #{graph['edges'].size} edges)"
    end
  end

  class TopicGraphBuilder
    include TopicGraphHelpers

    DESKTOP = { width: 880, height: 520, cx: 440, cy: 260, spread: 210 }.freeze
    MOBILE  = { width: 360, height: 420, cx: 180, cy: 210, spread: 130 }.freeze
    MIN_R = 14
    MAX_R = 34

    def initialize(site)
      @site = site
    end

    def build
      nodes = build_nodes
      edges = build_edges(nodes)
      layout_desktop = compute_layout(nodes, edges, DESKTOP)
      layout_mobile = compute_layout(nodes, edges, MOBILE)

      nodes.each do |node|
        d = layout_desktop[node['id']]
        m = layout_mobile[node['id']]
        node['x'] = d[:x].round(1)
        node['y'] = d[:y].round(1)
        node['xMobile'] = m[:x].round(1)
        node['yMobile'] = m[:y].round(1)
      end

      {
        'nodes' => nodes,
        'edges' => edges,
        'postsByTopic' => posts_by_topic
      }
    end

    private

    def build_nodes
      max_count = @site.tags.values.map(&:size).max.to_f
      max_count = 1 if max_count.zero?

      @site.tags.map do |name, posts|
        count = posts.size
        t = count / max_count
        radius = (MIN_R + t * (MAX_R - MIN_R)).round(1)
        {
          'id' => tag_id(name),
          'label' => name,
          'count' => count,
          'url' => "/tag/#{tag_slug(name)}/",
          'r' => radius
        }
      end.sort_by { |n| [-n['count'], n['label']] }
    end

    def build_edges(nodes)
      ids = {}
      nodes.each { |node| ids[node['id']] = true }
      weights = Hash.new(0)

      @site.posts.docs.each do |post|
        slugs = Array(post.data['tags']).map { |t| tag_id(t) }.uniq
        slugs.combination(2).each do |a, b|
          key = [a, b].sort.join('|')
          weights[key] += 1
        end
      end

      weights.map do |key, weight|
        next if weight < 1

        source, target = key.split('|')
        next unless ids[source] && ids[target]

        { 'source' => source, 'target' => target, 'weight' => weight }
      end.compact.sort_by { |e| [-e['weight'], e['source'], e['target']] }
    end

    def posts_by_topic
      result = {}
      @site.tags.each do |name, posts|
        sorted = posts.sort_by { |p| -p.date.to_f }
        result[tag_id(name)] = sorted.first(25).map { |p| post_ref(p) }
      end
      result
    end

    def post_ref(post)
      {
        't' => post.data['title'].to_s,
        'u' => post.url.to_s,
        'd' => post.date.strftime('%Y-%m-%d')
      }
    end

    def compute_layout(nodes, edges, canvas)
      positions = {}
      n = nodes.size
      nodes.each_with_index do |node, i|
        angle = (2 * Math::PI * i) / n
        positions[node['id']] = {
          x: canvas[:cx] + canvas[:spread] * Math.cos(angle),
          y: canvas[:cy] + canvas[:spread] * Math.sin(angle),
          vx: 0,
          vy: 0
        }
      end

      id_to_node = {}
      nodes.each { |node| id_to_node[node['id']] = node }
      edge_list = edges.map do |edge|
        {
          source: edge['source'],
          target: edge['target'],
          weight: edge['weight']
        }
      end

      120.times do
        edge_list.each do |edge|
          a = positions[edge[:source]]
          b = positions[edge[:target]]
          next unless a && b

          dx = b[:x] - a[:x]
          dy = b[:y] - a[:y]
          dist = Math.sqrt((dx * dx) + (dy * dy))
          dist = 0.01 if dist < 0.01
          force = (dist - 90) * 0.04 * edge[:weight]
          fx = (dx / dist) * force
          fy = (dy / dist) * force
          a[:vx] += fx
          a[:vy] += fy
          b[:vx] -= fx
          b[:vy] -= fy
        end

        nodes.combination(2).each do |na, nb|
          a = positions[na['id']]
          b = positions[nb['id']]
          dx = b[:x] - a[:x]
          dy = b[:y] - a[:y]
          dist_sq = (dx * dx) + (dy * dy)
          dist_sq = 0.01 if dist_sq < 0.01
          repulse = 9000.0 / dist_sq
          dist = Math.sqrt(dist_sq)
          fx = (dx / dist) * repulse
          fy = (dy / dist) * repulse
          a[:vx] -= fx
          a[:vy] -= fy
          b[:vx] += fx
          b[:vy] += fy
        end

        positions.each do |id, p|
          node = id_to_node[id]
          radius = node ? node['r'] : MIN_R
          p[:x] += p[:vx]
          p[:y] += p[:vy]
          p[:vx] *= 0.85
          p[:vy] *= 0.85
          p[:x] = [[radius + 8, p[:x]].max, canvas[:width] - radius - 8].min
          p[:y] = [[radius + 8, p[:y]].max, canvas[:height] - radius - 8].min
        end
      end

      positions.transform_values { |p| { x: p[:x], y: p[:y] } }
    end
  end
end
