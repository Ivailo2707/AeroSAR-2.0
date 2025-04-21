import RPi.GPIO as GPIO
import time

RX_PIN = 27
GPIO.setmode(GPIO.BCM)
GPIO.setup(RX_PIN, GPIO.IN)

def receive_data(timeout=2):
    start = time.time()
    buffer = ""
    packet_started = False

    while time.time() - start < timeout:
        bit = GPIO.input(RX_PIN)
        buffer += str(bit)
        time.sleep(0.001)

        #to ASCII packet
        try:
            chars = [chr(int(buffer[i:i+8], 2)) for i in range(0, len(buffer), 8)]
            packet = ''.join(chars)
            if "$" in packet and "#" in packet:
                start_idx = packet.index("$")
                end_idx = packet.index("#") + 1
                return packet[start_idx:end_idx]
        except:
            continue

    return None

try:
    while True:
        pkt = receive_data()
        if pkt:
            print(f"[RX] Received: {pkt}")
        else:
            print("[RX] Timeout/no valid data")
        time.sleep(0.5)

except KeyboardInterrupt:
    GPIO.cleanup()
    print("\nRX stopped.")
