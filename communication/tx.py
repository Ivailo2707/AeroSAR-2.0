import time
import random
import RPi.GPIO as GPIO

TX_PIN = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(TX_PIN, GPIO.OUT)

def generate_packet():
    lat = round(random.uniform(-90.0, 90.0), 6)
    lon = round(random.uniform(-180.0, 180.0), 6)
    pitch = round(random.uniform(-90.0, 90.0), 2)
    roll = round(random.uniform(-90.0, 90.0), 2)
    altitude = round(random.uniform(0, 5000), 2)
    distance = round(random.uniform(5, 500), 2)
    max_temp = round(random.uniform(28.0, 35.0), 2)
    avg_temp = round(max_temp - random.uniform(1.0, 4.0), 2)
    hot_x = random.randint(0, 7)
    hot_y = random.randint(0, 7)

    return f"$GPS,{lat},{lon},GYRO,{pitch},{roll},ALT,{altitude},DIST,{distance},THERM,{max_temp},{hot_x},{hot_y},{avg_temp}#"

def send_packet(packet):
    for char in packet:
        byte = ord(char)
        for i in range(8):
            bit = (byte >> i) & 1
            GPIO.output(TX_PIN, bit)
            time.sleep(0.001)  # 1 ms /bit

try:
    while True:
        pkt = generate_packet()
        print(f"[TX] Sending: {pkt}")
        send_packet(pkt)
        time.sleep(1.5)

except KeyboardInterrupt:
    GPIO.cleanup()
    print("\nTX stopped.")
