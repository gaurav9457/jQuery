$(function () {
	var validate = new FormValidationMain();

	$("#submit").click(function (e) {
		e.preventDefault();
		validate.formValidation();
	});

	let fname = $("#fname");
	let lname = $("#lname");
	let gender = $('input[name="gender"]:checked');


	let age = $("#age");
	let mobile = $("#mobile");
	let addressArea = $("#addressArea");
	let city = $("#city");
	let checkboxes = $('input[name="Skills"]:checked');


	function FormValidationMain() {

		this.formValidation = formValidation;
		this.alertDisplay = alertDisplay;
		this.inputErrorDisplay = inputErrorDisplay;
		this.validateName = validateName;
		this.isValidDate = isValidDate;
		this.validateMobile=validateMobile;
		this.resetForm = resetForm;


		function formValidation(e) {

			let dobVal = $("#dob").val();
			let dob = dobVal;
			let dateValidationResult = isValidDate(dob);

			console.log("gender", gender);
			let genderVal = $('input[name="gender"]:checked').val();
			let checkboxesVal = $('input[name="Skills"]:checked').val();

			if (fname.val() == "" || !validateName(fname.val())) {
				alertDisplay("Enter the first name and not contain numbers");

			}
			else if (lname.val() == "" || !validateName(lname.val())) {
				alertDisplay("Enter the last name and not contain numbers ");

			}
			else if (!genderVal) {
				alertDisplay("Select gender");

			}
			else if (dob == '') {
				alertDisplay("Enter date of-birth");
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
			else if (age.val()=="")
			{
				alertDisplay("Enter your age");

			}
			else if (!(age.val() > 17 && age.val() < 70)) {
                 alertDisplay("Your age was not eligible for register");
            }
			else if (!validateMobile(mobile.val()))
			{
				alertDisplay("Enter valid mobile number of 10 digit only");
			}
			else if (addressArea.val()=="")
			{
				alertDisplay("Please enter full address ");
			}
			
            else if (city.val() == "") {
                 alertDisplay("Please select city");
            }
			else if (!checkboxesVal)
			{
				alertDisplay("Please select one check box");
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

				resetForm();
			}


		};



		window.addEventListener("input", inputErrorDisplay);


		function validateName(value) {

			let pattern = /^[a-zA-Z]{1,15}$/;
			if (!value.match(pattern)) {

				return false;
			}
			else {
				return true;
			}
		}
		
		function validateMobile(value) {

			let pattern = /\d{10}$/;
			if (!value.match(pattern)) {

				return false;
			}
			else {
				return true;
			}
		}


		function inputErrorDisplay(ip) {
			let pattern = /^[a-zA-Z]{1,15}$/;
			let dobvalidate = /\d{1,2}\/\d{1,2}\/\d{4}/;
			let address = /^.{2,250}$/;
			let dateValidationResult ;
			let inp = ip.target;
           
			let id = inp.id;
			let value = $("#" + id).val();
			 


			let errorDiv = (id + "Error");

			if (id == "fname" && !validateName(value) && value != "") {

				$('#' + errorDiv).text("Don't enter number");
			}
			else if (id == "lname" && !validateName(value) && value != "") {

				$('#' + errorDiv).text("Don't enter number");
			}
			
			else if (id == "dob" && !value.match(dobvalidate)) {
				$('#' + errorDiv).text("Please enter date in the form of dd/mm/yyyy");
			}
			
			
			else if (id == "addressArea" && !value.match(address) )
			{
				$('#' + errorDiv).text("Please fill the addres");
			}

			else {
				$('#' + errorDiv).html("&nbsp;");
			}

		}

		function isValidDate(dateString) {
			console.log("date", dateString);
			let datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

			if (!datePattern.test(dateString)) {
				return "invalidFormat";
			}

			let dateNum = dateString.split('/');
			let day = parseInt(dateNum[0]);
			let month = parseInt(dateNum[1]) - 1;
			let year = parseInt(dateNum[2]);

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
			// return age;
		}




		function alertDisplay(msg) {
			$("#alertBox").fadeIn();
			$("#alertBox").css("background", "linear-gradient(147deg, #990000 0%, #ff0000 74%)");
			$("#msg").text(msg);
			$("#progressBar").css("animation", 'progress 3s 1 ease-in-out');
			$("#alertCloseBtn").click(function () { $("#alertBox").fadeOut(); })
			setTimeout(function () {
				$("#alertBox").fadeOut();
			}, 3000);

		}

		function resetForm() {
		let formObj=$("#formObj");
		formObj.trigger("reset");

		}

	}
});