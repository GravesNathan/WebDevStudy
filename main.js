


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
//Use for timer to let page load before building more with JS
function prepPage(){
  loadingStarts();
  //var menuButton = document.getElementById('menuToggle');
  //menuToggle(menuButton);
  buildLessonNav();
}

/*Setup Timer for the loading function.  The onclicks will need to trigger a function to
add the loading class, then have a timer function called that removes it about 2 seconds later.
Initial loading of webpage will need that same timer function called in prepPage to remove the class
*/
function loadingStarts(){
  //document.getElementById('loading').classList.remove('displayNone');
  var timer = setInterval(stopLoading, 2000);
}

function stopLoading(){
  //document.getElementById('loading').classList.add('displayNone');
}

/*****************Menu Toggle***************/
function menuToggle(menuToggle){
  menuToggle.classList.toggle('open');//Adds open class to CSS of menuToggle
  var menuBox = document.getElementById('menuBox');
  menuBox.classList.toggle('open');//Add's open class to menuBox

}


/*********Navigation JS *********/

  //alert(window.location.pathname);
  /*
  Sample pathnames
  /WebDevTutorial/
  /WebDevTutorial/index.html
  /WebDevTutorial/view/react/index.html
  */
  //Create Link buttons

  function buildLessonNav(){
    //document.getElementById('navBar').innerHTML = 'test';
  var currentPagePath = window.location.pathname;
  var navBar1 = document.getElementById('navBar1');
  var navBar2 = document.getElementById('navBar2');
    //navBar.getElementById.innerHTML('test');
  // var leftNav = navBar.appendChild(document.createElement('A'));
  // leftNav.appendChild('<');
  // leftNav.setAttribute('class','buttonLink');
  // var rightNav = navBar.appendChild(document.createElement('A'));
  // rightNav.appendChild('<');
  // rightNav.setAttribute('class','buttonLink');

  var reactLessonIndexes = new Array('index.html','r1-0.html','r1-1.html','r1-2.html','r1-3.html','r1-4.html','r1-5.html','r1-6.html','r2-0.html','r2-1.html','r2-2.html','r2-3.html','r2-4.html','r2-5.html',
  'r3-0.html','r3-1.html','r3-2.html','r3-3.html','r3-4.html','r3-5.html','r3-6.html','r3-7.html','r3-8.html','r3-9.html','r3-10.html','r3-11.html','r4-0.html','r4-1.html','r4-2.html','r4-3.html','r5-0.html','r6-0.html');
  var reactPath = '/WebDevTutorial/view/react/';
  var reactLessonPaths = new Array();
  //Create paths to compare easily
  for (i=0;i<reactLessonIndexes.length;i++){
    reactLessonPaths[i] = reactPath + reactLessonIndexes[i];
  }
  //compare path and create href attribute in link buttons
  //case for react/index.html page
  if ((reactLessonPaths[0] == currentPagePath) ||  ('/WebDevTutorial/view/react/' == currentPagePath) ) {
    navBar1.innerHTML = "<a class='buttonLink' id='rightNav' href='"+reactLessonPaths[1]+"'>Next</a>";
    navBar2.innerHTML = "<a class='buttonLink' id='rightNav' href='"+reactLessonPaths[1]+"'>Next</a>";
  //case for last page of lesson
  } else {
    for (i=1;i<reactLessonPaths.length;i++){//start at 1, that case is above
      if ( '/WebDevTutorial/view/react/r6-0.html' == currentPagePath){
        navBar1.innerHTML = "<a class='buttonLink' id='leftNav' href='"+reactLessonPaths[i-1]+"'>Previous</a>";
        navBar2.innerHTML = "<a class='buttonLink' id='leftNav' href='"+reactLessonPaths[i-1]+"'>Previous</a>"
        //case for most pages
      } else if ( (reactLessonPaths[i] == currentPagePath) ){//Nav links for all but index pages
        navBar1.innerHTML = "<a class='buttonLink' id='leftNav' href='"+reactLessonPaths[i-1]+"'>Previous</a>";
        navBar1.innerHTML += "<a class='buttonLink' id='rightNav' href='"+reactLessonPaths[i+1]+"'>Next</a>";
        navBar2.innerHTML = "<a class='buttonLink' id='leftNav' href='"+reactLessonPaths[i-1]+"'>Previous</a>";
        navBar2.innerHTML += "<a class='buttonLink' id='rightNav' href='"+reactLessonPaths[i+1]+"'>Next</a>";
        break;
      }
    }
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
