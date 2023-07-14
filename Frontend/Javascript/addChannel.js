document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("addChat_form"); 

    form.addEventListener("submit",(event) =>  handleOnSubmit(event));

    const currentChat = localStorage.getItem("currentChat");


    // Function to handle form validation and routing to next page
    function handleOnSubmit(event){
        event.preventDefault();

        // Get form input values
        const channelInput = document.getElementById("channelName");

        const channelName = channelInput.value;

        // Perform validation
        if (channelName === "") {
            // Username validation failed
            alert("Please enter a name");
            channelInput.focus(); // Set focus to the username input field
            return;
        }

        // Retrieve existing channels  from local storage or initialize an empty array
        let channels = JSON.parse(localStorage.getItem("channels")) || [];

        const channel = {
            chat: currentChat,
            channelName: channelName
        }
        
        // Add the new chat name to the chats array
        channels.push(channel);
        
        // Store the updated chats array in local storage
        localStorage.setItem("channels", JSON.stringify(channels));


        window.location.href = "Home.html";

    }
})