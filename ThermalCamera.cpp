// /*  
//     sudo raspi-config 
//     ///enable i2c
 
//     sudo apt-get install libi2c-dev
//     sudo apt-get install i2c-tools
 
//     sudo i2cdetect -y 1
 
//     sudo apt-get install git
//     git clone https://github.com/WiringPi/WiringPi.git
//     cd WiringPi
//     ./build
 
 
//     g++ -o amg8833 main.cpp -lwiringPi
//     ./amg8833
// */
 
 
#include <iostream>
#include <unistd.h>
#include <wiringPiI2C.h>
 
// Define AMG8833 I2C address and register addresses
const int AMG8833_ADDR = 0x69; // Default I2C address
const int REG_MODE = 0x00; // Mode register address
const int REG_PIXEL_DATA = 0x80; // Pixel data address
 
int main() {
    // Open I2C device
    int fd = wiringPiI2CSetup(AMG8833_ADDR);
    if (fd == -1) {
        std::cerr << "Failed to initialize I2C communication\n";
        return -1;
    }
 
    std::cout << "AMG8833 initialized successfully!\n";
 
    // Optionally, read the mode register to verify the connection
    int mode = wiringPiI2CReadReg8(fd, REG_MODE);
    std::cout << "AMG8833 Mode: " << std::hex << mode << std::dec << "\n";
 
    usleep(50000);
 
    // Read pixel data (8x8 thermal data)
    unsigned char data[128]; // 8x8 = 64 pixels, each pixel 2 bytes
    //wiringPiI2CReadReg8(fd, REG_PIXEL_DATA); // start reading pixel data
 
    for (int i = 0; i < 128; i++) {
        data[i] = wiringPiI2CReadReg8(fd, REG_PIXEL_DATA + i);
    }
 
    // Print pixel values (temperature data)
    for (int y = 0; y < 8; y++) {
        for (int x = 0; x < 8; x++) {
            int index = y * 8 + x;
            std::cout << "Pixel[" << x << "," << y << "]: " << static_cast<int>(data[index]) << " ";
        }
        std::cout << "\n";
    }
 
    return 0;
}
