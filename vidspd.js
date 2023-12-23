console.log("Wideo Speed plugin loaded: started")
// Select the node that will be observed for mutations
const targetNode = document.getElementsByTagName("video")[0];

// Options for the observer (which mutations to observe)
const config = { attributes: true};

//TODO: may need to add 2nd observer that checks if document.getElementsByTagName("video")[0]'s parent childList has changed, then remake mutationObserver for document.getElementsByTagName("video")[0].playbackSpeed

// Video Speed
var videoSpeed = browser.storage.local.get("videoSpeed");
if (!(typeof videoSpeed === 'number')){
  browser.storage.local.set({"videoSpeed":2.0});
  videoSpeed = 2.0;
}

// set page's video speed to desired speed
function syncVidSpeed() {

  if( !(targetNode.playbackRate === videoSpeed)  )  {
    targetNode.playbackRate = videoSpeed;
    console.log("Speed set:"+videoSpeed );
  }  

}

// Callback function to execute when mutations are observed
const mutationCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "attributes") {
      syncVidSpeed();
    } 
  }
};


// Callback function to execute when stored Speed has changed
const storedSpeedCallback = (changes, area) => {
  if (area === "local") {
    if("videoSpeed" in changes){
      if(  !(changes["videoSpeed"].newValue === videoSpeed)  ){
        videoSpeed = changes["videoSpeed"].newValue;
        console.log("New Speed from storage: "+videoSpeed);
        syncVidSpeed();
      }
    }
  } 

};



// Create an observer instance linked to the callback function
const mutationObserver = new MutationObserver(mutationCallback);

// Start observing the target node for configured mutations
mutationObserver.observe(targetNode, config);

// Start listening to the stored target speed
browser.storage.onChanged.addListener(storedSpeedCallback);


console.log("Wideo Speed plugin loaded: Live")



