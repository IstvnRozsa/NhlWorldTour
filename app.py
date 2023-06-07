from flask import Flask, render_template
import json
from api_communicator import get_data

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True


@app.route('/')
def hello_world():  # put application's code here

    with open("data/&season=20142015.json", 'r') as file:
        json_data = json.load(file)
    season_2014 = json.dumps(json_data)

    seasons = json.dumps(get_data())

    return render_template('index.html', season_2014=season_2014, seasons=seasons)


if __name__ == '__main__':
    app.run()
