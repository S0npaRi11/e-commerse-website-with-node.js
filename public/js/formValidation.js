// form validation for register 

// (function($){
//      fname = 
// })(jQuery);

// check when page is loaded (register)

// keep the register button disabled by default

var fname   = document.getElementById('fname').value.trim(),
    email   = document.getElementById('#email').value.trim(),
    pass    = document.getElementById('#password1').value.trim(),
    pNo     = document.getElementById('pno').value.trim(),
    pin     = document.getElementById('pin').value.trim(),
    address = document.getElementById('adress').value.trim();

// checking required fields are empty or undifined

// required - name, password, email, phone number, pin and address

if(fname == ' ' || typeof(fname) == undefined &&
   email == ' ' || typeof(fname) == undefined &&
   pass == ' ' || typeof(fname) == undefined &&
   pNo == ' ' || typeof(fname) == undefined &&
   pin == ' ' || typeof(fname) == undefined &&
   address == ' ' || typeof(fname) == undefined
   ){
    // change the register button class to enabled 
}else{
    // keep the register button disabled and show toolitps 'This field can't be empty'
}
