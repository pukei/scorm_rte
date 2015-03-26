namespace :scorm_rte do
  desc "Copies the RTE js from scorm_rte assets to main_app assets"
  task :copy_rte do
    app_path = Rails.root.to_s + '/app/assets/javascripts/scorm_rte'
    engine_path = ScormRte::Engine.root.to_s + '/app/assets/javascripts/scorm_rte/rte.js.erb'

    FileUtils.mkdir_p app_path
    FileUtils.cp engine_path, app_path

    puts "Copied #{engine_path} to #{app_path}"
  end
end
