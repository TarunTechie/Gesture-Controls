import * as fp from 'fingerpose'
export class Pose
{
    constructor(landmarks)
    {
        this.landmarks=landmarks
    }
    getGesture()
    {
        const direction = getDirection(this.landmarks)
        const gesture=getGesture(this.landmarks)
        return {"direction":direction,"gesture":gesture}
    }
}

function getDirection(landmarks)
{
        if (landmarks[4][0] < landmarks[20][0])
        {
            return("left")
        }
        if (landmarks[4][0] > landmarks[20][0])
        {
            return("right")
        }
}

function getGesture(landmarks)
{
    const ge = new fp.GestureEstimator([fp.Gestures.ThumbsUpGesture,fp.Gestures.VictoryGesture])
    const gesture = ge.estimate(landmarks, 7.5)

    const fingertips = [4, 8, 12, 16, 20]
    const finger_name=["thumb","index","middle","ring","little"]
    let opened = []
    
    if(landmarks)
    {

        fingertips.forEach((tips,index) => {
            if (index === 0)
            {
                if (landmarks[tips][0] > landmarks[tips -2][0])
                {
                    opened.push(finger_name[index])
                }
            }
            else
            {
                if (landmarks[tips][1] < landmarks[tips -2][1] -20)
                {
                    opened.push(finger_name[index])
                }
            }
        })

        if (gesture.gestures.length > 0)
        {
            return gesture.gestures[0].name
        }
        if ((opened.length===3)&&(opened.includes("middle")&&opened.includes("ring")&&opened.includes("little")))
        {
            return "super"
        }
        if ((opened.length === 3) && (opened.includes("index") && opened.includes("little") && opened.includes('thumb')))
        {
            return "cart"
        }
        else
        {
            return null    
        }
    }
}