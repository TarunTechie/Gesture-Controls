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
    const ge = new fp.GestureEstimator([fp.Gestures.ThumbsUpGesture])
    const gesture = ge.estimate(landmarks, 7.5)
    if (gesture.gestures.length > 0)
    {
        return gesture.gestures[0].name
    }
    else
    {
        return null
    }
}