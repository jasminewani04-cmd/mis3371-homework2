/*
 Program Name: patient-form.html
 Name: Jasmine Wani
 Date Created: 2025-10-22
 Date Modified: 2025-10-22
 Version: 1.0
 Description: MIS 3371 Homework 2 Patient Form
*/
// dynamic date javascript code
const d = new Date();
let text = d.toLocaleDateString();
document.getElementById("today").innerHTML = text;

// name slider javascript code
let slider = document.getElementById("range");
let output = document.getElementById("range-slider");
output.innerHTML = slider.value;

slider.oninput = function () {output.innerHTML = this.value;};

// date of birth validation
function validateDob() {
    dob = document.getElementById("dob");
    let date = new Date(dob.value);
    let maxDate = new Date().setFullYear(new Date().getFullYear() - 120);

    if (date > new Date()) {
        document.getElementById("dob-error").innerHTML = 
        "Date can't be in the future";
        dob.value = "";
        return false;
    } else if (date < new Date(maxDate)) {
        document.getElementById("dob-error").innerHTML = 
        "Date can't be more than 120 years ago";
        dob.value = "";
        return false;
    } else {
        document.getElementById("dob-error").innerHTML = "";
        return true;
    }
}

//ssn validation
function validateSsn() {
    const ssn = document.getElementById("ssn").value;
    const ssnR = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;

    if (!ssnR.test(ssn)) {
        document.getElementById("ssn-error").innerHTML = 
        "Please enter a valid SSN";
        return false;
    } else {
        document.getElementById("ssn-error").innerHTML = "";
        return true;
    }
}

// zip code validation
function validateZip() {
    const zipInput = document.getElementById("zcode");
    let zip = zipInput.value.replace(/[^\d-]/g, "");

    if (!zip) {
        document.getElementById("zcode-error").innerHTML = 
        "Zip code can't be blank";
        return false;
    }

    if (zip.length > 5) {
        zip = zip.slice(0, 5) + "-" + zip.slice(5, 9);
    } else {
        zip = zip.slice(0, 5);
    }

    zipInput.value = zip;
    document.getElementById("zcode-error").innerHTML = "";
    return true;
}

//address validation
function validateAddress1() {
var ad1 = document.getElementById("address1").value;
console.log(ad1);
console.log(ad1.length);

if (ad1.length < 2) {
    document.getElementById("address1-error").innerHTML =
    "Please enter something on address line"
    return false;
}
else {
    document.getElementById("address1-error").innerHTML = "";
    return true;
}   
}

//email validation
function validateEmail() {
    email = document.getElementById("email").value;
    var emailR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email == "") {
        document.getElementById("email-error").innerHTML =
        "Email cannot be empty";
        return false;
    } else if (!email.match(emailR)) {
        document.getElementById("email-error").innerHTML =
        "Please enter a valid email address";
        return false;
    } else {
        document.getElementById("email-error").innerHTML = "";
        return true;
    }
}

//phone number validation
function validatePhone() {
    const phoneInput = document.getElementById("phone");
    const phone = phoneInput.value.replace(/\D/g, "");

    if (phone.length !== 10) {
        document.getElementById("phone-error").innerHTML = 
        "Phone number cannot be left blank";
        return false;
    }
    const formattedPhone =
    phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
    phoneInput.value = formattedPhone;
    document.getElementById("phone-error").innerHTML = "";
    return true;
}

//username validation js code
function validateUid() {
    uid = document.getElementById("uid").value.toLowerCase();
    document.getElementById("uid").value = uid;

    if (uid.length == 0) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't be blank";
        return false;
    }

    if (!isNaN(uid.charAt(0))) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't start with a number";
        return false;
    }

    let regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(uid)) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can only have letters, numbers, underscores, and dashes";
        return false;
    } else if (uid.length < 5) {
        document.getElementById("uid-error").innerHTML = 
        "User ID must be at least 5 characters";
        return false;
    } else if (uid.length > 30) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't exceed 30 characters";
        return false;
    } else {
        document.getElementById("uid-error").innerHTML = "";
        return true;
    }
}


//password validation
function validatePword() {
    const pword = document.getElementById("pword").value;
    const uname = document.getElementById("uid").value || "";

    const errorMessages = [];

    if (!/[a-z]/.test(pword)) {
        errorMessages.push("Enter at least one lowercase letter");
    }
    if (!/[A-Z]/.test(pword)) {
        errorMessages.push("Enter at least one uppercase letter");
    }
    if (!/[0-9]/.test(pword)) {
        errorMessages.push("Enter at least one number");
    }
    // allow common special characters
    if (!/[!@#$%&*_\-+.()]/.test(pword)) {
        errorMessages.push("Enter at least one special character");
    }
    if (uname && pword.toLowerCase().includes(uname.toLowerCase())) {
        errorMessages.push("Password can't contain user ID");
    }
    if (pword.length < 10) {
        errorMessages.push("Password must be at least 10 characters");
    }

    const errorContainer = document.querySelector(".pword-message");
    const pwordErrorShort = document.getElementById("pword-error");
    if (errorContainer) {
        if (errorMessages.length === 0) {
            errorContainer.innerHTML = '<span class="pword-success">Password looks good</span>';
            if (pwordErrorShort) pwordErrorShort.innerHTML = "";
        } else {
            errorContainer.innerHTML = errorMessages
                .map(msg => `<span class="pword-error">${msg}</span>`)
                .join("<br/>");
            if (pwordErrorShort) pwordErrorShort.innerHTML = "Password does not meet requirements";
        }
    } else if (errorMessages.length) {
        // fallback: log to console if container not found
        console.warn('Password validation errors:', errorMessages);
    }

    return errorMessages.length === 0;
}

//confirm password validation
function confirmPword() {
    pword1 = document.getElementById("pword").value;
    pword2 = document.getElementById("con_pword").value;

    if (pword1 !== pword2) {
        document.getElementById("pword2-error").innerHTML = 
        "Passwords don't match";
        return false;
    }
     else {
        document.getElementById("pword2-error").innerHTML = 
        "Passwords match";
        return true;
    }
}

//review button implementation
function reviewInput() {
    const formcontent = document.getElementById("signup");
    if (!formcontent) {
        console.warn('reviewInput: form with id "signup" not found');
        return;
    }
    var formoutput = "<table class='output'><th colspan = '3'> Review Your Information:</th>";
    for (let i = 0; i < formcontent.elements.length; i++) {
        if (formcontent.elements[i].value !== "") {
            switch (formcontent.elements[i].type) {
                case "checkbox":
                    if (formcontent.elements[i].checked) {
                        formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>&#x2713;</td></tr>`;
                    }
                    break;
                case "radio":
                    if (formcontent.elements[i].checked) {
                        formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>${formcontent.elements[i].value}</td></tr>`;
                    }
                    break;
                    case "button":
                    case "submit":
                    case "reset":
                        break;
                default:
                    formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>${formcontent.elements[i].value}</td></tr>`;
            }
        }
    }
    formoutput += "</table>";
    document.getElementById("showInput").innerHTML = formoutput;
}

//remove user input
function removeReview() {
    document.getElementById("showInput").innerHTML = "";
}


//log to console that hw2.js is loaded
console.log('Homework 2 JS loaded');
