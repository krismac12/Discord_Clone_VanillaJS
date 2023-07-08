document.addEventListener("DOMContentLoaded", () => {

    // Get username and password from local storage
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    // Get username and email dom elements from html page
    const usernameDisplay = document.getElementById("username");
    const emailDisplay = document.getElementById("email");

    // Change text of username and email display
    usernameDisplay.textContent = `Hello, ${username}!`;
    emailDisplay.textContent = `Email: ${email}`;

})