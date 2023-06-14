
var message =
    `${previousTeam["name"]}
    Details:
    -gamesPlayed: ${previousTeam["teamStats"][0]["splits"][0]["stat"]["gamesPlayed"]}
    -wins: ${previousTeam["teamStats"][0]["splits"][0]["stat"]["wins"]}
    -losses: ${previousTeam["teamStats"][0]["splits"][0]["stat"]["losses"]}
    -ot: ${previousTeam["teamStats"][0]["splits"][0]["stat"]["ot"]}
    -pts: ${previousTeam["teamStats"][0]["splits"][0]["stat"]["pts"]}`;

d3.select("#myButton").on("click", function() {
    console.log(previousTeam);
    alert(message);
});