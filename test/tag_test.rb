#!/usr/bin/env ruby
# frozen_string_literal: true

# Tag Navigation Integration Tests
#
# Verifies that:
#   1. Tag links on blog posts point to pages that actually exist.
#   2. Each tag page lists blog posts that carry that tag.
#
# Prerequisites: run `jekyll build` (or `bundle exec jekyll build`) before
# executing these tests so the _site/ directory is up to date.
#
# Usage:
#   ruby test/tag_test.rb
#   # or via rake (if a Rakefile with :test task is present):
#   bundle exec rake test

require 'minitest/autorun'
require 'nokogiri'
require 'set'

SITE_DIR  = File.expand_path('../_site', __dir__)
POSTS_DIR = File.expand_path('../_posts', __dir__)

# ---------------------------------------------------------------------------
# Helper: read a file as UTF-8
# ---------------------------------------------------------------------------
def read_utf8(path)
  File.read(path, encoding: 'UTF-8')
end

# ---------------------------------------------------------------------------
# Helper: collect every tag slug from _posts front-matter
# Returns Hash: slug => Set of post titles
# ---------------------------------------------------------------------------
def tags_from_posts
  tags = {}

  Dir.glob(File.join(POSTS_DIR, '*.md')).each do |path|
    content = read_utf8(path)
    front_matter = content.match(/\A---\n(.*?)---/m)
    next unless front_matter

    block = front_matter[1]

    # Parse tags – supports "tags: [A, B, C]" or YAML list ("- Tag")
    inline = block.match(/^tags:\s*\[(.+?)\]/)
    raw_tags = if inline
                 inline[1].split(',').map(&:strip)
               else
                 block.scan(/^-\s+(.+)$/).flatten
               end

    title_match = block.match(/^title:\s*["']?(.+?)["']?\s*$/)
    title = title_match ? title_match[1] : File.basename(path)

    raw_tags.reject(&:empty?).each do |t|
      slug = t.downcase.gsub(' ', '-')
      tags[slug] ||= Set.new
      tags[slug] << title
    end
  end

  tags
end

# ---------------------------------------------------------------------------
# Helper: extract tag hrefs from a post HTML file
# ---------------------------------------------------------------------------
def tag_hrefs_from_post_html(html_path)
  doc = Nokogiri::HTML(read_utf8(html_path))
  doc.css('.tag-links a').map { |a| a['href'] }.compact
end

# ---------------------------------------------------------------------------
# Helper: collect post titles listed on a tag page
# ---------------------------------------------------------------------------
def post_titles_on_tag_page(html_path)
  doc = Nokogiri::HTML(read_utf8(html_path))
  doc.css('.post-title a').map { |el| el.text.strip }.reject(&:empty?)
end

# ---------------------------------------------------------------------------
class TagPageExistenceTest < Minitest::Test
  # Every post HTML in _site/ that has tag links must link to a tag page
  # that exists as _site/tag/<slug>/index.html
  def test_post_tag_links_resolve_to_existing_pages
    post_htmls = Dir.glob(File.join(SITE_DIR, '**/*.html')).reject do |f|
      f.include?('/tag/') || f.include?('/page') || File.basename(f) == '404.html'
    end

    assert !post_htmls.empty?,
           'No post HTML files found in _site. Run `jekyll build` first.'

    failures = []

    post_htmls.each do |html_path|
      hrefs = tag_hrefs_from_post_html(html_path)
      next if hrefs.empty?

      hrefs.each do |href|
        # Strip leading slash to get a relative path inside SITE_DIR
        relative = href.sub(%r{\A/}, '')
        index    = File.join(SITE_DIR, relative, 'index.html')

        unless File.exist?(index)
          failures << "  [#{File.basename(html_path)}] tag href='#{href}' → missing #{index}"
        end
      end
    end

    assert failures.empty?,
           "Tag link(s) point to pages that do not exist:\n#{failures.join("\n")}"
  end

  # All tags found in _posts front-matter must have a corresponding
  # generated tag page in _site/tag/<slug>/
  def test_all_post_tags_have_generated_pages
    expected = tags_from_posts
    assert !expected.empty?, 'No tags found in _posts. Check front-matter format.'

    missing = expected.keys.reject do |slug|
      File.exist?(File.join(SITE_DIR, 'tag', slug, 'index.html'))
    end

    assert missing.empty?,
           "Tag pages missing from _site/ for slug(s): #{missing.join(', ')}"
  end
end

# ---------------------------------------------------------------------------
class TagPageContentTest < Minitest::Test
  # Each tag page must list at least one post
  def test_tag_pages_are_not_empty
    tag_dirs = Dir.glob(File.join(SITE_DIR, 'tag', '*'))
    assert !tag_dirs.empty?,
           'No tag directories found in _site/tag/. Run `jekyll build` first.'

    empty_pages = []

    tag_dirs.each do |dir|
      index = File.join(dir, 'index.html')
      next unless File.exist?(index)

      titles = post_titles_on_tag_page(index)
      empty_pages << File.basename(dir) if titles.empty?
    end

    assert empty_pages.empty?,
           "Tag page(s) contain no post listings: #{empty_pages.join(', ')}"
  end

  # For every tag, at least one expected post must appear on the tag's first
  # page (pagination means page 1 may not show *all* posts, but must show some)
  def test_tag_pages_list_correct_posts
    all_tags = tags_from_posts
    assert !all_tags.empty?, 'No tags found in _posts.'

    failures = []

    all_tags.each do |slug, expected_titles|
      index_path = File.join(SITE_DIR, 'tag', slug, 'index.html')
      next unless File.exist?(index_path)

      listed = post_titles_on_tag_page(index_path)

      # At least one post with this tag must appear (even with pagination)
      found = listed.any? do |listed_title|
        expected_titles.any? do |exp|
          listed_title.include?(exp) || exp.include?(listed_title)
        end
      end

      unless found
        sample = expected_titles.first(3).to_a.join(', ')
        got    = listed.first(3).join(', ')
        failures << "  /tag/#{slug}/: expected a post like [#{sample}] but page lists [#{got}]"
      end
    end

    assert failures.empty?,
           "Tag pages list unexpected posts:\n#{failures.join("\n")}"
  end

  # Tag links in posts must use absolute paths (start with /)
  # Relative paths like 'tag/ai/' resolve incorrectly and cause 404s
  def test_tag_links_in_posts_use_absolute_paths
    post_htmls = Dir.glob(File.join(SITE_DIR, '**/*.html')).reject do |f|
      f.include?('/tag/') || f.include?('/page') || File.basename(f) == '404.html'
    end

    failures = []

    post_htmls.each do |html_path|
      hrefs = tag_hrefs_from_post_html(html_path)
      hrefs.each do |href|
        unless href.start_with?('/')
          failures << "  [#{File.basename(html_path)}] href='#{href}' is relative (must start with /)"
        end
      end
    end

    assert failures.empty?,
           "Tag links with relative paths found (these cause 404s from post pages):\n#{failures.join("\n")}"
  end
end
