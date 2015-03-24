module ScormRte
  module Lms
    class Sco
      def initialize(sco_instance_id: nil)
        fail NoScoInstanceIdError, 'Always provide a unique SCO intance ID' unless sco_instance_id
        @sco_instance_id = sco_instance_id
      end
    end
  end
end
