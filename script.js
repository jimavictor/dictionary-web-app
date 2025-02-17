// This function will execute when the button is pressed
function getmeaning() {
  let word = document.getElementById("word").value;
  getdata(word);
}

// Enter key functionality
let input = document.getElementById("word");
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn").click();
  }
});

// This function fetch the data from API and show the data on screen
async function getdata(word) {
  var c = 1; // For counting number of examples
  var f_definition = ""; // initializing the meaning empty string
  var f_example = ""; // initializing the example empty string
  // API URL
  let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

  const response = await fetch(url);
  const data = await response.json();

  for (var i = 0; i < data[0].meanings[0].definitions.length; i++) {
    // Concatening all the meanings of the word
    f_definition =
      f_definition + " " + data[0].meanings[0].definitions[i].definition;

    if (data[0].meanings[0].definitions[i].example == undefined) {
      continue;
      c--;
    } else {
      // Concatening all the examples of the word
      f_example +=
        `${c}.` + " " + data[0].meanings[0].definitions[i].example + " ";
      c++;
    }
  }
  // When there is no examples
  if (f_example == "") {
    f_example = f_example + "There are no examples ";
  }
  // Getting Audio file path
  for (var j = 0; j < data[0].phonetics.length; j++) {
    if (data[0].phonetics[j].audio != "") {
      var audpath = data[0].phonetics[j].audio;
      break;
    }
  }
  let letter = data[0].word;

  document.querySelector(".main").innerHTML = ` <h1 id="word">${
    letter.charAt(0).toUpperCase() + letter.slice(1)
  }</h1> 
    <h1>Meaning</h1> ${f_definition}
    
    <h1 id="change">Example</h1>${f_example}
    
    <h1>Audio</h1>
    <img src="sound-svgrepo-com.svg" id="sound">
    `;
  var audio = new Audio(audpath);

  sound = document.getElementById("sound").addEventListener("click", () => {
    audio.play();
  });
}
