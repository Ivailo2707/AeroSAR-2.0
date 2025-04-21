from rpi_rf import RFDevice
import time
import random
import json

TX_PIN = 17
rfdevice = RFDevice(TX_PIN)
rfdevice.enable_tx()
time.sleep(1)

def generate_sensor_packet():
    data = {
        "lat": round(random.uniform(-90.0, 90.0), 6),
        "lon": round(random.uniform(-180.0, 180.0), 6),
        "pitch": round(random.uniform(-90.0, 90.0), 2),
        "roll": round(random.uniform(-90.0, 90.0), 2),
        "altitude": round(random.uniform(0, 5000), 2),
        "distance": round(random.uniform(5, 500), 2),
        "therm_max": round(random.uniform(30.0, 40.0), 2),
        "therm_avg": round(random.uniform(28.0, 35.0), 2),
        "hotspot": [random.randint(0, 7), random.randint(0, 7)]
    }
    return data

def compress_to_codes(data):
    #NOT cryptographically safe
    base = 100000
    codes = []

    codes.append(base + int((data["lat"] + 90) * 1000))   
    codes.append(base + int((data["lon"] + 180) * 1000))  
    codes.append(base + int((data["pitch"] + 90) * 100)) 
    codes.append(base + int((data["roll"] + 90) * 100))
    codes.append(base + int(data["altitude"] * 10))
    codes.append(base + int(data["distance"] * 10))
    codes.append(base + int(data["therm_max"] * 100))
    codes.append(base + int(data["therm_avg"] * 100))
    codes.append(base + data["hotspot"][0] * 10 + data["hotspot"][1]) 

    return codes

try:
    while True:
        sensor_data = generate_sensor_packet()
        codes = compress_to_codes(sensor_data)
        print("Sending packet:")
        print(json.dumps(sensor_data, indent=2))

        for code in codes:
            rfdevice.tx_code(code, protocol=1, pulselength=350)
            time.sleep(0.05)

        time.sleep(2)

except KeyboardInterrupt:
    rfdevice.cleanup()
