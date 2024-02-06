
console.log('hello ji');
const copyBtn = document.querySelector("[data-copy]");
// const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMessage=document.querySelector("[data-copyMsg]");
const mainData=document.querySelector("[main-maal]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const inputSlider=document.querySelector("[data-lengthSlider]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");











let checkCount = 0;

setIndicator('grey');

//Ye promise return krela mtlb async code h ekra ke async me rkheka

async function passwordCopy(){
    try{
        await navigator.clipboard.writeText(mainData.value);
        copyMessage.innerText="Copied";
    }
    catch(e)
    {

        copyMsg.innerText = "Failed";
        
    }
   
}
copyBtn.addEventListener('click',()=>{
    if(mainData.value){
        passwordCopy();
    }
    // console.log('hello ji mai zinda hu maalik');
})
let passwordLength = 10;
// let checkCount = 0;
handleSlider();
//ste strength circle color to grey


//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //or kuch bhi karna chahiye ? - HW
}
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})


// get random integer 


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber() {
    return getRndInteger(0,9);
}
function generateLowerCase() {  
    return String.fromCharCode(getRndInteger(97,123))
}
function generateUpperCase() {  
    return String.fromCharCode(getRndInteger(65,91))
}
function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}


function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

function setIndicator(color)
{
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "0px 0px 3px 3px white";
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    mainData.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});
// shuffling done



function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}