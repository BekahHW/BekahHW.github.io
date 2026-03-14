require 'rake/testtask'

desc 'Build the Jekyll site'
task :build do
  sh 'bundle exec jekyll build'
end

Rake::TestTask.new(:test) do |t|
  t.libs << 'test'
  t.test_files = FileList['test/**/*_test.rb']
  t.verbose = true
end

desc 'Build site then run tests'
task ci: %i[build test]

task default: :test
