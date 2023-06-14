from flask import Flask, render_template
import json
from api_communicator import get_data

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True


@app.route('/')
def execute():
    res = get_data()
    seasons = json.dumps(res[0])
    teamsStatistics = json.dumps(res[1])
    teams = json.dumps(res[2])
    return render_template('index.html', seasons=seasons, teams=teamsStatistics, teamNames=teams)


if __name__ == '__main__':
    app.run()
