class CreateScormRteStores < ActiveRecord::Migration
  def change
    create_table :scorm_rte_stores do |t|
      t.string :key
      t.text :value

      t.timestamps null: false
    end
  end
end
