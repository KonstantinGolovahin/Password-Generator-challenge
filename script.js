
/////////////////////////////////////////////////// Application logic //////////////////////////////

  //Receive password parameters and validate if
    // user input has a valid number between 10 and 64
    // user selected at least one option of character's arrays to use
  // if any condition not satisfied - ask to resubmit password generation criteria - keep asking until a valid result is received
  // if correct criteria received - create a new array containing valid characters from existing arrays
  //generate a password from random characters
  // Output result




///////////////////////// Data source ///////////////////////////


// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];




//////////////// Variables ////////////////////////////

// Starter values for defining generation options
var hasLowerCase ;
var hasUpperCase ;
var hasNumericCharacter ;
var hasSpecialCharacter ;
var passwordLength;

// temporary array for calculations
var tempArray=[];
// Generated password
var passwordOutput ="";
// check if at least one data source array is selected
validateSourceData = false;

// text strings for user prompts
const promptLenghtText = "Please enter desired length from 10 to 64 inclusive";
const promptLowerCaseText = "Would you like to include lowrcase characters? Y - to allow lowercase characters";
const promptUpperCaseText = "Would you like to include uppercase characters? Y - to allow uppercase characters";
const prompNumericText = "Would you like to include numeric characters? Y - to accept allow characters";
const promptSpecialCharactersText = "Would you like to include special characters? Y - to allow special characters";


///////////////////////////////functions //////////////////////////

// function to clear previus password brfore a new password generation
function clearPreviousPassword(){
  validateSourceData = false;
  tempArray=[];
  passwordOutput="";
}

// Function for getting a random element from an array
function getRandom(arr) {
  
  let randomChar=  Math.floor(Math.random() * arr.length);
    return arr[randomChar];
 }

// Function to prompt user for password options
function getPasswordOptions(promptText) {
let userSelection=prompt(promptText);
return userSelection;
}


// Function to generate password with user input
function generatePassword(passwordOutput) {

// clear previous entries
clearPreviousPassword();


// get desired password length
  passwordLength=getPasswordOptions(promptLenghtText);

  // do not allow to input incorrect values or ignore password length
  while (isNaN(passwordLength)|| passwordLength<10 || passwordLength>64 ||passwordLength ==" "){
    passwordLength=getPasswordOptions(promptLenghtText);
  }
  
  // do not proceed until at least one data source is selected
  while(!validateSourceData){
    validateSource();
  }
  
  
  // get a random character from a temporary array keeping in mind that first charcter cannot be concatenated to a previous value
  for (i=0;i<passwordLength;i++) {
    
    if(i===0) {
      passwordOutput= getRandom(tempArray);
      
    }
    else{
      passwordOutput=passwordOutput+getRandom(tempArray);
      
    }
    
  }
// provide a final result as a string for future output
return passwordOutput;

}



// loop prompts for selecting data source
function validateSource(){




// Add lowercase array 
hasLowerCase=getPasswordOptions(promptLowerCaseText);
// checks if user pressed cancel button
if(hasLowerCase!=null) {
  // checks if user selected valid option
  if(hasLowerCase.toUpperCase()==="Y" ) {
    tempArray=lowerCasedCharacters;
    validateSourceData=true;
  }
}

// Add uppercase array
hasUpperCase=getPasswordOptions(promptUpperCaseText);
if(hasUpperCase!=null){
  if(hasUpperCase.toUpperCase()==="Y") {
    tempArray=tempArray.concat(upperCasedCharacters);
    validateSourceData=true;
    }
}

// Add numeric array
hasNumericCharacter=getPasswordOptions(prompNumericText);
if(hasNumericCharacter!=null){
  if(hasNumericCharacter.toUpperCase()==="Y") {
    tempArray=tempArray.concat(numericCharacters);
    validateSourceData=true;
   }
}

// Add special array
hasSpecialCharacter=getPasswordOptions(promptSpecialCharactersText);
if(hasSpecialCharacter!=null){
  if(hasSpecialCharacter.toUpperCase()==="Y") {
    tempArray=tempArray.concat(specialCharacters);
    validateSourceData=true;
   }
}



}


// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}


////////////////////////// buttons /////////////////////////

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

