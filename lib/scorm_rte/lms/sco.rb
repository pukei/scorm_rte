module ScormRte
  module Lms
    class Sco
      def initialize(sco_instance_id: nil)
        unless sco_instance_id.present?
          fail NoScoInstanceIdError
        end
        @sco_instance_id = sco_instance_id
      end

      attr_reader :sco_instance_id
    end
  end
end
