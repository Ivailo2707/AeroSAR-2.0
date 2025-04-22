from picamera2 import Picamera2
import cv2

picam2 = Picamera2()

preview_config = picam2.create_preview_configuration()
picam2.configure(preview_config)

picam2.start()

cv2.namedWindow("Live Video", cv2.WINDOW_NORMAL)

try:
    while True:
        frame = picam2.capture_array()
        
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
        
        cv2.imshow("Live Video", frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
finally:
    picam2.stop()
    cv2.destroyAllWindows()