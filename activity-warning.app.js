/**
 * Activity warning
 * ===============
 * Alerts (warning/buzz) when activity for the last hour is lower than set threshold
 * LICENCE: MIT License Copyright (c) 2021 Huntly Cameron <huntly.cameron@gmail.com>
 */
const WARNING_THRESHOLD = 10; //Note: set to something reasonable - step counter not accurite enough for 0
const HOURS_OF_OPERATION = {
   from: 09,
   to: 20
}; // set these unless you're wanting pestered while you sleep, masochist.
const TIMESPAN_IN_MINUTES = 1; // inactive time period, probably want 60mins or 30mins
//@TODO - integrate into settings API

const last_warning = {
  datetime: new Date(),
  step_count: Bangle.getStepCount(),
};

const stepsSinceLastWarning = function(){
    const currentSteps = Bangle.getStepCount();
    return currentSteps - last_warning.step_count;
};

const timeInMinutesSinceLastWarning = function(){
    const currentTime = new Date();
    return ((currentTime.getTime() - last_warning.datetime.getTime()) / 1000 / 60);
};

const isInHoursOfOperation = function(){
    const currentTime = new Date();
    return (currentTime.getHours() >= HOURS_OF_OPERATION.from && currentTime.getHours() <= HOURS_OF_OPERATION.to);
};

const checkActivity = function(){

    if(isInHoursOfOperation()){
        // if its been over the timespan
        if(timeInMinutesSinceLastWarning() >= TIMESPAN_IN_MINUTES){
            // if we've not moved enough in the timespan
            if(stepsSinceLastWarning() < WARNING_THRESHOLD){
                showWarning();
            }

            // regardless of warning, time span exceded, reset the counts
            last_warning.datetime = new Date();
            last_warning.step_count = Bangle.getStepCount();
        }
    }
};


const showWarning = function(chargePercent){
    E.showPrompt(`GET UP AND MOVE!`,{
        title: "Activity Level",
        buttons : {"Dismiss": true}
    }).then((dismiss) => {
        Bangle.buzz(1000);
    });
};
 
setInterval(checkActivity, 1000); 
