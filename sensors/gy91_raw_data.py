import smbus2
import time

MPU9250_ADDR = 0x68
bus = smbus2.SMBus(1)


bus.write_byte_data(MPU9250_ADDR, 0x6B, 0)  

def read_raw_data(addr):
    high = bus.read_byte_data(MPU9250_ADDR, addr)
    low = bus.read_byte_data(MPU9250_ADDR, addr + 1)
    value = (high << 8) | low
    if value > 32768:
        value -= 65536
    return value