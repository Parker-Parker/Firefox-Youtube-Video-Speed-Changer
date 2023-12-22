// Select the node that will be observed for mutations
const targetNode = document.querySelector('title');;

// Options for the observer (which mutations to observe)
const config = {childList: true};

// Video Title
const initialTitle = document.title;

// Video length
var videoLengthSeconds = document.getElementsByTagName("video")[0].duration;

const pad = (number) => {
    let retstr = number+"";
    if(retstr.length<2){
        retstr = "0"+retstr;
    }
    return retstr;
};

const makeDurationString = (seconds) => {
    const secR = Math.round(seconds);
    secs = Math.floor(secR)%60;
    mins = Math.floor(secR/60)%(60);
    hrs  = Math.floor(secR/(60*60));
    len  =  (secR<60)       ? (secs+"").length   : 
            (secR<(60*60))  ? (mins+"").length+2 : 
                               (hrs+"").length+4 ;
    
    return ("_"+len+" "+hrs+":"+pad(mins)+":"+pad(secs)+" ");
};

// Tab title
const finalTitle = makeDurationString(videoLengthSeconds)+initialTitle;

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      if(!document.title.startsWith("_"))  {
        document.title = finalTitle;
      }
    } 
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);



// Start observing the target node for configured mutations
observer.observe(targetNode, config);


