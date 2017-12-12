# frozen_string_literal: true

module ScormRte
  module Lms
    class Sco
      def initialize(sco_instance_id: nil)
        raise NoScoInstanceIdError unless sco_instance_id.present?
        @sco_instance_id = sco_instance_id
      end

      attr_reader :sco_instance_id
    end
  end
end
