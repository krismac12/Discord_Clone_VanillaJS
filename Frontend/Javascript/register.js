document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("register_form"); 

    form.addEventListener("submit",(event) =>  handleOnSubmit(event));

    // Function to handle form validation and routing to next page
    function handleOnSubmit(event){
        event.preventDefault();

        // Get form input values
        const usernameInput = document.getElementById("username");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const confirmInput = document.getElementById("confirm");

        // Get the values entered by the user
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const confirm = confirmInput.value;
        const email = emailInput.value;


        // Perform validation
        if (username === "") {
        // Username validation failed
        alert("Please enter a username");
        usernameInput.focus(); // Set focus to the username input field
        return;
        }

        // Perform validation
        if (email === "") {
            // email validation failed
            alert("Please enter a email");
            emailInput.focus(); // Set focus to the username input field
            return;
        }

        if (password === "") {
        // Password validation failed
        alert("Please enter a password");
        passwordInput.focus(); // Set focus to the password input field
        return;
        }

        if (password !== confirm) {
        // Password confirmation validation failed
        alert("Passwords do not match");
        confirmInput.focus(); // Set focus to the confirm password input field
        return;
        }

        // Route to Home.html
        localStorage.setItem("username", username); // Store the username in local storage
        localStorage.setItem("email", email); // Store the username in local storage
        window.location.href = "Home.html";

    }
})
