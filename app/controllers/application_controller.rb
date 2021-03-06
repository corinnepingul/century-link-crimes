class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  CRIME_API = "https://data.seattle.gov/resource/3k2p-39jp.json"
  MILE_TO_METER_CONV = "1609.34"
  LATITUDE = "47.593304"
  LONGITUDE = "-122.332165"

  def index
    begin
      response = HTTParty.get(CRIME_API, query: {
                    "$$app_token" => ENV["CRIME_API"],
                     "$where" => "within_circle(incident_location, " + LATITUDE + ", " + LONGITUDE + ", " + MILE_TO_METER_CONV + ")"
                  })
      code = :ok
    rescue
      response = {}
      code = :no_content
    end
    @data = response.body
    @categories = map_categories(JSON.parse(@data))
  end

  private

  def map_categories(data)
    category_set = Set.new
    data.each do |crime|
      category_set.add(crime["event_clearance_subgroup"])
    end

    return category_set
  end
end
