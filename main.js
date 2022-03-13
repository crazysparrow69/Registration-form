//Global array for clients
const clientsArray = [];

//Counter of clients
let clientsCount = 0;

//Clients' class
class Client {
  constructor(options) {
    this.name = options.name;
    this.password = options.password;
    this.state = options.state;
  }
};

//Function that changes color of the register button to green
const greenLightRegister = () => {
  const submit = document.getElementById("submit");
  submit.style.backgroundColor = "rgb(0, 211, 63)";
  submit.value = "✓";
};

//Function that changes color of the register button to red
const redLightRegister = () => {
  const button = document.getElementById("submit");
  button.style.backgroundColor = "rgb(255, 53, 53)";
  button.value = "✖";
};

//Function that changes color of the register button to default
const defaultLightRegister = () => {
  const button = document.getElementById("submit");
  button.style.backgroundColor = "rgb(58, 134, 248)";
  button.value = "Регистрация";
};

//Function that changes color of the sign-in button to green
const greenLightSignIn = () => {
  const button = document.getElementById("ssubmit");
  button.style.backgroundColor = "rgb(0, 211, 63)";
  button.value = "✓";
};

//Function that changes color of the sign-in button to red
const redLightSignIn = () => {
  const button = document.getElementById("ssubmit");
  button.style.backgroundColor = "rgb(255, 53, 53)";
  button.value = "✖";
};

//Function that changes color of the sign-in button to default
const defaultLightSignIn = () => {
  const button = document.getElementById("ssubmit");
  button.style.backgroundColor = "rgb(58, 134, 248)";
  button.value = "Войти";
};

//Function that checks number of symbols
const checkSymbols = (string, from, to) => {
  if (string.length < from || string.length > to) return false;
  return true;
};

//Function that checks name
const checkName = (name) => {
  if (!checkSymbols(name, 2, 50)) return false;
  else if (
    name.split("!").length > 1 ||
    name.split("@").length > 1 ||
    name.split("#").length > 1 ||
    name.split("$").length > 1 ||
    name.split("%").length > 1 ||
    name.split("^").length > 1 ||
    name.split("&").length > 1 ||
    name.split("*").length > 1 ||
    name.split("(").length > 1 ||
    name.split(")").length > 1 ||
    name.split("-").length > 1 ||
    name.split("+").length > 1 ||
    name.split("=").length > 1 ||
    name.split("|").length > 1 ||
    name.split("/").length > 1 ||
    name.split("?").length > 1 ||
    name.split("`").length > 1 ||
    name.split("'").length > 1 ||
    name.split('"').length > 1 ||
    name.split("<").length > 1 ||
    name.split(">").length > 1
  ) {
    return false;
  }
  return true;
};

//Function that check numbers of uppercase, lowercase letters and numerals
const checkLetters = (password) => {
  let counterU = 0;
  let counterL = 0;
  let counterN = 0;

  for (let i = 0; i < password.length; i++) {
    if (!parseInt(password[i], 10)) {
      if (password[i] === password[i].toUpperCase()) counterU++;
      else counterL++;
    } else {
      counterN++;
    }
  }
  if (counterU < 1 || counterL < 1 || counterN < 1) return false;
  return true;
};

//Function that checks password
const checkPassword = (password) => {
  if (!checkSymbols(password, 8, 50)) return false;
  else if (!checkLetters(password)) return false;
  return true;
};

//Function that checks repassword
const checkRepassword = (password, repassword) => {
  if (password === repassword) return true;
  return false;
};

//Function that checks gender
const checkGender = (gender) => {
  if (gender.trim() === "") return false;
  return true;
};

//Function that checks name of the new client for identity
const coincidence = (name) => {
  for (let i = 0; i < clientsArray.length; i++)
    if (name === clientsArray[i].name) return true;
  return false;
};

//Function that does all checks
const checkUp = (name, password, repassword, gender) => {
  if (!checkName(name)) {
    alert("The name is incorrect");
    return false;
  } else if (coincidence(name)) {
    alert("Client with that name is already registered");
    return false;
  } else if (!checkPassword(password)) {
    alert("The password is incorrect");
    return false;
  } else if (!checkRepassword(password, repassword)) {
    alert("The passwords are not same");
    return false;
  } else if (!checkGender(gender)) {
    alert("Choose your gender");
    return false;
  }
  return true;
};

//Function that adds new clients to the global array
const addClient = (name, password, state) => {
  clientsArray.push(
    new Client({
      name: name,
      password: password,
      state: state,
    })
  );
};

//Function that adds new client to the list
const addLiElement = (name) => {
  let list = document.querySelector("ul");
  let li = document.createElement("li");
  li.innerHTML = name;
  list.append(li);
};

//Function that updates the title
const updateTitle = () => {
  clientsCount++;
  const h1 = document.querySelector("h1");
  h1.innerHTML = "Number of clients: " + clientsCount;
};

//Function that calls all funtions for creating new client
const createClient = (name, password, gender) => {
  addClient(name, password, gender);
  addLiElement(name);
  updateTitle();
};

//Function that registers a new client
const registration = (event) => {
  event.preventDefault();
  const form = document.getElementById("registration-form");
  const name = form.name.value;
  const password = form.password.value;
  const repassword = form.repassword.value;
  const gender = form.gender.value;

  if (checkUp(name, password, repassword, gender)) {
    greenLightRegister();
    setTimeout(defaultLightRegister, 2000);
    createClient(name, password, gender);
  } else {
    redLightRegister();
    setTimeout(defaultLightRegister, 2000);
  }
};

//Function that checks if the client is registered
const checkForExistence = (name) => {
  for (let i = 0; i < clientsArray.length; i++)
    if (name === clientsArray[i].name) return true;
  return false;
};

//Function that checks if the client's password is right
const checkPasswordOfClient = (name, password) => {
  for (let i = 0; i < clientsArray.length; i++)
    if (name === clientsArray[i].name)
      if (password === clientsArray[i].password) return true;
      else return false;
};

//Function that checks entered data
const checkClient = (name, password) => {
  if (checkForExistence(name)) {
    if (checkPasswordOfClient(name, password)) return true;
    else {
      alert("Password is incorrect");
      return false;
    }
  } else {
    alert("Client with that name do not exist");
    return false;
  }
};

//Function that signs in
const signIn = (event) => {
  event.preventDefault();
  const form = document.getElementById("sign-in-form");
  const name = form.name.value;
  const password = form.password.value;

  if (checkClient(name, password)) {
    greenLightSignIn();
    setTimeout(defaultLightSignIn, 500);
  } else {
    redLightSignIn();
    setTimeout(defaultLightSignIn, 500);
  }
};

//Functions that change color of submits when cursor is over/out
const registrationMouseOver = () => {
  const submit = document.getElementById("submit");
  submit.style.backgroundColor = "rgb(0, 102, 255)";
};

const registrationMouseOut = () => {
  const submit = document.getElementById("submit");
  submit.style.backgroundColor = "rgb(58, 134, 248)";
};

const signInMouseOver = () => {
  const submit = document.getElementById("ssubmit");
  submit.style.backgroundColor = "rgb(0, 102, 255)";
}

const signInMouseOut = () => {
  const submit = document.getElementById("ssubmit");
  submit.style.backgroundColor = "rgb(58, 134, 248)";
};

document.getElementById("registration-form").addEventListener("submit", registration);
document.getElementById("sign-in-form").addEventListener("submit", signIn);
document.getElementById("submit").addEventListener("mouseover", registrationMouseOver);
document.getElementById("submit").addEventListener("mouseout", registrationMouseOut);
document.getElementById("ssubmit").addEventListener("mouseover", signInMouseOver);
document.getElementById("ssubmit").addEventListener("mouseout", signInMouseOut);