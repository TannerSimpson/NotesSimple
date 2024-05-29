//email validation function 
function validateEmail(inputText) {
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailFormat)) {
      return true;
    } else {
      alert("Please provide a valid address");
      return false;
    }
  }

//check password
function CheckPassword(inputtxt) { 
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(inputtxt.value.match(passw)) { 
    return true;
    }
    else { 
    alert('Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter]')
    return false;
    }
}
