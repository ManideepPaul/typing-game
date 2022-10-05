const wordShow = document.querySelector(".wordShow");
const input = document.querySelector("input");
const cpm = document.querySelector(".CPM");
const word = document.querySelector(".word");
const reset = document.querySelector("button")

// Creating "p" which will hold random word
let display = document.createElement("p")

// This will hold 5 random words on loading the page to eliminate the time to fetch new word erery time.
let arrData = []

// Fetching 5 random words from API
let wordArr = fetch('https://random-word-api.herokuapp.com/word?number=5')
wordArr.then(res => res.json())
    .then(data => {
        // Assigning the fetched array to the arrData variable
        arrData = data

        // adding the first word from the array in the display container
        display.textContent = arrData[0];

        // removing the first element after displaying
        arrData.splice(0, 1)

        // appending the display in wordShow container
        wordShow.appendChild(display);

        // Assigning the display text to displayNow variable to validate it later
        displayNow = display.textContent
    })
   
// This will start increasing as user start typing
let timer = 0;

// This will hold the setInterval
let interval;

let wordCount = 0;
let charCount = 0;
let cpmCount = 0;
let startTimer = true;

// This will hold the current displayed word on the page
let displayNow;

input.addEventListener("input", (e) => {

    // When user start typing increase the timer by one after 1 each second.
    if(startTimer === true) {
        interval = setInterval(() => timer += 1, 1000);
        startTimer = false;
        console.log("here")
    }


    if(displayNow === input.value) {
        // after validation increase the charCount variable equals to the length on the input value's length
        charCount += input.value.length;

        // Calculating the CPM(Character pre minute)
        calcCpm();

        // Increasing the word count
        wordCount += 1;

        // Displaying the wordCount value on the screen
        word.textContent = `${wordCount}`;

        // clearing the input field
        input.value = '';

        // calling the fetchWord function to fetch word from API
        fetchWord();
    };
})

function fetchWord() {

    // will display the first item of the array on the screen
    display.textContent = arrData[0];
    wordShow.appendChild(display);

    // removing the displyed word from the array
    arrData.splice(0, 1)

    // Saving the displyed word for valudation after user input
    displayNow = display.textContent;

    // Fetching the new word from the API
    let fetchRes = fetch(
        "https://random-word-api.herokuapp.com/word");
    fetchRes.then(res =>
        res.json()).then(d => {
            // Pushing the fetched array after destructring
            arrData.push(...d)
        })
}

function calcCpm() {
    // Saving the timers value at the moment
    let currentTime = timer;

    // Calculating CPS(Character per second)
    let cps = charCount / currentTime;

    // Calculating CPM(Character per minute) and updating on the page
    cpmCount = Math.round(cps * 60);
    cpm.textContent = `${cpmCount}`;
}

reset.addEventListener('click', () => {
    // Clearing the setInterval
    clearInterval(interval);

    // Resetting everything
    timer = 0;
    wordCount = 0;
    cpm.textContent = 0;
    word.textContent = 0;
    input.value = '';
    startTimer = true;
})