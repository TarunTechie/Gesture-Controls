export class Pose
{
    constructor(landmarks)
    {
        this.landmarks=landmarks
    }
    getGesture()
    {
        const direction=getDirection(this.landmarks)
        return direction
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