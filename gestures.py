import cv2 
import numpy as np
import handtracking as ht
cam=cv2.VideoCapture(0)

while True:
    s,img=cam.read()
    cv2.imshow('img',img)
    cv2.waitKey(1)