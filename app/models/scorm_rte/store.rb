# frozen_string_literal: true

module ScormRte
  class Store < ActiveRecord::Base
    validates :sco_instance_id, presence: true, uniqueness: true
  end
end
