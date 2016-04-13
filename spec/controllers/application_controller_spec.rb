require 'rails_helper'

CRIME_API_CALL = { cassette_name: "CRIME_API_CALL" }

RSpec.describe ApplicationController, type: :controller do
  describe "loading homepage", vcr: CRIME_API_CALL do
    before :each do
      get :index
    end

    it "should be successful" do
      expect(response).to be_ok
    end

    it "renders the index template" do
      expect(response).to render_template("index")
    end

    context "should returned the expected json object" do
      it "has the right keys" do
        data = JSON.parse(assigns(:data))
        %w(event_clearance_subgroup incident_location).each do |key|
          expect(data.map(&:keys).flatten.uniq).to include key
        end
      end
    end
  end
end
