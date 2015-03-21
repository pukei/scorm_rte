$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "scorm_rte/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "scorm_rte"
  s.version     = ScormRte::VERSION
  s.authors     = ["paresharma"]
  s.email       = ["paresharma@gmail.com"]
  s.homepage    = "TODO"
  s.summary     = "TODO: Summary of ScormRte."
  s.description = "TODO: Description of ScormRte."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

  s.add_dependency "rails", "~> 4.2.1"

  s.add_development_dependency "sqlite3"
end
