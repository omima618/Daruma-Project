/* important: i need to do if condition to check if local storage has userData item or not
depends on that i will show profile icon in main page with user full name 
and hide login button from nav bar 
*/
function openHomePage() {
    window.open("index.html", "_self");
}
function addDataToLocalStr(data) {
    window.localStorage.setItem("userData", JSON.stringify(data));
}
// onclick logo --> go to home page
let logoForm = document.querySelector(".logo-form svg");
logoForm.addEventListener("click", openHomePage);
/* note : first i have to add event in main.js file on login button click show formDiv.*/
// onclick close --> hide the parent div.
let formDiv = document.querySelector(".form");
let closeFormBtn = document.getElementById("close");
closeFormBtn.addEventListener("click", () => {
    openHomePage();
});
/* onclick join or login hide the current form and show the other one */
let swapForms = Array.from(document.querySelectorAll("span"));
let loginForm = document.querySelector(".login");
let signupForm = document.querySelector(".signup");
swapForms.forEach((span) => {
    span.addEventListener("click", (e) => {
        if (e.target.className === "open-signup-form") {
            loginForm.style.display = "none";
            signupForm.style.display = "block";
        } else if (e.target.className === "open-login-form") {
            loginForm.style.display = "block";
            signupForm.style.display = "none";
        }
    });
});
// onclick login --> add values to local storage and open the home page
let mailField = document.getElementById("login-mail");
let passField = document.getElementById("login-pass");
let loginBtn = document.querySelector(".login-btn");
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const loginData = {
        email: mailField.value,
        password: passField.value,
    };
    if (
        loginData.email !== "" &&
        loginData.password.length >= passField.getAttribute("minlength") &&
        loginData.password.length <= passField.getAttribute("maxlength")
    ) {
        addDataToLocalStr(loginData);
        Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Logged in successfully",
            showConfirmButton: false,
            timer: 1500,
        });
        setTimeout(openHomePage, 1700);
    } else {
        Swal.fire("The Internet?", "That thing is still around?", "question");
        Swal.fire({
            icon: "error",
            text: "Please Enter correct information",
        });
    }
});
// onclick signup --> add values to local storage and back to the home page
let fullNameFieldS = document.getElementById("signup-name");
let mailFieldS = document.getElementById("signup-mail");
let passFieldS = document.getElementById("signup-pass");
let signupBtn = document.querySelector(".signup-btn");
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const signupData = {
        fullName: fullNameFieldS.value,
        email: mailFieldS.value,
        password: passFieldS.value,
    };
    if (
        signupData.fullName !== "" &&
        signupData.email !== "" &&
        signupData.password.length >= passFieldS.getAttribute("minlength") &&
        signupData.password.length <= passFieldS.getAttribute("maxlength")
    ) {
        Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Account has been created successfully",
            showConfirmButton: false,
            timer: 1500,
        });
        addDataToLocalStr(signupData);
        setTimeout(openHomePage, 1700);
    } else {
        Swal.fire("The Internet?", "That thing is still around?", "question");
        Swal.fire({
            icon: "error",
            text: "Please Enter correct information",
        });
    }
});
/* onclick forgot password hide main form show form to confirm by mobile number */
let forgotPass = document.querySelector(".forgot-pass");
let mobileConfirmDiv = document.querySelector(".mobile-confirmition");
forgotPass.addEventListener("click", () => {
    loginForm.style.display = "none";
    mobileConfirmDiv.style.display = "block";
});
// on send mobile number make code input available
let mobInp = document.getElementById("mobile");
let codeInp = document.getElementById("code");
let sendBtn = document.querySelector(".send-code");
sendBtn.addEventListener("click", () => {
    if (mobInp.value !== "" && mobInp.value.length >= 10) {
        codeInp.removeAttribute("readonly");
        mobInp.style.color = "#666666";
    } else {
        mobInp.value = "";
        Swal.fire("The Internet?", "That thing is still around?", "question");
        Swal.fire({
            icon: "error",
            title: "Wrong Number...",
            text: "Please Enter correct number",
        });
    }
});
/* on verify code check if value is correct or wrong
correct --> icon color will be "#eb7363" , hide mobileConfirmDiv 
and show set new password div 
wrong --> show msg wrong code try again;
note: this value isn't real it's just for test 
*/
let testValue = "123456";
let checkIcon = document.querySelector(".check");
let verifyBtn = document.querySelector(".verify");
let setPassDiv = document.querySelector(".set-pass");
verifyBtn.addEventListener("click", () => {
    if (codeInp.value == testValue) {
        checkIcon.style.color = "#eb7363";
        setTimeout(function () {
            mobileConfirmDiv.style.display = "none";
            setPassDiv.style.display = "block";
        }, 1000);
    } else {
        codeInp.value = "";
        Swal.fire("The Internet?", "That thing is still around?", "question");
        Swal.fire({
            icon: "error",
            title: "Wrong code...",
            text: "Try again",
        });
    }
});
// set new password
let newPassField = document.getElementById("new-password");
let confirmPassField = document.getElementById("confirm-password");
let newValueArr = [];
let cofirmValueArr = [];
let checkPassIcon = document.querySelector(".check-password");
let passwordStatus = document.querySelector(".pass-status");
let submitPassBtn = document.querySelector(".submit-pass");
// <i id="wrong-pass" class="fas fa-times"></i> inner html wwrong
// <i id="correct-pass" class="fas fa-check"></i> inner html correct
// Identical password

// on input push every character in new value arr
newPassField.addEventListener("input", () => {
    newValueArr = [];
    for (let i = 0; i < newPassField.value.length; i++) {
        let newValue = newPassField.value;
        newValueArr.push(newValue[i]);
    }
});
// on input compare every character in confirm value arr with new value arr
confirmPassField.addEventListener("input", () => {
    cofirmValueArr = [];
    for (let i = 0; i < confirmPassField.value.length; i++) {
        let confirmValue = confirmPassField.value;
        cofirmValueArr.push(confirmValue[i]);
    }
});
confirmPassField.addEventListener("blur", () => {
    if (
        newValueArr.join("") === cofirmValueArr.join("") &&
        newPassField.value.length >= newPassField.getAttribute("minlength") &&
        newPassField.value.length <= newPassField.getAttribute("maxlength")
    ) {
        checkPassIcon.innerHTML = `<i id="correct-pass" class="fas fa-check"></i>`;
        passwordStatus.style.display = "block";
        passwordStatus.innerHTML = "Identical password";
        passwordStatus.style.color = "#00aa00";
    } else if (
        newPassField.value.length < newPassField.getAttribute("minlength")
    ) {
        passwordStatus.style.display = "block";
        passwordStatus.innerHTML =
            "Very short password, enter password between (10-25) characters";
        passwordStatus.style.color = "red";
    } else {
        checkPassIcon.innerHTML = `<i id="wrong-pass" class="fas fa-times"></i>`;
        passwordStatus.style.display = "block";
        passwordStatus.innerHTML = "Non-identical password";
        passwordStatus.style.color = "red";
    }
});
submitPassBtn.addEventListener("click", () => {
    if (
        passwordStatus.innerHTML === "Identical password" &&
        newPassField.value.length >= newPassField.getAttribute("minlength") &&
        newPassField.value.length <= newPassField.getAttribute("maxlength")
    ) {
        Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Password changed successfully",
            showConfirmButton: false,
            timer: 1500,
        });
        setPassDiv.style.display = "none";
        loginForm.style.display = "block";
    } else {
        Swal.fire({
            icon: "error",
            title: "Non-identical password",
            text: "Try again",
        });
        passwordStatus.innerHTML = "";
        checkPassIcon.innerHTML = "";
        newPassField.value = "";
        confirmPassField.value = "";
        Swal.fire({
            icon: "error",
            title: "Non-identical password",
            text: "Try again",
        });
    }
});
/*onclick show password icon change type to text 
& onclick hide icon change type to password
in login form 1, signupform 2 and set password form 3
*/
let showPassIcon1 = document.getElementById("pass-show1");
let hidePassIcon1 = document.getElementById("pass-hide1");
let showPassIcon2 = document.getElementById("pass-show2");
let hidePassIcon2 = document.getElementById("pass-hide2");
let showPassIcon3 = document.getElementById("pass-show3");
let hidePassIcon3 = document.getElementById("pass-hide3");
let showPassIcon4 = document.getElementById("pass-show4");
let hidePassIcon4 = document.getElementById("pass-hide4");

function showAndHidePassWord(passWordInput) {
    if (passWordInput.type === "password") {
        passWordInput.type = "text";
    } else {
        passWordInput.type = "password";
    }
}
showPassIcon1.addEventListener("click", () => {
    showPassIcon1.style.display = "none";
    hidePassIcon1.style.display = "inline";
    showAndHidePassWord(passField);
});
hidePassIcon1.addEventListener("click", () => {
    hidePassIcon1.style.display = "none";
    showPassIcon1.style.display = "inline";
    showAndHidePassWord(passField);
});
showPassIcon2.addEventListener("click", () => {
    hidePassIcon2.style.display = "inline";
    showPassIcon2.style.display = "none";
    showAndHidePassWord(passFieldS);
});
hidePassIcon2.addEventListener("click", () => {
    showPassIcon2.style.display = "inline";
    hidePassIcon2.style.display = "none";
    showAndHidePassWord(passFieldS);
});
showPassIcon3.addEventListener("click", () => {
    hidePassIcon3.style.display = "inline";
    showPassIcon3.style.display = "none";
    showAndHidePassWord(newPassField);
});
hidePassIcon3.addEventListener("click", () => {
    showPassIcon3.style.display = "inline";
    hidePassIcon3.style.display = "none";
    showAndHidePassWord(newPassField);
});
showPassIcon4.addEventListener("click", () => {
    hidePassIcon4.style.display = "inline";
    showPassIcon4.style.display = "none";
    showAndHidePassWord(confirmPassField);
});
hidePassIcon4.addEventListener("click", () => {
    showPassIcon4.style.display = "inline";
    hidePassIcon4.style.display = "none";
    showAndHidePassWord(confirmPassField);
});
