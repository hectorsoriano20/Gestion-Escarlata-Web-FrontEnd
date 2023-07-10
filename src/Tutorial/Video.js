import ReactPlayer from 'react-player'
import "./VideoStyles.css"

function TutorialP() {
    return (
        <div className="TutorialP">
            <ReactPlayer className="STuto"
                url={"https://youtu.be/CBWjw050POo"}
                width='75%'
                controls
                volume="0.5"
                />
        </div>
    )
}

export default TutorialP;