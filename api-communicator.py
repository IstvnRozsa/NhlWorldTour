# importing the requests library
import requests
import os.path
import json
from geopy.geocoders import Nominatim

# cached file:
path = 'data/'

# api-endpoint
URL = "https://statsapi.web.nhl.com/api/v1/teams" + "?expand=team.stats"

seasons = [
    "&season=" + str(x) + str(x+1) for x in range(2014,2021)
]
print(seasons)
# defining a params dict for the parameters to be sent to the API
PARAMS = {}

def get_data(force_fetch=False):
    # sending get request and saving the response as response object
    try:
        if force_fetch:
            raise Exception
        with open(path, 'r') as f:
            sdata = f.read()
            data = json.loads(sdata)
    except:
        url = ""
        for season in seasons:
            url = URL + season
            r = requests.get(url = URL, params = PARAMS)

            # extracting data in json format
            data = r.json()
            for team in data["teams"]:
                geolocator = Nominatim(user_agent="nhl")
                location = geolocator.geocode(team["venue"]["city"], exactly_one=True, addressdetails=True)

                print(location)
                team["longitude"] = location.longitude
                team["latitude"] = location.latitude

            with open(path+season + ".json", 'w+') as f:
                sdata = json.dumps(data, indent=4)
                f.write(sdata)
    return data


if __name__ == "__main__":
    data = get_data(force_fetch=True)