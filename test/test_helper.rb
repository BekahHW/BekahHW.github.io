# frozen_string_literal: true

# Shared setup for the Jekyll integration test suite.
# All tests assume `jekyll build` has already been run.

SITE_DIR  = File.expand_path('../_site', __dir__)
POSTS_DIR = File.expand_path('../_posts', __dir__)

def read_utf8(path)
  File.read(path, encoding: 'UTF-8')
end
