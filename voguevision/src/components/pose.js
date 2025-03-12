import { Finger, FingerCurl, FingerDirection, GestureDescription } from "fingerpose";

export const leftTwoFinger = new GestureDescription('move_left')

leftTwoFinger.addCurl(Finger.Index, FingerCurl.NoCurl, 0.5)
leftTwoFinger.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.5)

leftTwoFinger.addCurl(Finger.Middle, FingerCurl.NoCurl, 0.5)
leftTwoFinger.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.5)

leftTwoFinger.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5)
leftTwoFinger.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5)

leftTwoFinger.addCurl(Finger.Ring,FingerCurl.FullCurl,0.5)
leftTwoFinger.addCurl(Finger.Pinky,FingerCurl.FullCurl,0.5)