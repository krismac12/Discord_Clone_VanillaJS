document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("addChat_form"); 

    form.addEventListener("submit",(event) =>  handleOnSubmit(event));

    // Function to handle form validation and routing to next page
    function handleOnSubmit(event){
        event.preventDefault();

        // Get form input values
        const chatInput = document.getElementById("chatName");

        const chatName = chatInput.value;

        // Perform validation
        if (chatName === "") {
            // Username validation failed
            alert("Please enter a name");
            chatInput.focus(); // Set focus to the username input field
            return;
        }

        // Retrieve existing chats from local storage or initialize an empty array
        let chats = JSON.parse(localStorage.getItem("chats")) || [];

        let channels = JSON.parse(localStorage.getItem("channels")) || [];

        const channel = {
            chat: chatName,
            channelName: "General"
        }
        
        // Add the new chat name to the chats array
        chats.push(chatName);
        channels.push(channel);
        
        // Store the updated chats array in local storage
        localStorage.setItem("chats", JSON.stringify(chats));
        localStorage.setItem("channels", JSON.stringify(channels));


        window.location.href = "Home.html";

    }
})