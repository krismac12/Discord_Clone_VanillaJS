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

    const currentChat = localStorage.getItem("currentChat");
    if (currentChat) {
        const chatNameDisplay = document.getElementById("chatName");
        chatNameDisplay.textContent = currentChat;
    }
    
    


    // Function to update the chat list in the sidebar
    function updateChatList(chats) {
        const chatsDiv = document.getElementById("chats");
        chatsDiv.innerHTML = ""; // Clear the existing chat list
        chats.forEach((chat) => {

          const pattern = /^\b(\w)\w*\b\s+(\w)/;
          var matches = chat.match(pattern);
          if (matches) {
            var firstLetter1 = matches[1];
            var firstLetter2 = matches[2];
            var word = firstLetter1 + firstLetter2;
          } else {
            var word = chat[0] + chat[1];
          }

          const button = document.createElement("button");
          const br = document.createElement("br");
          button.href = "./home.html";
          button.textContent = word;
          button.id = chat;
          button.className = "Chat";
          chatsDiv.appendChild(button);
          chatsDiv.appendChild(br);

            
            button.addEventListener("click", () => updateCurrentChat(chat))
          });
    }

    function updateCurrentChat(chat) {
        localStorage.setItem("currentChat", chat);
        location.reload();
    }

    // Retrieve existing chats from local storage or initialize an empty array
    let chats = JSON.parse(localStorage.getItem("chats")) || [];
    updateChatList(chats);


    // Route to Chat form
    addChatButton.addEventListener("click", () => routeAddChat());

    function routeAddChat(){
        window.location.href = "AddChat.html";
    }

    const messageInput = document.getElementById("messageInput");

    messageInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        handleSendMessage();
      }
    });

    // Implement the logic to handle sending the message
    function handleSendMessage() {
        const message = messageInput.value;
        const currentChat = localStorage.getItem("currentChat");
        const dateTime = new Date().toLocaleString();
      
        const messageObject = {
          message: message,
          user: username,
          currentChat: currentChat,
          dateTime: dateTime,
        };
      
        // Retrieve existing messages from local storage or initialize an empty array
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
      
        // Add the new message object to the messages array
        messages.push(messageObject);
      
        // Store the updated messages array in local storage
        localStorage.setItem("messages", JSON.stringify(messages));
      
        // Clear the input field after sending the message
        messageInput.value = "";
      
        displayMessages();
    }

    const messagesContainer = document.getElementById("messages");

    function displayMessages() {
        const ulElement = document.createElement("ul");
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
    
        // Filter messages based on the current chat
        const filteredMessages = messages.filter(
          (message) => message.currentChat === currentChat
        );
    
        filteredMessages.forEach((message) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${message.user}: ${message.message} (${message.dateTime})`;
          ulElement.appendChild(listItem);
        });
    
        // Clear the existing messages
        messagesContainer.innerHTML = "";
    
        // Append the updated messages to the container
        messagesContainer.appendChild(ulElement);
      }
    
      // Display the messages initially
      displayMessages();


})