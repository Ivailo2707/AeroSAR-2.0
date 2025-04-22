# sudo apt update
# sudo apt install python3-smbus i2c-tools
# pip3 install adafruit-circuitpython-bmp280

import smbus2
import time
import math
import board
import busio
import adafruit_bmp280

MPU9250_ADDR = 0x68
bus = smbus2.SMBus(1)

bus.write_byte_data(MPU9250_ADDR, 0x6B, 0)

def read_raw_data(addr):
    high = bus.read_byte_data(MPU9250_ADDR, addr)
    low = bus.read_byte_data(MPU9250_ADDR, addr + 1)
    value = (high << 8) | low
    if value > 32767:
        value -= 65536
    return value

def get_pitch_roll(ax, ay, az):
    ax /= 16384.0
    ay /= 16384.0
    az /= 16384.0
    pitch = math.atan2(ax, math.sqrt(ay**2 + az**2)) * 180 / math.pi
    roll = math.atan2(ay, math.sqrt(ax**2 + az**2)) * 180 / math.pi
    return pitch, roll

i2c = busio.I2C(board.SCL, board.SDA)
bmp280 = adafruit_bmp280.Adafruit_BMP280_I2C(i2c, address=0x76)
bmp280.sea_level_pressure = 1013.25  # adjust based on local pressure

try:
    while True:
        ax = read_raw_data(0x3B)
        ay = read_raw_data(0x3D)
        az = read_raw_data(0x3F)

        pitch, roll = get_pitch_roll(ax, ay, az)

        altitude = bmp280.altitude

        print(f"Pitch: {pitch:.2f}°, Roll: {roll:.2f}°, Altitude: {altitude:.2f} m")
        time.sleep(1)

except KeyboardInterrupt:
    print("\nExiting...")
