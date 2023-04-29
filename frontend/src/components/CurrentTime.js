const CurrentTime = ({ task }) => {

    var getStartTime = new Date(task.startTime);
    var getEndTime = new Date(task.endTime);

    var SH = getStartTime.getHours();
    var SM = getStartTime.getMinutes();
    var sS = getStartTime.getSeconds();

    var EH = getEndTime.getHours();
    var EM = getEndTime.getMinutes();
    var ES = getEndTime.getSeconds();

    var TH = EH - SH;
    if (TH < 0) {
        TH = TH * -1
    }
    var TM = EM - SM;
    if (TM < 0) {
        TM = TM * -1
    }
    var TS = ES - sS;
    if (TS < 0) {
        TS = TS * -1
    }

    var HH = String(TH).padStart(2, '0');
    var MM = String(TM).padStart(2, '0');
    var SS = String(TS).padStart(2, '0');

    var HHMMSS = HH + ":" + MM + ":" + SS;

    return (
        <>
            <h1 className="justify-content-center "> {HHMMSS} </h1>
        </>
    );
}

export default CurrentTime;
