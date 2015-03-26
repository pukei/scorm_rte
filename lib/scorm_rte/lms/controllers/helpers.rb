module ScormRte
  module Lms
    module Controllers
      module Helpers
        def assign_sco_instance_id(sco_instance_id = nil)
          @_sco = Sco.new(sco_instance_id: sco_instance_id)
        end

        def update_response
          return unless @_sco
          txt = "<script type='text/javascript'>" +
                scorm_1_2 +
                scorm_2004 +
                '</script>'
          response.body += txt
        end

        private

        def scorm_1_2
          scorm_initialize('API')
        end

        def scorm_2004
          scorm_initialize('API_1484_11')
        end

        def scorm_initialize(api)
          "window.#{api}.SCOInstanceID='#{@_sco.sco_instance_id}';" \
          "window.#{api}.fetchUrl='#{scorm_rte.fetch_stores_url}';" \
          "window.#{api}.createUrl='#{scorm_rte.stores_url}';"
        end
      end
    end
  end
end
