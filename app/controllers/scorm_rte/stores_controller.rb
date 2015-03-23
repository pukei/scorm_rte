module ScormRte
  class StoresController < ApplicationController
    def fetch
      store = Store.find_by(sco_instance_id: params[:sco_instance_id])
      render json: (store.data||{}).to_json
    end

    def create
      store = Store.find_or_initialize_by(sco_instance_id: params[:scorm_rte_store][:sco_instance_id])
      store.data = params[:scorm_rte_store][:data]
      store.save

      render nothing: true
    end

    private

    def scorm_rte_store_params
      params.require(:scorm_rte_store_params).permit(:key, :value)
    end
  end
end
