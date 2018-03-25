/*
Convert date to formatted string in local timezone
*/
function leftPad(data){
  return ("0" + data).slice(-2);
}

function getLocDateString(m){

  if(dateFormat == "MDY"){
    var date = leftPad(m.getMonth()+1) +"/"+ leftPad(m.getDate()) + "/" + m.getFullYear();
  } else 
  if(dateFormat == "DMY"){
    var date = leftPad(m.getDate()) + "/" + leftPad(m.getMonth()+1) + "/" + m.getFullYear();
  } else {
    var date = m.getFullYear() + "/" + leftPad(m.getMonth()+1) + "/" + leftPad(m.getDate());
  }
  
  return date + " " + 
      leftPad(m.getHours()) + ":" + leftPad(m.getMinutes()) + 
      ":" + leftPad(m.getSeconds()) + " " + 
      m.toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
}

/*
Convert date to formatted string in GMT timezone
*/
function getUTCDateString(m){

  if(dateFormat == "MDY"){
    var date = leftPad(m.getUTCMonth()+1) +"/"+ leftPad(m.getUTCDate()) + "/" + m.getUTCFullYear();
  } else 
  if(dateFormat == "DMY"){
    var date = leftPad(m.getUTCDate()) + "/" + leftPad(m.getUTCMonth()+1) + "/" + m.getUTCFullYear();
  } else {
    var date =  m.getUTCFullYear() + "/" + leftPad(m.getUTCMonth()+1) + "/" + leftPad(m.getUTCDate());
  }
  
  return date + " " 
      + leftPad(m.getUTCHours()) + ":" + leftPad(m.getUTCMinutes()) + ":" + 
      leftPad(m.getUTCSeconds()) +  " GMT";
}

/*
Handle time zone radio change event
*/
function radioChanged(){
    browser.storage.local.set({
    inputTZ: document.querySelector('input[name="tz"]:checked').value
  });
  
  displayDate();
}

/*
Convert user input date to epoch and local/GMT datetimes
*/
function displayDate(){

  var userInput = document.getElementById("indate").value;
  var radios = document.getElementsByName('tz');
  
  // Reset form for empty user input
  if (!userInput){
    document.getElementById("newepdatelabel").textContent = "";
    document.getElementById("newgmdatelabel").textContent = "";
    document.getElementById("newlocdatelabel").textContent = "";
    
    document.getElementById("newepdate").textContent = "";
    document.getElementById("newgmdate").textContent = "";
    document.getElementById("newlocdate").textContent = "";
    
    radios[0].disabled=false;
    radios[1].disabled=false;
    
    return;
  }
  
  var n = new Date();
  
  if (!isNaN(userInput)){
    // If user input is whole number convert as epoch
    n.setTime(userInput + "000");
    
    radios[0].disabled=true;
    radios[1].disabled=true;
    
  } else {
    // Convert user input as datetime format
    radios[0].disabled=false;
    radios[1].disabled=false;

    if(dateFormat == "MDY"){
      var re = /^(\d{1,2})?\/?(\d{1,2})?\/?(\d{1,4})? ?(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?/g;
    var dateArray = re.exec(userInput);
      dateArray[1] && n.setMonth(dateArray[1]-1);
      dateArray[2] && n.setDate(dateArray[2]);
      dateArray[3] && n.setFullYear(dateArray[3]);
    } else 
    if(dateFormat == "DMY"){
	  var re = /^(\d{1,2})?\/?(\d{1,2})?\/?(\d{1,4})? ?(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?/g;
      var dateArray = re.exec(userInput);
      dateArray[1] && n.setDate(dateArray[1]);
      dateArray[2] && n.setMonth(dateArray[2]-1);
      dateArray[3] && n.setFullYear(dateArray[3]);
    } else {
      var re = /^(\d{1,4})?\/?(\d{1,2})?\/?(\d{1,2})? ?(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?/g;
      var dateArray = re.exec(userInput);
      dateArray[1] && n.setFullYear(dateArray[1]);
      dateArray[2] && n.setMonth(dateArray[2]-1);
      dateArray[3] && n.setDate(dateArray[3]);
	}
    dateArray[4] && n.setHours(dateArray[4]);
    dateArray[5] && n.setMinutes(dateArray[5]);
    dateArray[6] && n.setSeconds(dateArray[6]);

    
    if (document.querySelector('input[name="tz"]:checked').value == "GMT") {
      n.setTime(n.getTime() - n.getTimezoneOffset() * 60000);
    } 
  } 

  // Update date time values
  document.getElementById("newepdatelabel").textContent = "EPOCH: ";
  document.getElementById("newgmdatelabel").textContent = "GMT: ";
  document.getElementById("newlocdatelabel").textContent = "LOCAL: ";

  document.getElementById("newepdate").textContent = Math.floor(n.getTime() / 1000) ;
  document.getElementById("newgmdate").textContent = getUTCDateString(n);
  document.getElementById("newlocdate").textContent = getLocDateString(n);
}

/*
Load popup with current date time and timezone selection
*/
function onLoadPopup(result) {
  
  // Get Timezone
  var inputTZ = result.inputTZ || "LOCAL";
  
  if (inputTZ == "GMT"){
    document.getElementById("radioGMT").checked=true;
  } else {
    document.getElementById("radioLOCAL").checked=true;
  }

  // Get date format from setting
  dateFormat = result.datetimeFormat || "MDY";
  
  // Display current date in epoch and datetime formats
  var d = new Date();
  var ms = Math.floor(d.getTime() / 1000);
  document.getElementById("curepdate").textContent = ms;
  document.getElementById("curgmdate").textContent = getUTCDateString(d);
  document.getElementById("curlocdate").textContent = getLocDateString(d);

  if (dateFormat == "DMY"){
    document.getElementById("indate").placeholder = "epoch or DD/MM/YYYY HH24:MI:SS";
  } else
  if (dateFormat == "MDY"){
    document.getElementById("indate").placeholder = "epoch or MM/DD/YYYY HH24:MI:SS";
  } else {
    document.getElementById("indate").placeholder = "epoch or YYYY/MM/DD HH24:MI:SS";
  }
  document.getElementById("indate").focus();
}

function onError(error) {
    console.log(`Error: ${error}`);
}

var dateFormat;

// Get stored values
var getting = browser.storage.local.get(null);
getting.then(onLoadPopup, onError);


// Attach listener to input and radio buttons
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('indate').addEventListener('change', function() {
        displayDate();
    });
    document.getElementById('indate').addEventListener('keyup', function() {
        displayDate();
    });
    
    var radios = document.getElementsByName('tz');
    radios[0].addEventListener('change', function() {
        radioChanged();
    });
    radios[1].addEventListener('change', function() {
        radioChanged();
    });
});
