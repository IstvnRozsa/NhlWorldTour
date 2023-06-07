import requests


response = requests.get("https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster,team.stats&season=20182019")
nhl_teams = response.json().items
print(nhl_teams)