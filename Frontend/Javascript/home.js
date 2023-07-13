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
    const currentChannel = localStorage.getItem("currentChannel");
    const currentChannelObject = JSON.parse(currentChannel);


    if (currentChat) {
      const chatNameDisplay = document.getElementById("chatName");
      chatNameDisplay.textContent = currentChat;
    }

    
    if (currentChannelObject) {
      const channelNameDisplay = document.getElementById("channelName");
      channelNameDisplay.textContent = currentChannelObject.name;
    }
    
    


    function updateChatList(chats) {
      const chatsDiv = document.getElementById("chats");
      chatsDiv.innerHTML = ""; // Clear the existing chat list
    
      chats.forEach((chat) => {
        const pattern = /\b\w{3,}\b/g;
        const matches = chat.match(pattern);
    
        let word = "";
        if (matches && matches.length >= 2) {
          word = matches[0][0] + matches[1][0];
        }  else {
          word = chat[0] + chat[1] + chat[2];
        }
    
        const button = document.createElement("button");
        const br = document.createElement("br");
        button.href = "./home.html";
        button.textContent = word;
        button.id = chat;
        button.className = "Chat";
        chatsDiv.appendChild(button);
        chatsDiv.appendChild(br);
    
        button.addEventListener("click", () => updateCurrentChat(chat));
      });
    }

    function updateCurrentChat(chat) {
      localStorage.setItem("currentChat", chat);
    
      const channels = JSON.parse(localStorage.getItem("channels")) || [];
    
      const matchedChannel = channels.find(
        (channel) => channel.chat === chat
      );
    
      if (matchedChannel) {
        const { channelName } = matchedChannel;
        localStorage.setItem("currentChannel", JSON.stringify({ chatName: chat, name: channelName }));
      }
    
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



    function updateChannelsList(channels, currentChat) {
      const channelsDiv = document.getElementById("channels");
      channelsDiv.innerHTML = ""; // Clear the existing channel list
    
      channels.forEach((channel) => {
        if (currentChat === channel.chat) {
          const a = document.createElement("a");
          const br = document.createElement("br");
          a.href = "./home.html";
          a.textContent = channel.channelName;
          a.id = channel.channelName;
          a.className = "ChannelLink";
          channelsDiv.appendChild(a);
          channelsDiv.appendChild(br);
    
          a.addEventListener("click", () => updateCurrentChannel(channel));
        }
      });
    }

    function updateCurrentChannel(channel) {
      const chatName = channel.chat;
      const name = channel.channelName;
      localStorage.setItem("currentChannel", JSON.stringify({ chatName, name }));
      location.reload();
    }
    
    
    

    let channels = JSON.parse(localStorage.getItem("channels")) || [];
    updateChannelsList(channels,currentChat);


    messageInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        handleSendMessage();
      }
    });

    

  // Implement the logic to handle sending the message
  function handleSendMessage() {
    const message = messageInput.value;
    const Channel = localStorage.getItem("currentChannel");
    const dateTime = new Date().toLocaleString();
    const channelObject = JSON.parse(Channel);
    const messageObject = {
      message: message,
      user: username,
      channel: channelObject.name,
      chat: channelObject.chatName,
      dateTime: dateTime
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
      // Filter messages based on the current channel
      const filteredMessages = messages.filter(
        (message) => message.channel === currentChannelObject.name && message.chat === currentChat
      );
  

      filteredMessages.forEach((message) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${message.user}: ${message.message} (${message.dateTime})`;
        ulElement.appendChild(listItem);
      });
    
      // Clear the existing messages
      const messagesContainer = document.getElementById("messages");
      messagesContainer.innerHTML = "";
    
      // Append the updated messages to the container
      messagesContainer.appendChild(ulElement);
    }
    
        
      // Display the messages initially
      displayMessages();


      
})