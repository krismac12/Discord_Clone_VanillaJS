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

    const addChatButton = document.getElementById("addChat");
    


    // Function to update the chat list in the sidebar
    function updateChatList(chats) {
        const ulElement = document.querySelector("#sideBar ul");
        ulElement.innerHTML = ""; // Clear the existing chat list
        
        chats.forEach((chat) => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = chat;
            listItem.appendChild(link);
            ulElement.appendChild(listItem);
        });
    }

    // Retrieve existing chats from local storage or initialize an empty array
    let chats = JSON.parse(localStorage.getItem("chats")) || [];
    updateChatList(chats);


    // Route to Chat form
    addChatButton.addEventListener("click", () => routeAddChat());

    function routeAddChat(){
        window.location.href = "AddChat.html";
    }


})