module ScormRte
  class StoresController < ApplicationController
    def fetch
      # store = Store.find(key: params[:scorm_rte_store][:key])
      # render json: JSON.parse(store.value)
      render text: 'RTE fetch'
    end

    def create
      store = Store.find(key: params[:scorm_rte_store][:key])

      if store
        store.update_attribute(value: params[:scorm_rte_store][:value])
      else
        Store.create(scorm_rte_store_params)
      end
      render nothing: true
    end

    private

    def scorm_rte_store_params
      params.require(:scorm_rte_store_params).permit(:key, :value)
    end
  end
end
