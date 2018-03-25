function saveOptions(e) {
  e.preventDefault();

  browser.storage.local.set({
    datetimeFormat : document.querySelector('input[name="datetimeformat"]:checked').value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    
    var dateFormat = result.datetimeFormat || "MDY";
    
    if (dateFormat == "MDY"){
      document.getElementById("radioMDY").checked=true;
    } else 
    if (dateFormat == "DMY"){
      document.getElementById("radioDMY").checked=true;
    } else {
      document.getElementById("radioYMD").checked=true;
    }
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("datetimeFormat");
  getting.then(setCurrentChoice, onError);
  
}

document.addEventListener("DOMContentLoaded", restoreOptions);

// Attach listener to input and radio buttons
document.addEventListener('DOMContentLoaded', function(e) {
    
    var radios = document.getElementsByName('datetimeformat');
    radios[0].addEventListener('change', function(e) {
        saveOptions(e);
    });
    radios[1].addEventListener('change', function(e) {
        saveOptions(e);
    });
    radios[2].addEventListener('change', function(e) {
        saveOptions(e);
    });
});
