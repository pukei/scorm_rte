# frozen_string_literal: true

klass = if ::Rails::VERSION::MAJOR < 5
          ActiveRecord::Migration
        else
          version = "#{::Rails::VERSION::MAJOR}.#{::Rails::VERSION::MINOR}"
          ActiveRecord::Migration[version]
        end

class CreateScormRteStores < klass
  def change
    create_table :scorm_rte_stores do |t|
      t.string :sco_instance_id
      t.text :data

      t.timestamps null: false
    end
  end
end
