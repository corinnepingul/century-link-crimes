require 'rails_helper'

CRIME_API_CALL = { cassette_name: "Crime_api_call" }

RSpec.describe ApplicationController, type: :controller do
  describe "loading homepage", vcr: CRIME_API_CALL do
    before :each do
      get :index
    end

    it "should be successful" do
      expect(response).to be_ok
    end
  end
end
