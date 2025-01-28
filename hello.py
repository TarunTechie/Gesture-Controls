import mediapipe as mp
import cv2
import time as t
cam=cv2.VideoCapture(0)

mpHands=mp.solutions.hands
hands=mpHands.Hands()
mpdraw=mp.solutions.drawing_utils

while True:
    success,img=cam.read()
    h,w,c=img.shape
    cv2.putText(img,str(img.shape),(10,70),cv2.FONT_HERSHEY_SCRIPT_COMPLEX,1.5,(0,0,251),3)
    img_rgb=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
    results=hands.process(img_rgb)
    if results.multi_hand_landmarks:
            for handlm in results.multi_hand_landmarks:
                for id,lm in enumerate(handlm.landmark):
                    print(id,lm)
    cv2.imshow("image",img)
    cv2.waitKey(1)