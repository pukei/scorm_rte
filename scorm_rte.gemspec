$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "scorm_rte/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "scorm_rte"
  s.version     = ScormRte::VERSION
  s.authors     = ["paresharma"]
  s.email       = ["paresharma@gmail.com"]
  s.homepage    = "https://github.com/pukei/scorm-rte"
  s.summary     = "Mountable Runtime Environment for SCORM RTE."
  s.description = "This is an attempt to a mountable rails engine for SCORM RTE."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

  s.add_dependency "rails", "~> 4.2.1"

  s.add_development_dependency "sqlite3"
end
