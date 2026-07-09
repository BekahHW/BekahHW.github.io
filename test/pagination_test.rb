#!/usr/bin/env ruby
# frozen_string_literal: true

# Pagination Integration Tests
#
# Verifies that the "Newer Posts" / "Older Posts" navigation on paginated
# listings (the blog homepage and tag pages) is actually visible and
# functional - not just present in the DOM as a screen-reader-only link
# with no visible label (which renders as an invisible, unclickable 0x0
# element when the site's CSS doesn't style it).
#
# Prerequisites: run `jekyll build` (or `bundle exec jekyll build`) before
# executing these tests so the _site/ directory is up to date.
#
# Usage:
#   ruby test/pagination_test.rb

require 'minitest/autorun'
require 'nokogiri'
require_relative 'test_helper'

# Visible text of a link, ignoring anything marked screen-reader-only.
def visible_text(anchor)
  clone = anchor.dup
  clone.css('.screen-reader-text').each(&:remove)
  clone.text.strip
end

class HomePaginationTest < Minitest::Test
  def test_homepage_has_multiple_pages
    assert File.exist?(File.join(SITE_DIR, 'page2', 'index.html')),
           'Expected /page2/ to exist - homepage should paginate across multiple pages.'
  end

  def test_pagination_links_are_visible_and_correct
    pages = Dir.glob(File.join(SITE_DIR, 'page*', 'index.html')).unshift(File.join(SITE_DIR, 'index.html'))
    assert !pages.empty?

    failures = []

    pages.each do |page_path|
      doc = Nokogiri::HTML(read_utf8(page_path))
      nav = doc.at_css('nav.pagination')
      next unless nav

      nav.css('a').each do |a|
        label = visible_text(a)
        if label.empty?
          failures << "  [#{page_path.sub(SITE_DIR, '')}] pagination link href='#{a['href']}' has no visible text"
        end
      end
    end

    assert failures.empty?,
           "Pagination link(s) render with no visible label (invisible/unclickable):\n#{failures.join("\n")}"
  end

  def test_first_and_last_page_have_correct_boundary_controls
    first = Nokogiri::HTML(read_utf8(File.join(SITE_DIR, 'index.html')))
    assert_nil first.at_css('.newer-posts'), 'Page 1 should not show a "Newer Posts" link.'
    assert first.at_css('.older-posts'), 'Page 1 should show an "Older Posts" link.'

    last_page_num = Dir.glob(File.join(SITE_DIR, 'page*'))
                        .map { |d| File.basename(d).sub('page', '').to_i }
                        .max
    last = Nokogiri::HTML(read_utf8(File.join(SITE_DIR, "page#{last_page_num}", 'index.html')))
    assert last.at_css('.newer-posts'), 'Last page should show a "Newer Posts" link.'
    assert_nil last.at_css('.older-posts'), 'Last page should not show an "Older Posts" link.'
  end
end

class TagPaginationTest < Minitest::Test
  def test_multi_page_tags_have_visible_pagination_controls
    tag_dirs = Dir.glob(File.join(SITE_DIR, 'tag', '*')).select { |d| File.directory?(d) }
    assert !tag_dirs.empty?, 'No tag directories found. Run `jekyll build` first.'

    failures = []

    tag_dirs.each do |tag_dir|
      page_dirs = Dir.glob(File.join(tag_dir, 'page*'))
      next if page_dirs.empty? # single-page tag, nothing to paginate

      ([File.join(tag_dir, 'index.html')] + page_dirs.map { |d| File.join(d, 'index.html') }).each do |html_path|
        next unless File.exist?(html_path)

        doc = Nokogiri::HTML(read_utf8(html_path))
        nav = doc.at_css('nav.pagination')

        if nav.nil?
          failures << "  #{html_path.sub(SITE_DIR, '')} has multiple pages but no pagination nav"
          next
        end

        nav.css('a').each do |a|
          label = visible_text(a)
          if label.empty?
            failures << "  #{html_path.sub(SITE_DIR, '')} pagination link href='#{a['href']}' has no visible text"
          end
        end
      end
    end

    assert failures.empty?,
           "Tag pagination problem(s):\n#{failures.join("\n")}"
  end
end
