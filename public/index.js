(function() {
	RegApp=angular.module("RegApp",["720kb.datepicker"]);

	var RegCtl=function($http) {
		var regCtl=this;
		regCtl.validCountries=["","Singapore","Malaysia","Thailand","Philippines","Vietnam","Indonesia"];
		regCtl.message="XXX";

		regCtl.name="";
		regCtl.email="";
		regCtl.password="";
		regCtl.gender="";
		regCtl.dob="01/01/2000";
		regCtl.address="";
		regCtl.country="";
		regCtl.phone="";

// 	regCtl.isValid=function(form,field) {
// 		if (form[field].$pristine) return({classval:"",ifval:false});
// 		if (form[field].$invalid && form[field].$dirty) {return {classval:"has-error",ifval:true};}
// 		else {return {classval:"has-success",ifval:false};}
// 		}
		regCtl.isValid=function(form,field) {
			var val=regCtl[field];
			var msg="";
			var valid=false;
			var classval="has-error";

         switch(field) {
				case "name":
					if (val && -1!=val.search(/^[a-zA-Z'\s]+$/i)) {     
						valid=true;
						classval="has-success";
					} else {
						msg="Please enter a valid @#$ name";
					}
					break;
				case "email":
					if (form[field].$valid) {
						if (val && -1!=val.search(/@.+?\..+/i)) { // Fix HTML5's idea of a valid address
							valid=true;
							classval="has-success";
							}
						else {
							msg="That might work for HTML5 but it's not good enough for me";
						}
					} else {
						msg="Please enter a valid email address";
					}
               break;
				case "password":
					if (val && -1!=val.search(/^[a-zA-Z0-9@#$]{8,20}$/i)) {     
					   var hasUpper=(-1!=val.search(/[A-Z]/));
						var hasLower=(-1!=val.search(/[a-z]/)); 
						var hasDigit=(-1!=val.search(/[0-9]/)); 
						var hasSpecial=(-1!=val.search(/[@#$]/)); 

						if (hasUpper && hasLower && hasDigit && hasSpecial) {
							valid=true;
							classval="has-success";
						}
						else { // used valid characters, but not the right mix
							msg="Please include at least one uppercase, one lowercase, one digit and one special character";
						}
					} else { // used invalid characters, or too short
						msg="Invalid password. Please enter at least 8 characters, allowed are letters,numbers, special characters (@#$)";
					}
               break;
				case "gender":
					if (val && (val=="Male" || val=="Female" || val=="Decline")) {
						valid=true;
						classval="has-success";
					} else {
						msg="Please choose a gender";
					}
               break;
				case "dob":
					if (!val || val.length==0) {
						msg="Please enter a date";
					}
					else {
						var date_now = new Date();
						var date_dob = new Date(val);
						var days = (date_now.getTime() - date_dob.getTime())/(1000*60*60*24);
						if (days<(18*365)) {
							msg="Must be older than 18 to register";
						}
						else {
							valid=true;
							classval="has-success";
						}
					}
					break;
				case "address":
					if (val && val.length>0) {
						valid=true;
						classval="has-success";
					}
					else {
						msg="Please enter an address";
						}
					break;
				case "country":
					if (val && val.length>0) {
						valid=true;
						classval="has-success";
					}
					else {
						msg="Please choose a country";
						}
					break;
				case "phone":
					if (val && -1!=val.search(/^\+?[1-9]{1}[0-9\-\(\)\s]{7,15}$/)) {
						valid=true;
						classval="has-success";
					} else {
						msg="Please enter a valid phone number";
					}
               break;
				default:
					//
				}
				// return result of validation
 				// console.log("Returning", {classval:classval,isvalid:valid,msg:msg});
 				return {classval:classval,isvalid:valid,msg:msg};
			}

		regCtl.resetForm=function() {
			regCtl.name="";
			regCtl.email="";
			regCtl.password="";
			regCtl.gender="";
			regCtl.dob="";
			regCtl.address="";
			regCtl.country="";
			regCtl.phone="";
			regCtl.message="";
			}
		regCtl.submitForm=function() {
			console.log("in submitForm()");
			var the_record={
				name:regCtl.name,
				email:regCtl.email,
				password:regCtl.password,
				gender:regCtl.gender,
				dob:regCtl.dob,
				address:regCtl.address,
				country:regCtl.country,
				phone:regCtl.phone,
			}
			var p=$http.get("/register",{params:{record:the_record}});
			p.then(function(success) {
					regCtl.message="Registration was successful";
				}, function(err) {
					regCtl.message="ERROR in submitting registration";
				});
			}
	}                           
	RegCtl.$inject=["$http"];

	RegApp.controller("RegCtl",RegCtl);
})();
