# SCORM RTE
This is an attempt to a mountable rails engine for SCORM RTE.

### Installation
First, add the gem to your Gemfile.
```ruby
gem 'scorm_rte', git: 'https://github.com/pukei/scorm_rte.git'
```
And, bundle.
```
bundle install
```
Then, mount the engine to your application.
```ruby
# Add this line to routes.rb
mount ScormRte::Engine, at: 'scorm_rte'
# Or, any custom mount point
mount ScormRte::Engine, at: 'this_is_soo_coool'
```
This will provide some actions to take care of the RTE.
```
/scorm_rte/stores                # POST
/scorm_rte/stores/fetch          # GET
# Or
/this_is_soo_coool/stores        # POST
/this_is_soo_coool/stores/fetch  # GET
```
Now, copy the migrations from the engine to the application.
```
[bundle exec] rake scorm_rte:install:migrations
[bundle exec] rake db:migrate
```
Make the javascript RTE available to the application
```
// Add the following line to application.js
//= require scorm_rte/rte
```
*Or*, you can add this line to `config/initializers/assets.rb`
```ruby
Rails.application.config.assets.precompile += %w( scorm_rte/rte.js )
```
And, make it available to the subsequent views
```
<%= javascript_include_tag 'scorm_rte/rte' %>
```
*Or*, better still you can copy the RTE js to the application and handle it yourself
```
[bundle exec] rake scorm_rte:copy_rte
```

Well, almost done.!!!
One last thing, that is to assign a unique ID to each instance of the SCO. This will be be used to query the db to keep track of everything that's going on at each User/SCO level.

Use the controller helper `assign_sco_instance_id(sco_instance_id)`.

```ruby
# This can be achieved in some way similar to this
class LmsController < ApplicationController
  def launch_scorm_player
    assign_sco_instance_id(sco_instance_id)

    # Rest of the code follows
    ...
  end

  private

  def sco_instance_id
    "#{current_user.id}:#{current_course.id}"
  end
end
```

# TO DO
* Add tests
* ~~Handle custom mount point~~
* ~~Allow export of RTE js to the host application for customization~~
* Possibly implement error and diagnostics or, switch to TinCan perhaps :)


###### P.S. This README is still in it's primordial state (so is the gem) and will be refined in time.

# License
This project rocks and uses [MIT-LICENSE](https://github.com/pukei/scrom-rte/blob/master/MIT-LICENSE).
