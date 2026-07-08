#!/usr/bin/env ruby
# frozen_string_literal: true

# Blog Post Integration Tests
#
# Verifies that:
#   1. Every post in _posts/ actually builds into a page in _site/ (matched
#      via _site/search.json, which Jekyll generates from site.posts - the
#      authoritative list of what actually built, since post URLs are
#      slugified by Jekyll and shouldn't be re-derived by hand in a test).
#   2. Every internal link inside a post's rendered content resolves to a
#      page that exists in _site/ (catches dead links like a post linking
#      to a URL that doesn't match the site's real permalink structure).
#   3. No post repeats the same top-level (h2) heading twice (catches
#      content that got accidentally duplicated, e.g. via an {% include %}
#      that repeats a section already written in the post body).
#
# Prerequisites: run `jekyll build` (or `bundle exec jekyll build`) before
# executing these tests so the _site/ directory is up to date.
#
# Usage:
#   ruby test/post_test.rb
#   # or via rake:
#   bundle exec rake test

require 'minitest/autorun'
require 'nokogiri'
require 'json'
require 'set'
require 'cgi'
require_relative 'test_helper'

# ---------------------------------------------------------------------------
# Helper: title + date for every post in _posts/
# ---------------------------------------------------------------------------
def posts_from_source
  Dir.glob(File.join(POSTS_DIR, '*.md')).map do |path|
    content = read_utf8(path)
    front_matter = content.match(/\A---\n(.*?)---/m)
    block = front_matter ? front_matter[1] : ''

    title_match = block.match(/^title:\s*["']?(.+?)["']?\s*$/)
    title = title_match ? title_match[1] : File.basename(path)

    date_match = File.basename(path).match(/\A(\d{4}-\d{1,2}-\d{1,2})-/)
    date = date_match ? date_match[1] : nil

    { path: path, title: title, date: date }
  end
end

# ---------------------------------------------------------------------------
# Helper: authoritative { title => url } map of everything that actually
# built, straight from Jekyll's own site.posts loop.
# ---------------------------------------------------------------------------
def built_posts
  search_json = File.join(SITE_DIR, 'search.json')
  return [] unless File.exist?(search_json)

  # search.json runs post titles through Liquid's `escape` filter, so
  # unescape before comparing against titles read straight from front matter.
  JSON.parse(read_utf8(search_json)).each do |post|
    post['title'] = CGI.unescapeHTML(post['title'])
  end
end

def internal_link?(href)
  return false if href.nil? || href.empty?
  return false if href.start_with?('#', 'mailto:', 'tel:', 'javascript:')
  return false if href.start_with?('//')
  return false if href =~ %r{\Ahttps?://}

  href.start_with?('/')
end

def asset_link?(href)
  href =~ /\.(css|js|png|jpe?g|gif|svg|ico|xml|json|pdf|txt|webmanifest|woff2?|ttf|mp4|zip)\z/i
end

def resolve_internal_link(href)
  path = href.split('#').first.split('?').first
  return true if path.nil? || path.empty? || path == '/'

  relative = path.sub(%r{\A/}, '')
  candidates = [
    File.join(SITE_DIR, relative),
    File.join(SITE_DIR, "#{relative}.html"),
    File.join(SITE_DIR, relative, 'index.html')
  ]
  candidates.any? { |c| File.exist?(c) && !File.directory?(c) }
end

# ---------------------------------------------------------------------------
class PostBuildTest < Minitest::Test
  def test_every_post_produces_a_site_page
    posts = posts_from_source
    assert !posts.empty?, 'No posts found in _posts/.'

    built = built_posts
    assert !built.empty?, 'No posts found in _site/search.json. Run `jekyll build` first.'

    missing = posts.reject do |post|
      built.any? { |b| b['title'] == post[:title] }
    end

    assert missing.empty?,
           "Post(s) in _posts/ did not build into a page (missing from search.json):\n" +
           missing.map { |p| "  #{File.basename(p[:path])} (title: #{p[:title]})" }.join("\n")
  end

  def test_every_built_post_page_exists_on_disk
    built = built_posts
    assert !built.empty?, 'No posts found in _site/search.json. Run `jekyll build` first.'

    missing = built.reject { |post| resolve_internal_link(post['url']) }

    assert missing.empty?,
           "Post(s) listed in search.json have no corresponding file in _site/:\n" +
           missing.map { |p| "  #{p['title']} -> #{p['url']}" }.join("\n")
  end
end

# ---------------------------------------------------------------------------
class PostLinkIntegrityTest < Minitest::Test
  def test_internal_links_in_posts_resolve
    built = built_posts
    assert !built.empty?, 'No posts found in _site/search.json. Run `jekyll build` first.'

    failures = []

    built.each do |post|
      relative = post['url'].sub(%r{\A/}, '')
      html_path = [
        File.join(SITE_DIR, "#{relative}.html"),
        File.join(SITE_DIR, relative, 'index.html')
      ].find { |c| File.exist?(c) }
      next unless html_path

      doc = Nokogiri::HTML(read_utf8(html_path))
      content = doc.at_css('.post-content') || doc

      content.css('a[href]').each do |a|
        href = a['href']
        next unless internal_link?(href)
        next if asset_link?(href)

        unless resolve_internal_link(href)
          failures << "  [#{post['title']}] href='#{href}' does not resolve to any page in _site/"
        end
      end
    end

    assert failures.empty?,
           "Post(s) contain internal links that 404:\n#{failures.uniq.join("\n")}"
  end
end

# ---------------------------------------------------------------------------
class PostContentIntegrityTest < Minitest::Test
  # A post's body shouldn't repeat the same h2 section twice - that usually
  # means content got duplicated between the post body and an {% include %}.
  def test_posts_do_not_repeat_headings
    built = built_posts
    assert !built.empty?, 'No posts found in _site/search.json. Run `jekyll build` first.'

    failures = []

    built.each do |post|
      relative = post['url'].sub(%r{\A/}, '')
      html_path = [
        File.join(SITE_DIR, "#{relative}.html"),
        File.join(SITE_DIR, relative, 'index.html')
      ].find { |c| File.exist?(c) }
      next unless html_path

      doc = Nokogiri::HTML(read_utf8(html_path))
      content = doc.at_css('.post-content') || doc

      headings = content.css('h2').map { |h| h.text.strip }.reject(&:empty?)
      duplicates = headings.tally.select { |_, count| count > 1 }.keys

      next if duplicates.empty?

      failures << "  [#{post['title']}] duplicated heading(s): #{duplicates.join(', ')}"
    end

    assert failures.empty?,
           "Post(s) contain duplicated section headings:\n#{failures.join("\n")}"
  end
end
