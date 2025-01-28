import mediapipe as mp
import cv2
import time as t

class handDetector():
    def __init__(self):
        self.mpHands=mp.solutions.hands
        self.hands=self.mpHands.Hands()
        self.mpdraw=mp.solutions.drawing_utils        

    def findHands(self,img,draw=True):
        img_rgb=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        self.results=self.hands.process(img_rgb)
        if (self.results.multi_hand_landmarks):
            for handlm in self.results.multi_hand_landmarks:
                if draw:    
                    self.mpdraw.draw_landmarks(img,handlm,self.mpHands.HAND_CONNECTIONS)
    
    def handPosition(self,img,handNo=0,draw=True):
        lmList=[]
        h,w,c=img.shape
        if self.results.multi_hand_landmarks:
            handlm=self.results.multi_hand_landmarks[handNo]
            for id,lm in enumerate(handlm.landmark):
                x,y=int(lm.x*w), int(lm.y*h)
                print(x,'\t',y)
                lmList.append([id,x,y])
        return lmList
                
    
def main():
    cam=cv2.VideoCapture(0)
    dec=handDetector()
    while True:
        success,img=cam.read()
        dec.findHands(img,True)
        newlist=dec.handPosition(img)
        cv2.putText(img,str(img.shape),(10,70),cv2.FONT_HERSHEY_SCRIPT_COMPLEX,1.5,(0,0,251),3)
        cv2.imshow("image",img)
        cv2.waitKey(1)


main()