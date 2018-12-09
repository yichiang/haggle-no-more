import json

with open("cityguide_locales.json", "r") as f:
  market_data = json.load(f)

with open("atm_locales.json", "r") as f:
  atm_data = json.load(f)


with open("cityguide_parsed_locales.txt", "w") as f:
  for locale in market_data['result']:
    new_marker = f"""folium.Marker(
      location=[{locale['point'][1]}, {locale['point'][0]}],
      popup="{locale['name']}",
      icon=folium.Icon(color='black', icon='shopping-cart'),
    ).add_to(marker_cluster)"""

    print(new_marker, file=f)
    print('', file=f)

  for locale in atm_data:
    new_marker = f"""folium.Marker(
      location=[{locale['latitude']}, {locale['longitude']}],
      popup="{locale['name']}",
      icon=folium.Icon(color='green', icon='credit-card'),
    ).add_to(marker_cluster)"""

    print(new_marker, file=f)
    print('', file=f)
