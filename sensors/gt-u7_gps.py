import serial
import pynmea2

gps = serial.Serial("/dev/serial0", baudrate=9600, timeout=1)

def get_gps_data():
    while True:
        try:
            line = gps.readline().decode("utf-8", errors="ignore")
            if line.startswith("$GNGGA") or line.startswith("$GPGGA"):
                msg = pynmea2.parse(line)
                lat = msg.latitude
                lon = msg.longitude
                array = [lat, lon]
                return array
        except pynmea2.ParseError:
            continue
        except KeyboardInterrupt:
            print("\nGPS Reading Stopped.")
            break