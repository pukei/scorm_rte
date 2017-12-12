# frozen_string_literal: true

namespace :scorm_rte do
  desc 'Copies the RTE js from scorm_rte assets to main_app assets'
  task :copy_rte do
    js_dir = '/app/assets/javascripts/scorm_rte'
    dest = File.join ::Rails.root, js_dir
    src = File.join ScormRte::Engine.root, js_dir, 'rte.js.erb'

    FileUtils.mkdir_p dest
    FileUtils.cp src, dest

    puts "Copied #{src} to #{dest}"
  end
end
