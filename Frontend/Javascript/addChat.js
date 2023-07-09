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
            alert("Please enter a username");
            chatInput.focus(); // Set focus to the username input field
            return;
        }

        // Retrieve existing chats from local storage or initialize an empty array
        let chats = JSON.parse(localStorage.getItem("chats")) || [];
        
        // Add the new chat name to the chats array
        chats.push(chatName);
        
        // Store the updated chats array in local storage
        localStorage.setItem("chats", JSON.stringify(chats));

        window.location.href = "Home.html";

    }
})