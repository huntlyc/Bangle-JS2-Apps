/**
 * Activity warning
 * ===============
 * Alerts (warning/buzz) when activity for the last hour is lower than set threshold
 * LICENCE: MIT License Copyright (c) 2021 Huntly Cameron <huntly.cameron@gmail.com>
 */
 const WARNING_THRESHOLD = 200; //Note: set to something reasonable - step counter not accurite enough for 0
 const HOURS_OF_OPERATION = {
   from: 09,
   to: 20
 }; // set these unless you're wanting pestered while you sleep, masochist.
 let WARNED_AT = null;
 
 const checkActivity = function(currentSteps){
   const currentTime = new Date();
   if(currentTime.getHours() > HOURS_OF_OPERATION.from && currentTime.getHours() < HOURS_OF_OPERATION.to){
     // if it's been over an hour
     if(currentSteps < WARNING_THRESHOLD && ((currentTime.getTime() - WARNED_AT.getTime()) / 1000 / 60 / 60) > 1.0){
       showWarning();
       WARNED_AT = currentTime;
     }
   }
 };
 
 const showWarning = function(chargePercent){
   E.showPrompt(`GET UP AND MOVE!`,{
     title: "Activity Level",
     buttons : {"Dismiss": true}
   }).then((dismiss) => {
     Bangle.buzz(100);
   });
 };
 
 
 setInterval(function(){
   const currentSteps = Bangle.getStepCount();
   checkActivity(currentSteps);
 }, 60000);
 
 WARNED_AT = new Date();