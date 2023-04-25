const CurrentTime = ({task}) => {

    var formatedStartTime = String(task.startTime).padStart(6, '0');
    var formatedEndTime = String(task.endTime).padStart(6, '0');

    var startTimeHH = formatedStartTime.substring(0, 2);
    var startTimeMM = formatedStartTime.substring(2, 4);
    var startTimeSS = formatedStartTime.substring(4);

    var endTimeHH = formatedEndTime.substring(0, 2);
    var endTimeMM = formatedEndTime.substring(2, 4);
    var endTimeSS = formatedEndTime.substring(4);

    var totalTimeHH = endTimeHH - startTimeHH;
    if (totalTimeHH < 0){
        totalTimeHH = totalTimeHH * -1
    }
    var totalTimeMM = endTimeMM - startTimeMM;
    if (totalTimeMM < 0){
        totalTimeMM = totalTimeMM * -1
    }
    var totalTimeSS = endTimeSS - startTimeSS;
    if (totalTimeSS < 0){
        totalTimeSS = totalTimeSS * -1
    }

    var HH = String(totalTimeHH).padStart(2, '0');
    var MM = String(totalTimeMM).padStart(2, '0');
    var SS = String(totalTimeSS).padStart(2, '0');

    var HHMMSS = HH+":"+MM+":"+SS;


    return (
        <>
        <h1 className="justify-content-center"> {HHMMSS} </h1>
        </>
    );
}

export default CurrentTime;
