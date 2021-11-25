// onclick login-button show form page
let loginButton = document.getElementById("login-button");
let profilePic = document.getElementById("profile-pic");
loginButton.addEventListener("click", () => {
    window.localStorage.clear();
    window.open("form.html", "_self");
});
/* function checks if local storage has userData if true so user logged in
 then hide login button and show profile pic icon */
function checkLocalStr(current, alternative) {
    if (window.localStorage.getItem("userData")) {
        current.style.display = "none";
        alternative.style.display = "block";
    }
}
checkLocalStr(loginButton, profilePic);
// onclick menu show links list & add close btn to the list
let menu = document.getElementById("menu");
let links = document.querySelector(".links");
let closeListBtn = document.createElement("span");
closeListBtn.className = "close-menu";
menu.addEventListener("click", () => {
    if (links.style.display === "none") {
        links.style.display = "flex";
    } else {
        links.style.display = "none";
    }
    links.appendChild(closeListBtn);
    closeListBtn.innerHTML = `<i class="fas fa-times"></i>`;
});
// onclick close list btn hide links list
closeListBtn.addEventListener("click", () => {
    links.style.display = "none";
});
let x = window.matchMedia("(max-width: 768px)");
x.addListener(() => {
    if (!x.matches) {
        links.style.display = "flex";
    } else {
        links.style.display = "none";
    }
});
// onclick profile pic icon show user-list
let userList = document.querySelector(".user-list");
let logoutBtn = document.querySelector(".log-out");
profilePic.addEventListener("click", () => {
    if (userList.style.display === "none") {
        userList.style.display = "flex";
    } else {
        userList.style.display = "none";
    }
});
logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    checkLocalStr(profilePic, loginButton);
    location.reload();
});
