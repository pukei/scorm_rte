# SCORM RTE
This is an attempt to a mountable rails engine for SCORM RTE.

### Installation
First, add the gem to your Gemfile.
```ruby
gem 'scorm_rte', git: 'git@github.com:panthung/scrom-rte.git'
```
And, bundle.
```
bundle install
```
Then, mount the engine to your application.
```ruby
# Add this line to routes.rb
mount ScormRte::Engine, at: 'scorm_rte'
```
This will provide some actions to take care of the RTE.
```
/scorm_rte        # POST
/scorm_rte/fetch  # GET
```
Now, copy the migrations from the engine to the application.
```
[bundle exec] rake scorm_rte:install:migrations
```
--

###### P.S. This README is still in it's primordial state (so is the gem) and will be refined in time.

# License
This project rocks and uses [MIT-LICENSE] (https://github.com/pukei/scrom-rte/blob/master/MIT-LICENSE).
