// Select the node that will be observed for mutations
// const targetNode = document.querySelector('title');;
// const targetNode = document.getElementsByTagName("video")[0].playbackRate;
const targetNode = document.getElementsByTagName("video")[0];

// Options for the observer (which mutations to observe)
// const config = {childList: true};
// const config = { attributes: true, childList: true, subtree: true };
const config = { attributes: true};

// Video Speed
var videoSpeed = browser.storage.local.get("videoSpeed");
if (!(typeof videoSpeed === 'number')){
  browser.storage.local.set({"videoSpeed":1.0});
  videoSpeed = 2.0;
}

function syncVidSpeed() {

  if( !(targetNode.playbackRate === videoSpeed)  )  {
    targetNode.playbackRate = videoSpeed;
  }  

  // if( !(document.getElementsByTagName("video")[0].playbackRate === videoSpeed)  )  {
  //   document.getElementsByTagName("video")[0].playbackRate = videoSpeed;
  // }  
}

// Callback function to execute when mutations are observed
const mutationCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "attributes") {
      syncVidSpeed();
    } 
  }
};

// Create an observer instance linked to the callback function
const mutationObserver = new MutationObserver(mutationCallback);



// Start observing the target node for configured mutations
mutationObserver.observe(targetNode, config);


