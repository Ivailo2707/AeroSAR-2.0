from rpi_rf import RFDevice
import time

RX_PIN = 27
rfdevice = RFDevice(RX_PIN)
rfdevice.enable_rx()
time.sleep(1)

print("Listening for RF packets...")
received_codes = []

try:
    last_timestamp = None

    while True:
        if rfdevice.rx_code_timestamp != last_timestamp:
            last_timestamp = rfdevice.rx_code_timestamp
            code = rfdevice.rx_code
            print(f"Received: {code}")
            received_codes.append(code)

            #Simulation
            if len(received_codes) >= 9:
                base = 100000
                try:
                    lat     = (received_codes[0] - base) / 1000 - 90
                    lon     = (received_codes[1] - base) / 1000 - 180
                    pitch   = (received_codes[2] - base) / 100 - 90
                    roll    = (received_codes[3] - base) / 100 - 90
                    alt     = (received_codes[4] - base) / 10
                    dist    = (received_codes[5] - base) / 10
                    tmax    = (received_codes[6] - base) / 100
                    tavg    = (received_codes[7] - base) / 100
                    hotspot_code = received_codes[8] - base
                    hx = hotspot_code // 10
                    hy = hotspot_code % 10

                    reconstructed = {
                        "lat": round(lat, 6),
                        "lon": round(lon, 6),
                        "pitch": round(pitch, 2),
                        "roll": round(roll, 2),
                        "altitude": round(alt, 2),
                        "distance": round(dist, 2),
                        "therm_max": round(tmax, 2),
                        "therm_avg": round(tavg, 2),
                        "hotspot": [hx, hy]
                    }

                    print("\n Reconstructed Packet:")
                    print(json.dumps(reconstructed, indent=2))
                except Exception as e:
                    print(f"[!] Failed to parse packet: {e}")

                received_codes = []  #reset buffer

        time.sleep(0.01)

except KeyboardInterrupt:
    rfdevice.cleanup()
