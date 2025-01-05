function validateForm(event) {

    const userName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('rePassword').value;

    // console.log("passwords are : ", password, rePassword);

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const rePasswordError = document.getElementById('rePassword-error');

    emailError.textContent = "";
    passwordError.textContent = "";

    let emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let testEmail = emailRegex.test(email);

    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let testPassword = passwordRegex.test(password);
    let testRePassword = passwordRegex.test(rePassword);

    let isValid = true;

    if (!userName) {
        nameError.textContent = "Please enter a valid name";
        isValid = false;
    }

    if (!testEmail) {
        emailError.textContent = "Please enter a valid email";
        isValid = false;
    }

    if (!testPassword && !testRePassword) {
        passwordError.textContent = "Please enter a valid password";
        rePasswordError.textContent = "Please enter a valid password";
        isValid = false;
    }
    else if (!testPassword && testRePassword) {
        passwordError.textContent = "Please enter a valid password";
        isValid = false;
    }
    else if (testPassword && !testRePassword) {
        rePasswordError.textContent = "Please enter a valid password";
        isValid = false;
    }
    else if (!(password === rePassword)) {
        rePasswordError.textContent = "Re-typed password not matched with original."
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault(); // Prevent form submission
        // Clear input fields and hide error messages after 2 seconds
        setTimeout(() => {
            // document.getElementById('email').value = "";
            // document.getElementById('password').value = "";
            nameError.textContent = "";
            emailError.textContent = "";
            passwordError.textContent = "";
            rePasswordError.textContent = "";
        }, 2000);
    }
    else{
        storeInLocalStorage({ "name": userName, "email": email, "password": password, "rePassword": rePassword })
        // Allow form submission
        document.querySelector('.formData').submit();
    }

    // if (isValid) {
    // }

    return isValid;
}

function storeInLocalStorage(details) {
    localStorage.setItem('detailToken', JSON.stringify(details))
}
document.getElementById('submit').addEventListener("click", validateForm);