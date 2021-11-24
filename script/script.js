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

// swap images in discover slider
const swapBtn = document.querySelector(".arr-r");
let swapCount = 1;
const discoverSlider = document.getElementById("discover-slider");
swapBtn.addEventListener("click", () => {
    if (swapCount >= 1 && swapCount < 23) {
        swapCount++;
    } else {
        swapCount = 1;
    }
    discoverSlider.setAttribute(
        "src",
        `images/discover/discover(${swapCount}).jpg`
    );
});
// stats counter from 0 to stopCount number in data-stop attribute
let countersArr = document.querySelectorAll(".count-num");
let statsScetion = document.getElementById("stats");
function incrementCount(ele) {
    let stopCount = ele.dataset.stop;
    let incrementNum = setInterval(() => {
        if (parseInt(ele.innerHTML) < parseInt(stopCount)) {
            ele.innerHTML++;
        }
        if (ele.innerHTML === stopCount) {
            clearInterval(incrementNum);
        }
    }, 3000 / stopCount);
}
ScrollOut({
    targets: "#stats",
});

window.addEventListener("scroll", () => {
    if (statsScetion.dataset.scroll == "in") {
        countersArr.forEach((spanC) => {
            incrementCount(spanC);
        });
    } else {
        countersArr.forEach((spanC) => {
            spanC.innerHTML = "0";
        });
    }
});
// onclick all items show all items page
let allItemsBtn = document.querySelector(".all-items");
allItemsBtn.addEventListener("click", () => {
    window.open("trenditems.html", "_self");
});
// onclick all beds show all bids page
let allBidsBtn = document.querySelector(".all-bids");
allBidsBtn.addEventListener("click", () => {
    window.open("bids.html", "_self");
});
// onclick all artists show all artists page
let allArtBtn = document.querySelector(".all-artists");
allArtBtn.addEventListener("click", () => {
    window.open("artists.html", "_self");
});
// follow & unfollow button
let artistNames = document.querySelectorAll(".art-info h4");
let followBtn = document.querySelectorAll("button.follow");
followBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (localStorage.getItem("userData")) {
            if (btn.innerHTML === "Follow") {
                btn.innerHTML = btn.dataset.text;
                btn.style.backgroundColor = "#333";
                btn.style.color = "white";
            } else {
                btn.innerHTML = "Follow";
                btn.style.backgroundColor = "transparent";
                btn.style.color = "#333";
            }
        } else {
            Swal.fire("You are not a member!");
        }
    });
});
