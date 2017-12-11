# frozen_string_literal: true

class CreateScormRteStores < ActiveRecord::Migration
  def change
    create_table :scorm_rte_stores do |t|
      t.string :sco_instance_id
      t.text :data

      t.timestamps null: false
    end
  end
end
