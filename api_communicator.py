# importing the requests library
import requests
import os.path
import json
from geopy.geocoders import Nominatim

# https://gitlab.com/dword4/nhlapi
# cached file:
path = 'data/'

# api-endpoint
URL = "https://statsapi.web.nhl.com/api/v1/teams" + "?expand=team.stats"

seasons = [
    "&season=" + str(x) + str(x + 1) for x in range(2014, 2021)
]
# defining a params dict for the parameters to be sent to the API
PARAMS = {}


def flatten(l):
    return [item for sublist in l for item in sublist]


def get_data(force_fetch=False):
    # sending get request and saving the response as response object
    res = {"seasons": []}
    teams = []
    teamStats = []
    location_cach = {}
    for season in seasons:
        print(season)
        try:
            if force_fetch:
                raise Exception
            with open(path + season + ".json", 'r') as f:
                print(f"read from file {f}")
                sdata = f.read()
                data = json.loads(sdata)
                data['year'] = season[8:12] + '-' + season[12:16]
                ts = data['teams']
                year = data['year']
                for item in ts:
                    item.update({"season": year})
                    years = year.split('-')
                    item.update({"from": int(years[0])})
                    item.update({"to": int(years[1])})
                    teamSumm = {
                        "id": item["id"],
                        "name": item["name"],
                        "abbreviation": item["abbreviation"]
                    }
                    teams.append(teamSumm)
                teamStats.append(ts)
                res['seasons'].append(data)
        except:
            print("fetch from api")
            url = URL + season
            r = requests.get(url=url, params=PARAMS)

            # extracting data in json format
            data = r.json()
            data['year'] = season[8:12] + '-' + season[12:16]
            for team in data["teams"]:
                team_city = team["venue"]["city"]
                if team_city in location_cach:
                    location = location_cach[team_city]
                else:
                    geolocator = Nominatim(user_agent="nhl")
                    location = geolocator.geocode(team_city, exactly_one=True, addressdetails=True)
                    location_cach[team_city] = location

                print(location)
                team["longitude"] = location.longitude
                team["latitude"] = location.latitude

            with open(path + season + ".json", 'w+') as f:
                print("write season to file")
                sdata = json.dumps(data, indent=4)
                f.write(sdata)
            res['seasons'].append(data)
    teamStats = flatten(teamStats)
    with open(path + "teams.json", 'w+') as f:
        print("write teams")
        sdata = json.dumps(teamStats)
        f.write(sdata)

    teamsWithoutDupl = []
    with open(path + "teamsSummary.json", 'w+') as f:
        print("write teams summary")
        seen = set()
        for d in teams:
            t = tuple(d.items())
            if t not in seen:
                seen.add(t)
                teamsWithoutDupl.append(d)
        sdata = json.dumps(teamsWithoutDupl)
        f.write(sdata)
    return res, teamStats, teamsWithoutDupl


if __name__ == "__main__":
    data = get_data(force_fetch=False)
