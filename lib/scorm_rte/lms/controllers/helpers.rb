module ScormRte
  module Lms
    module Controllers
      module Helpers
        def assign_sco_instance_id(sco_instance_id = nil)
          @_sco = Sco.new(sco_instance_id: sco_instance_id)
        end

        def update_response
          return unless @_sco
          txt = "<script type='text/javascript'>" \
                  "window.API.SCOInstanceID='#{@_sco.sco_instance_id}';" \
                  "window.API.fetchUrl='#{scorm_rte.fetch_stores_url}';" \
                  "window.API.createUrl='#{scorm_rte.stores_url}';" \
                '</script>'
          response.body += txt
        end
      end
    end
  end
end
