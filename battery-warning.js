/**
 * Battery warning
 * ===============
 * Alerts (warning/buzz) when battery drops below certian thresholds
 * LICENCE: MIT License Copyright (c) 2021 Huntly Cameron <huntly.cameron@gmail.com>
 */
 const WARNING_PERCENTS = [15,10,5]; //Note: order array by highest percent to lowest
 let WARNED_AT = [];
 
 const checkBatteryLevel = function(chargePercent){
   
   // Check if dropping below any trigger
   WARNING_PERCENTS.forEach((cutoff) => {
     if((cutoff >= chargePercent) && (WARNED_AT.indexOf(cutoff) === -1)){
       WARNED_AT.push(cutoff);
       showWarning(chargePercent);
     }
   });
   
   // Check if charging and clear out warnings if that's the case
   if(WARNED_AT.length > 0){
     if(chargePercent > WARNED_AT[0]){
       WARNED_AT = [];
     }
   }
 };
 
 const showWarning = function(chargePercent){
   E.showPrompt(`${chargePercent}% Battery Remaining!`,{
     title: "Battery Level",
     buttons : {"Dismiss": true}
   }).then((dismiss) => {
     Bangle.buzz(100);
   });
 };
 
 
 setInterval(function(){
   const chargePercent = E.getBattery();
   check_battery(chargePercent);
 }, 60000);
 