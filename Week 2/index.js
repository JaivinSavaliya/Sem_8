function validateForm(event) {
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    const retrieveData = localStorage.getItem('detailToken');
    const actualData = retrieveData ? JSON.parse(retrieveData) : null;
    
    console.log("from the local storage: ", actualData ? actualData.email : "no data", actualData ? actualData.password : "no data");
    
    emailError.textContent = "";
    passwordError.textContent = "";
    
    let emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let testEmail = emailRegex.test(email);
    
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let testPassword = passwordRegex.test(password);
    
    let isValid = true;
    
    if (!testEmail || email === "") {
        emailError.textContent = "Please enter a valid email";
        isValid = false;
    }
    
    if (!testPassword || password === "") {
        passwordError.textContent = "Please enter a valid password";
        isValid = false;
    }
    
    if (!retrieveData) {
        // alert("No data in local storage");
        isValid = false;
    }
    
    if (isValid && actualData) {
        if (email === actualData.email && password === actualData.password) {
            alert("Valid credentials");
        } else {
            alert("Invalid credentials");
            isValid = false;
        }
    }
    
    if (!isValid) {
        // Clear input fields and hide error messages after 2 seconds
        event.preventDefault(); // Prevent form submission by default
        setTimeout(() => {
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            emailError.textContent = "";
            passwordError.textContent = "";
        }, 2000);
    } else {
        alert("Proceeding to dashboard");
        // Allow form submission
        // document.querySelector('.formData').submit();
    }
    
    return isValid;
}

function handleGoogleClick(e) {
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    emailError.textContent = "";
    passwordError.textContent = "";
}

document.getElementById('submit').addEventListener("click", validateForm);
document.getElementById('google-sign-in').addEventListener("click", handleGoogleClick);