require 'scorm_rte/engine'
require 'scorm_rte/lms/sco'
require 'scorm_rte/lms/controllers/helpers'

module ScormRte
end

::ActionController::Base.send :include, ScormRte::Lms::Controllers::Helpers
::ActionController::Base.after_filter :update_response
