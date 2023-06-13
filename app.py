from flask import Flask, render_template
import json
from api_communicator import get_data

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True


@app.route('/')
def hello_world():  # put application's code here
    res = get_data()
    seasons = json.dumps(res[0])
    teams = json.dumps(res[1])
    return render_template('index.html', seasons=seasons, teams=teams)


if __name__ == '__main__':
    app.run()
