
async function runthing() { //this feels sloppy but i just want a synchronous blocking browser.storage.local.get is that too much to ask 

    /**
    * Listen for clicks on the buttons, and send the appropriate message to
    * the content script in the page.
    */
    console.log("Popup began");
    var videoSpeed = 1.0;
    // browser.storage.local.get("videoSpeed").then();
    var result = await browser.storage.local.get("videoSpeed");
    videoSpeed = result.videoSpeed;

    console.log(videoSpeed);


    if (!(typeof videoSpeed === 'number')){
    console.log("Initializing storage to 3");
    browser.storage.local.set({"videoSpeed":3.0});
    videoSpeed = 3.0;
    }

    // document.getElementById("speed-input").setAttribute("value", videoSpeed)

    const input = document.getElementById("speed-input");
    input.setAttribute("value", videoSpeed)

    function listenForClicks() {

        console.log("Registering listener");
        document.addEventListener("click", (e) => {
            console.log("Listener Triggered"+input.value);

            if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
                // Ignore when click is not on a button within <div id="popup-content">.
                return;
            } else {
                // videoSpeed = Number(document.getElementById("speed-input").getAttribute("value"));
                videoSpeed = Number(input.value);
                if(!isNaN(videoSpeed)){
                    console.log("setting video speed: "+videoSpeed);
                    browser.storage.local.set({"videoSpeed":videoSpeed});
                }
                else {
                    console.log("NaN, Speed not stored");
                }

                //code here

            }
            console.log("Listener completed");
        });
        console.log("Listener Registered");
    }


    // start the button click listener
    listenForClicks();

    console.log("Popup finn");

}
runthing();