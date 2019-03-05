


//**************Functions below this were part of previous project but still may have some use such as menu load**************/

//********Test for Storage Compatibility**********
function storageAvailable(type) {
  try {
    var storage = window[type],
    x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
      //everything except Firefox
      e.code === 22 ||
    //  Firefox
      e.code === 1014 ||
      //test name field too, because code might not be present
      //everything except Firefox
      e.name === 'QuotaExceededError' ||
      //Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      //acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
    }
  }

//Page On load, for Listeners and re-load of cart.
function prepPage(){
  loadingStarts();
  var menuButton = document.getElementById('menuToggle');
  menuToggle(menuButton);
}

/*Setup Timer for the loading function.  The onclicks will need to trigger a function to
add the loading class, then have a timer function called that removes it about 2 seconds later.
Initial loading of webpage will need that same timer function called in prepPage to remove the class
*/
function loadingStarts(){
  document.getElementById('loading').classList.remove('displayNone');
  var timer = setInterval(stopLoading, 2000);
}

function stopLoading(){
  document.getElementById('loading').classList.add('displayNone');
}

/*****************Menu Toggle***************/
function menuToggle(menuToggle){
  menuToggle.classList.toggle('open');//Adds open class to CSS of menuToggle
  var menuBox = document.getElementById('menuBox');
  menuBox.classList.toggle('open');//Add's open class to menuBox

}


/*********Navigation JS *********/
  var currentPagePath = window.location.pathname;
  //alert(window.location.pathname);
  /*
  Sample pathnames
  /WebDevTutorial/
  /WebDevTutorial/index.html
  /WebDevTutorial/view/react/index.html
  */
  var leftNav = document.getElementById('leftNav');
  var rightNav = document.getElementById('rightNav');
  var reactLessonIndexes = new Array('r1-1','r1-2','r1-3','r1-4','r1-5','r1-6','r2-0','r2-1','r2-2','r2-3','r2-4','r2-5',
  'r3-0','r3-1','r3-2','r3-3','r3-4','r3-5','r3-6','r3-7','r3-8','r3-9','r3-10','r3-11','r4-0','r4-1','r4-2','r4-3','r5-0','r6-0');
  var reactPath = '/WebDevTutorial/view/react/';
  var reactLessonIndexes = new Array();
  //Create paths to compare easily
  for (i=0;i<reactLessonIndexes.length;i++){
    reactLessonIndexes[i] = reactPath + reactLessonIndexes[i];
  }
  //compare path and create href attribute in links
  for (i=0;i<reactLessonIndexes.length;i++){
    if (reactLessonIndexes[i] == currentPagePath){
      leftNav.setAttribute('href',reactLessonIndexes[i-1]);
      leftNav.setAttribute('href',reactLessonIndexes[i-1]);
    }
  }


function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}

/*Lastly call the code in webpage with this at end of webpage which I essentially did above.
<script>
includeHTML();
</script>
*/
