const wordShow = document.querySelector(".wordShow");
const input = document.querySelector("input");
const cpm = document.querySelector(".CPM");
const word = document.querySelector(".word");
const reset = document.querySelector("button")

let display = document.createElement("p")
let arrData = []

let wordArr = fetch('https://random-word-api.herokuapp.com/word?number=5')
wordArr.then(res => res.json())
    .then(data => {
        arrData = data
        display.textContent = arrData[0];
        arrData.splice(0, 1)
        wordShow.appendChild(display);
        displayNow = display.textContent
    })
    
let timer = 0;
let interval;

let wordCount = 0;
let charCount = 0;
let cpmCount = 0;
let displayNow;

input.addEventListener("input", (e) => {
    if(charCount === 0) interval = setInterval(() => timer += 1, 1000);
    if(displayNow === input.value) {
        charCount += input.value.length;
        calcCpm();
        wordCount += 1;
        word.textContent = `${wordCount}`;
        input.value = '';
        fetchWord();
    };
    
    
})
function fetchWord() {
    display.textContent = arrData[0];
    arrData.splice(0, 1)
    wordShow.appendChild(display);
    displayNow = display.textContent;
    let fetchRes = fetch(
        "https://random-word-api.herokuapp.com/word");
    fetchRes.then(res =>
        res.json()).then(d => {
            // console.log(d)
            arrData.push(...d)
        })
}

function calcCpm() {
    let currentTime = timer;
    let cps = charCount / currentTime;
    cpmCount = Math.round(cps * 60);
    cpm.textContent = `${cpmCount}`
    // console.log(cpmCount, currentTime, charCount)
}

reset.addEventListener('click', () => {
    clearInterval(interval);
    timer = 0;
    wordCount = 0;
    cpm.textContent = 0;
    word.textContent = 0;
    input.value = '';
})