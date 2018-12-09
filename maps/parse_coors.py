import json

with open("coords.txt", "r") as f:
  data = f.read().split('\n')

with open("bangkok_geo.json", "w") as f:
  featurecla = ""
  coords = []

  for line in data:
    if len(line) == 0:
      feature_json = {
        "type": "Feature",
        "properties": {
          "scalerank": 5,
          "featurecla": featurecla
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
              [x for x in coords]
          ]
        }
      }
      print(json.dumps(feature_json), file=f)

      # reset variables
      featurecla = ""
      coords = []
    if line.find(',') >= 0:
      coords.append( [float(x) for x in list(reversed(line.split(',')))] )
    else:
      featurecla += line
