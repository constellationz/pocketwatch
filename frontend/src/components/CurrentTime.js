const CurrentTime = ({ task }) => {

    var getStartTime = new Date(task.startTime);
    var getEndTime = new Date(task.endTime);
    let deltaTime = getEndTime - getStartTime;

    let seconds = Math.floor( (deltaTime / 1000) % 60 );
    let minutes = Math.floor( (deltaTime / 1000 / 60) % 60 );
    let hours = Math.floor( (deltaTime / 1000 / 3600) % 24 );

    var HH = String(hours).padStart(2, '0');
    var MM = String(minutes).padStart(2, '0');
    var SS = String(seconds).padStart(2, '0');

    var HHMMSS = HH + ":" + MM + ":" + SS;

    return (
        <>
            <h1 className="justify-content-center "> {HHMMSS} </h1>
        </>
    );
}

export default CurrentTime;
