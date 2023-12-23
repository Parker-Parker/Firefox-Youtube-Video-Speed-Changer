/**
* Listen for clicks on the buttons, and send the appropriate message to
* the content script in the page.
*/

var videoSpeed = browser.storage.local.get("videoSpeed");
if (!(typeof videoSpeed === 'number')){
  browser.storage.local.set({"videoSpeed":2.5});
  videoSpeed = 2.0;
}

document.getElementById("speed-input").setAttribute("value", videoSpeed)

function listenForClicks() {
    document.addEventListener("click", (e) => {

        if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
            // Ignore when click is not on a button within <div id="popup-content">.
            return;
        } else {
            videoSpeed = Number(document.getElementById("speed-input").getAttribute("value"));
            if(!isNaN(videoSpeed)){
                Console.log("setting video speed: "+videoSpeed);
                browser.storage.local.set({"videoSpeed":videoSpeed});
            }
            else {
                Console.log("NaN, Speed not stored");
            }

            //code here

        }
    });
}


// start the button click listener
listenForClicks();

