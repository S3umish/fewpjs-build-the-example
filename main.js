// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const errorModalDiv = document.getElementById("modal");
const errorMessageTextArea = document.getElementById("modal-message")
const likeGlyphs = document.getElementsByClassName("like-glyph")
hideErrorModal();

for (const oneGlyph of likeGlyphs) {
  oneGlyph.addEventListener('click', (event) => {
    const heartGlyph = event.target
    mimicServerCall()
    .then( () => {

      changeGlyph(heartGlyph)
    })
    .catch(error => {
      if(error) {
        errorDisplayWhenError(error)
      }
    })
  })
}

function errorDisplayWhenError(error) {
  errorMessageTextArea.innerText = error
  errorModalDiv.className = "";
  setTimeout(hideErrorModal, 3000)
}


function hideErrorModal(){
  errorModalDiv.className = "hidden";
}

function changeGlyph(heartGlyph) {
  heartGlyph.innerText = (heartGlyph.innerText === EMPTY_HEART) ? FULL_HEART : EMPTY_HEART;
  heartGlyph.className = (heartGlyph.className === "like-glyph activated-heart") ? "like-glyph" : "like-glyph activated-heart";
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 3000);
  });
}
