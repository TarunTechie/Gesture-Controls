import cv2 
import numpy as np
import handtracking as ht
import time as t
def open_or_closed(landmarks):
    fingertips=[4,8,12,16,20]
    opened=[]
    if(len(landmarks)!=0):
        for i in fingertips:
            if i==4:
                if(landmarks[i][1]>landmarks[i-3][1]):
                    opened.append(int((i/4)-1))
            else:
                if(landmarks[i][2]<landmarks[i-3][2]):
                    opened.append(int((i/4)-1))
    return opened

cam=cv2.VideoCapture(0)
detector=ht.handDetector(detectCon=0.7,trackCon=0.5)

while True:
    s,img=cam.read()
    img=detector.findHands(img)
    lmlist=detector.handPosition(img,draw=False)
    opened=open_or_closed(lmlist)
    finger_name=["thumb","index","middle","ring","little"]
    if(len(opened)!=0):
        if(1 in opened and len(opened)==1):
            print('Left')
        if(4 in opened and len(opened)==1):
            print('Right')
        if(sum(opened)==3 and len(opened)==2):
                t.sleep(3)
                ss,pic=cam.read()
                cv2.imshow('captured',pic)
                cv2.waitKey(1)
                cv2.imwrite("Photo.jpg",pic)
                t.sleep(3)
                cv2.destroyWindow('captured')
                break
    cv2.imshow('img',img)
    cv2.waitKey(1)