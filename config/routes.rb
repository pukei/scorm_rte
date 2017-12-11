# frozen_string_literal: true

ScormRte::Engine.routes.draw do
  resource :stores, only: :create do
    get :fetch
  end
end
