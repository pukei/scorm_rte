module ScormRte
  class StoresController < ApplicationController
    def fetch
      store = Store.find_by(sco_instance_id: params[:sco_instance_id])
      json_data = store ? store.data : {}.to_json
      render json: json_data
    end

    def create
      store = Store.find_or_initialize_by(
        sco_instance_id: params[:scorm_rte_store][:sco_instance_id]
      )

      store.data = params[:scorm_rte_store][:data].to_json
      store.save

      render nothing: true
    end
  end
end
