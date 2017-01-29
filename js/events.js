function fireEvent(eventName, params) {
    for (var i = 0; i < events[eventName].length; i++) {
        events[eventName][i](params);
    }
}

function addListener(eventName, functionCallback){
    events[eventName].push(functionCallback);
}


var events = {
    spinStart : [],
    spinStopping : [],
    spinStop : [],
    loaded : [],

    symbolSelected : [],
    changeSymbol : [],

    checkWin : [],

    win : [],
    loose : [],

    spinAvailable : []

};