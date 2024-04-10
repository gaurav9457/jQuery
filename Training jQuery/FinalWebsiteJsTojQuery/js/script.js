$(function () {
let display = $("popupDiv");
let displayRegister = $("#Formcontainer");
let loginDiv = $("#popupChildMain");
let formObj = $("#formObj");
var tablePage=$("#TablePage");

var logBtnName;
window.onclick = function (e) {

    if (e.target == display || e.target == displayRegister || e.target == tablePage) {
        display.hide();
        displayRegister.hide();
        tablePage.hide();
		validate.resetForm();
		$("#Username").val("");
        $("#Password").val("");

    }
}
window.addEventListener("paste", function(event) {
                
                event.preventDefault();
				validate.alertDisplay("Error:Pasting is not allowed");
                
            });

var loginObj = new LoginObjMain();

function LoginObjMain() {
    this.login = login;
    this.closePopup = closePopup;
    this.register = register;
    this.displayTable=displayTable;

    function login() {
        var LoginLink = $("#LoginLink").html();

        if (LoginLink == "LOGOUT") {
            validate.alertDisplayLogout("Logging out");
            setTimeout(function(){
			$("#LoginLink").html("LOGIN");
            $("#RegisterLink").html("REGISTER");
			$("#RegisterLink").css("color","white");
			},2000);
        }
        else {
            console.log("script");
            loginDiv.style.display = "block";
            display.style.display = 'block';
        }

    }
    function closePopup() {
       $("Username").value="";
        $("#Password").value="";      
       display.hide();
        displayRegister.hide();
        tablePage.hide();
        validate.resetForm();

    }

    function register() {
        var RegisterLink =$("#RegisterLink").html();
        if (RegisterLink=="REGISTER") {
            loginDiv.hide();
            displayRegister.show();
		  
        }
        else{
            loginObj.displayTable();
           // validate.alertDisplayLogout("profile update still pending");
        }
        
    }

    function displayTable() {
        
        tablePage.show();        
    }

}

var validate = new ValidationFormMain();

let submitBtn = $("#submit");


submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    validate.validationForm();
})



let storedArray=[];

function ValidationFormMain() {
    this.validationForm = validationForm;
    this.resetForm = resetForm;
    this.inputErrorDisplay = inputErrorDisplay;
    this.loginAuth=loginAuth;
	this.alertDisplay=alertDisplay;
    this.alertDisplayLogout=alertDisplayLogout;
    this.checkPassword=checkPassword;
	this.state=state;
	

    function validationForm() {
        let fname = $("#fname").val();
        let lname = $("#lname").val();

        let gender = $('#input[name="gender"]:checked');
        let mobile = $("#mobile").val();
        let dob = $("#dob").val();
        let age = $("#age").val();
		let email=$("#email").val();
		let password = $("#password").val();
		let confirmPassword = $("#confirmPassword").val();
        let city = $("#city").val();
        let addressArea = $("#addressArea").val();
        let checkboxes =$('#input[name="Skills"]:checked');
		 let state = $("#state").val();

		let pincode = $("#pincode").val();
		 let dateValidationResult = isValidDate(dob);
        
        let pattern = /^[a-zA-Z]{2,15}$/;
        let num = /\d/;
        let count = /\d{10}$/;
        let ageCount = /\d{1,2}$/;
        let dobvalidate = /\d{1,2}\/\d{1,2}\/\d{4}/;
        let address = /^.{2,250}$/;

        if (fname == "") {
            firstnameError.html("Enter first name it is mandatory");
            alertDisplay("Enter first name it is mandatory");

        }
		else if (!fname.match(pattern))
		{
			alertDisplay("First name not contain numbers");
		}
        else if (lname == "") {
            lastnameError.html("Enter last name it is mandatory");
            alertDisplay("Last name is mandatory");
        }
		else if (!lname.match(pattern)) {
            
            alertDisplay("Last name not contain numbers");
        }

        else if (!gender) {
            alertDisplay("Please select a gender");
        }
        else if (dob == '') {
            alertDisplay("Enter date of-birth");
        }
		else if (!dobvalidate.test(dob)) {
                alertDisplay("Please enter a valid date of birth in the format dd/mm/yyyy");
        }
        else if (dateValidationResult === "invalidFormat") {
                alertDisplay("Please enter a valid date of birth ");
               
        }
        else if (dateValidationResult === "invalidDate") {
                alertDisplay("Please enter a valid date");
                
        }
        else if (dateValidationResult === "futureDate") {
                alertDisplay("Date of birth should be before the year 2024");
                
        }
        else if (mobile == "") {
            alertDisplay("Please enter mobile number");
        }
        else if(!mobile.match("^[6-9][0-9]{8}")) {
            alertDisplay("Please enter proper mobile number");
        }
		else if(email==""){
		    alertDisplay("Please enter email id");
		}
		else if(!email.match("^(^[a-z][a-z0-9]*(\.[a-z0-9]+)*[@][a-z]+[.][a-z]{2,4}([.][a-z]{1,2})?)$"))
		{
		    alertDisplay("Please enter correct email id");
		}
		else if(password==""||confirmPassword==""){
		   alertDisplay("Please enter password");
		}
        else if(!password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/)){
           alertDisplay("Password must contain at least 9 characters, one capital letter, one digit, and one special character");
        }
		else if(!checkPassword()){
		    alertDisplay("Passwords are not same, keep it same");
		}
        else if (addressArea == "") {
            alertDisplay("Please enter address it is mandatory");
        }
        else if (!address.test(addressArea)) {
            alertDisplay("address Should be less than 250 characters");
        }
        else if (!count.test(mobile)) {
            alertDisplay("Enter 10 digit mobile no");
        }
        else if (pattern.test(mobile)) {
            alertDisplay("Mobile no not contain alphabets");
        }
		else if(age==""){
		    alertDisplay("Enter your age");
		}

        else if (!(age > 17 && age < 70)) {
            alertDisplay("Your age was not eligible for register");
        }
        else if (city == "") {
            alertDisplay("Please select city");
        }
		else if(state==""){
		   alertDisplay("Please select state");
		}
		else if(pincode==""){
		    alertDisplay("Please enter pincode");
		}
		else if(!pincode.match("^[1-9]{1}[0-9]{2}[0-9]{3}$")){
		    alertDisplay("Please enter correct pincode");
		}

        else if (checkboxes.length === 0) {
            $("#checkboxError").html("Please select at least one skill");
        }

        else {
			
           $("#alertBox").fadeIn();
			$("#alertBox").css("background", "green");
			$("#msg").text("Form Submitted successfully");
			$("#progressBar").css("animation", 'progress 3s 1 ease-in-out');
			$("#alertCloseBtn").click(function () { $("#alertBox").fadeOut(); })
			setTimeout(function () {
				$("#alertBox").fadeOut();
			}, 2500);

            // console.log("First: ",fname," Last: ",lname," gender: ",gender," dob: ",dob," age: ",age," mob: ",mobile," Email: ",email," Password : ",password ," Confirm: ",confirmPassword ," address: ",addressArea," city: ",city," pincode: ",pincode," Techinical: ",checkboxes );
            var selectedGender=gender.value;
            var box="";
            var selectedCheckboxValues = [];
           
             
            checkboxes.forEach(function(checkbox) {
               selectedCheckboxValues.push(checkbox.value);
             });
             var box=selectedCheckboxValues.join(", ");


            let storedObj={
                fname:fname,
                lname:lname,
                selectedGender:selectedGender,
                dob:dob,
                age:age,
                mobile:mobile,
                email:email,
                confirmPassword:confirmPassword,
                addressArea:addressArea,
                city:city,
				state:state,
                pincode:pincode,
                checkboxes:box
            };

            storedArray.push(storedObj);
			
          
           setTimeout( function(){loginObj.closePopup()},2500);
           setTimeout( function(){loginObj.displayTable()},2500);

		   
           generateTable();
          
           resetForm();         
                
        }
    }

    function generateTable() {
		

        var tbody = $("#Tablebody");
        
        tbody.html("");

        storedArray.forEach(function(obj) {
            var row = ("<tr></tr>");

            Object.keys(obj).forEach(function(key) {
                var cell = ("<td></td>");
                cell.textContent = obj[key];
                row.appendTo(cell);
            });

            tbody.appendTo(row);
        });
    }

   

    function isValidDate(dateString) {

        let datePattern = /^\d{1,2}\/\d{2}\/\d{4}$/;

        if (!datePattern.test(dateString)) {
            return "invalidFormat";
        }

        let splited = dateString.split('/');
        let day = parseInt(splited[0]);
        let month = parseInt(splited[1]) - 1;
        let year = parseInt(splited[2]);

        let testDate = new Date(year, month, day);

        if (testDate.getFullYear() !== year || testDate.getMonth() !== month || testDate.getDate() !== day) {

            return "invalidDate";
        }

        if (year >= 2024) {
            return "futureDate";
        }

        calculateAge(day, month, year);
        return true;
    }


    function calculateAge(day, month, year) {
        let ageInp = $("#age");

        let currentDate = new Date();

        let currentDay = currentDate.getDate();
        let currentMonth = currentDate.getMonth() + 1;
        let currentYear = currentDate.getFullYear();

        let age = currentYear - year;

        if (currentMonth < month || (currentMonth === month && currentDay < day)) {
            age--;
        }

        ageInp.val(age);
		ageInp.disabled=true;
        // return age;
    }

    function alertDisplay(msg) {
        $("#alertBox").fadeIn();
			$("#alertBox").css("background", "red");
			$("#msg").text(msg);
			$("#progressBar").css("animation", 'progress 3s 1 ease-in-out');
			$(".closebtn").click(function () { $("#alertBox").fadeOut(); })
			setTimeout(function () {
				$("#alertBox").fadeOut();
			}, 2500);


    }

    function alertDisplayLogin(msg) {
       $("#alertBoxLogin").fadeIn();
       $("#alertBoxLogin").css("background", "red");
       $("#msglogin").text(msg);
        $("#progressBarLogin").css("animation", 'progress 3s 1 ease-in-out');
       $(".closebtn").click(function () { $("#alertBoxLogin").fadeOut(); })
			setTimeout(function () {
				$("#alertBoxLogin").fadeOut();
			}, 2500);
    }

    function alertDisplayLogout(msg) {
       $("#alertBoxLogout").fadeIn();
       $("#alertBoxLogout").css("background", "red");
       $("#msglogout").text(msg);
        $("#progressBarLogout").css("animation", 'progress 3s 1 ease-in-out');
       $(".closebtn").click(function () { $("#alertBoxLogout").fadeOut(); })
			setTimeout(function () {
				$("#alertBoxLogout").fadeOut();
			}, 2000);

    }


    function resetForm() {
			          
		let formObj=$("#formObj");
		formObj.trigger("reset");
		
    }

	
    
    function inputErrorDisplay(e) {
		//let inp = e.target;
		           
			//let id = inp.id;
			//let value = $("#" + id).val();
			//let errorDiv = (id + "Error");

        let err = $("#"+e.name + "Error");
        let dobvalidate = /\d{1,2}\/\d{1,2}\/\d{4}/;

      
	   let passwardExp=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;

        

        if (e.id == "fname") {
            if (e.value.match("[^a-zA-Z]{2,15}$")) {
                err.html("Error: Name should not contain numbers or spaces");
            } else if (
                (event.keyCode >= 48 && event.keyCode <= 57) || 
                (event.keyCode >= 33 && event.keyCode <= 47) || 
                (event.keyCode >= 58 && event.keyCode <= 64) ||
                (event.keyCode >= 91 && event.keyCode <= 96) ||
                (event.keyCode >= 123 && event.keyCode <= 126) || 
                (event.keyCode >= 96 && event.keyCode <= 105)|| 
				event.keyCode >= 186 && event.keyCode <= 192 || event.keyCode >= 219 && event.keyCode <= 222 ||
                event.keyCode == 32 )
             {
                event.preventDefault();
                err.html("Error: Name should not contain numbers or spaces");
            } else if (event.target.value.length > 15 && event.keyCode !== 8) {
                event.preventDefault();
                err.html("Error: Exceeds the limit enter up to 15 characters");
            } else {
                err.html("&nbsp;");
            }
            e.addEventListener("paste", function(event) {
                
                event.preventDefault();
                err.html("Error: Pasting is not allowed");
            });
        }
        else if(e.id == "lname"){
            if (e.value.match("[^a-zA-Z]{2,15}$")) {
                err.html("Error: Last Name should not contain numbers or spaces");
            } else if (
                (event.keyCode >= 48 && event.keyCode <= 57) || 
                (event.keyCode >= 33 && event.keyCode <= 47) || 
                (event.keyCode >= 58 && event.keyCode <= 64) ||
                (event.keyCode >= 91 && event.keyCode <= 96) ||
                (event.keyCode >= 123 && event.keyCode <= 126) || 
                (event.keyCode >= 96 && event.keyCode <= 105)|| 
				event.keyCode >= 186 && event.keyCode <= 192 || event.keyCode >= 219 && event.keyCode <= 222 ||
                event.keyCode == 32 )
             {
                event.preventDefault();
                err.html("Error: Last Name should not contain numbers or spaces");
            } else if (event.target.value.length > 15 && event.keyCode !== 8) {
                event.preventDefault();
                err.html("Error: Exceeds the limit enter up to 15 characters");
            } else {
                err.html("&nbsp;");
            }
            e.addEventListener("paste", function(event) {
                
                event.preventDefault();
                err.html("Error: Pasting is not allowed");
            });

        }
        
        
        else if (e.id == "dob") {
            let dateValidationResult = isValidDate(e.val());
            let dobdate=$("#"+e.id);
           
            
            if (/[a-zA-Z\s]/.test(e.value)) {
                e.value = e.value.replace(/[a-zA-Z\s]/g, ''); 
                err.innerHTML = "Please enter numbers only";
                return;
            }
            if (e.value.length > 10) {
                e.value = e.value.substring(0, 10); 
               // err.innerHTML = "";
                return;
            }
			         
              else  if (!dobvalidate.test(e.value)) {
                    err.innerHTML = "Please enter a valid date of birth in the format dd/mm/yyyy";
                }
                
                else if (dateValidationResult === "invalidFormat") {
                    err.innerHTML = "Please enter a valid date of birth ";
                   
                }
                else if (dateValidationResult === "invalidDate") {
                    err.innerHTML = "Please enter a valid date";
                    
                }
                else if (dateValidationResult === "futureDate") {
                    err.innerHTML = "Date of birth should be before the year 2024";
                    
                }
                else {
                    err.innerHTML = "&nbsp;";
                }
                e.addEventListener("paste", function(event) {
                
                    event.preventDefault();
                    err.innerHTML = "Error: Pasting is not allowed";
                });
                

        }
		else if(e.id=="mobile"){
			if((event.keyCode >=65 && event.keyCode<= 90) || (event.keyCode >= 97 && event.keyCode <=122 ) ||(event.keyCode==32)
				|| (event.keyCode > 31) && (event.keyCode < 48 || event.keyCode > 57))
				{
                 event.preventDefault();
				err.innerHTML ="Mobile number contain only numbers";
			
			}
			else if(!e.value.match("^[6-9][0-9]{8}")){
				
			    err.innerHTML ="Enter correct mobile number";
				
			}
			
			else{
			 err.innerHTML = "&nbsp;";
			}
            e.addEventListener("paste", function(event) {
                
                event.preventDefault();
                err.innerHTML = "Error: Pasting is not allowed";
            });
		
		}
		else if(e.id=="email"){
           
           let validEmailid=/^(^[a-z][a-z0-9]*(\.[a-z0-9]+)*[@][a-z]+[.][a-z]{1,4}([.][a-z]{1,2})?)$/g;
          

           let email_id = document.getElementById(e.id);
           if (event.keyCode==32) {
            event.preventDefault();

           }

           email_id.addEventListener("input",()=>{
            if(email==" "){
                err.innerHTML ="Email id can not contain space";
            }
           else  if(!validEmailid.test(e.value)){
               
			   err.innerHTML ="Enter correct Email id";
			}
            

			else{
			 err.innerHTML = "&nbsp;";
			}
           });
          email_id.addEventListener("paste", function(event) {
                
            event.preventDefault();
            err.innerHTML = "Error: Pasting is not allowed";
        });
            
		
		}
        else if(e.id=="age"){
            if (/[a-zA-Z]/.test(e.value)) {
                e.value = e.value.replace(/[a-zA-Z]/g, ''); 
                err.innerHTML = "Please enter numbers only";
                return;
            }

        }
		else if(e.id=="password"){
            if (e.value.length > 15) {
                e.value = e.value.substring(0, 15); 
                err.innerHTML = "Password can only contain 15 characters";
                return;
            }
            if (!e.value.match(passwardExp)) {
                err.innerHTML = "Password must contain at length 9 to 15,one capital letter,one digit,and one special character";
            }
           
            else {
                err.innerHTML = "&nbsp;";
            }
            
		}
		else if(e.id=="confirmPassword"){
		    if(!checkPassword()){

			  err.innerHTML = "Password mismatch";
			}
			else{
			err.innerHTML = "&nbsp;";
			}
            e.addEventListener("paste", function(event) {
                
                event.preventDefault();
                err.innerHTML = "Error: Pasting is not allowed";
            });
		}
		else if(e.id=="pincode"){
			if (/[a-zA-Z]/.test(e.value)) {
                e.value = e.value.replace(/[a-zA-Z]/g, ''); 
                err.innerHTML = "Please enter numbers only";
                return;
            }
            if (e.value.length > 6) {
                e.value = e.value.substring(0, 6); 
                err.innerHTML = "Pincode can only contain 6 numbers";
                return;
            }

		  else if(!e.value.match("^[1-9]{1}[0-9]{2}[0-9]{3}$")){
		   err.innerHTML = "Enter correct pincode";
		   }
		  
		   else{
		   err.innerHTML = "&nbsp;";
		   }
           e.addEventListener("paste", function(event) {
                
            event.preventDefault();
            err.innerHTML = "Error: Pasting is not allowed";
        });
		}

    }
	
	function state(){
	let state = document.getElementById("state").value;
	if(state !=""){
	   let city = document.getElementById("city");
	   city.disabled=false;
	}
	}

	function checkPassword(){
	      let password = document.getElementById("password").value;
		 let confirmPassword = document.getElementById("confirmPassword").value;
		 if(password==confirmPassword){
		    return true;
		 }
 
	}

	 function loginAuth(btn) {
        var Username = "gaurav@gmail.com";
        var password = "Gaurav@1234";
        var inpUsername = document.getElementById("Username").value;
        var inpPassword = document.getElementById("Password").value;
        var LoginLink = document.getElementById("LoginLink").innerHTML;

        console.log(inpUsername);
        console.log(inpPassword);
        if (Username == inpUsername && password == inpPassword) {
            loginObj.closePopup();
            document.getElementById("LoginLink").innerHTML = "LOGOUT";
            document.getElementById("RegisterLink").innerHTML ="Welcome Gaurav";
            document.getElementById("RegisterLink").style.color="#2ec4b6";
        }
		else if(inpUsername=="" || inpPassword==""){
            alertDisplayLogin("Please enter user name and password");
		}
        else {
            alertDisplayLogin("User not found Login again");
        }
    }

}

}