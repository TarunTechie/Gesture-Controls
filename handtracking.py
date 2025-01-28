import mediapipe as mp
import cv2
import time as t

class handDetector():
    def __init__(self,mode=False,hands=2,detectCon=0.5,trackCon=0.5):
        self.mpHands=mp.solutions.hands
        self.hands=self.mpHands.Hands(static_image_mode=mode,
                                      max_num_hands=hands,
                                      min_detection_confidence=detectCon,
                                      min_tracking_confidence=trackCon)
        self.mpdraw=mp.solutions.drawing_utils        

    def findHands(self,img,draw=True):
        img_rgb=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        self.results=self.hands.process(img_rgb)
        if (self.results.multi_hand_landmarks):
            for handslm in self.results.multi_hand_landmarks:
                if draw:    
                    self.mpdraw.draw_landmarks(img,handslm,self.mpHands.HAND_CONNECTIONS)
        return img
    
    def handPosition(self,img,handNo=0,draw=True):
        lmList=[]
        h,w,c=img.shape
        if self.results.multi_hand_landmarks:
            handlm=self.results.multi_hand_landmarks[handNo]
            for id,lm in enumerate(handlm.landmark):
                x,y=int(lm.x*w), int(lm.y*h)
                lmList.append([id,x,y])
        return lmList
                

