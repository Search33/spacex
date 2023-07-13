
import requests
import json
# import time


print('hello, lets fetch these launches..')

API_URL = 'https://fdo.rocketlaunch.live/json/launches/next/5'
JSON_FILE_PATH = './public/launches.json'


def correct_json_formatting(obj):
    if isinstance(obj, dict):
        return {k: correct_json_formatting(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [correct_json_formatting(elem) for elem in obj]
    elif isinstance(obj, str):
        return obj.replace('"', '\"')
    else:
        return obj

def fetch_data():
    print("New iteration of the while loop started.")
    response = requests.get(API_URL)
    if response.status_code == 200:
        print("Data successfully fetched from API.")
        data = correct_json_formatting(response.json())
        print("Data has been formatted.")
        with open(JSON_FILE_PATH, 'w') as f:
            json.dump(data, f, indent=4)
        print("JSON file successfully written.")
    else:
        print(f"Failed to fetch data from API. Status code: {response.status_code}")

    print("Refetching in 8 hours...")
    # time.sleep(8*60*60)  # wait for 8 hours before next fetch

# schedule.every(8).hours.do(fetch_data)

fetch_data()
# while True:
#     schedule.run_pending()
#     time.sleep(1)