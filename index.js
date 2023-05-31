/*	
	DEV 265 Final Project
	
	Author: 	Ben Webb, Tyler Smekens, Jeff Longsworth
	Date:   	11/18/2022
	
	Filename: index.html
	Updates: 12/01/22 
	- Added ability to send JSON to an API if the URI is provided.
*/

"use strict"; // interpret document contents in Javascript strict mode

/* global variables */	
var formValidity = true;

/* validate that an email address is entered */
function validateEmail()
{
	var emailInput = document.getElementById("newsEmail");
	var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
	var errorDiv = document.getElementById("errorEmail");
	var requiredValidity = true;
	
	try
	{
		if (emailCheck.test(emailInput.value) === false)
		{
			throw "Please provide a valid email address";
		}	
		
		var validDomains = new Array("com", "edu", "org", "co.uk", "fr", "net", "de", "au");
		var validDomain = false;
		for (var i = 0; i < validDomains.length; i++)
		{
			if (emailInput.value.includes(validDomains[i]))
			{
				validDomain = true;
				break;
			}
		}
		if (!validDomain)
		{
			throw "Please enter a valid e-mail domain";
		}
		
		// remove any email error styling and message
		emailInput.style.background = "";
		errorDiv.innerHTML = "";
		errorDiv.style.display = "none";
		// convert email address to lowercase
		emailInput.value = emailInput.value.toLowerCase();
	}
	catch(msg)
	{
		emailInput.style.background = "rgb(255,233,233)";
		errorDiv.style.display = "block";
		errorDiv.style.color = "red";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}

/* validate form */
function validateForm(evt)
{
	if (evt.preventDefault)
	{
		evt.preventDefault(); // prevent form from submitting
	}
	else
	{
		evt.returnValue = false; // prevent form from submitting in IE8
	}
	formValidity = true;	
	validateEmail();
	if (formValidity === true)
	{
		var sent = false;
		try
		{		
			sendJsonToApi();
			sent = true;
		}
		catch(error)
		{
			throw "Unable to sign up.";
		}
		if (sent === true)
		{
			document.getElementById("emailLabel").hidden = true;
			document.getElementById("emailEntry").hidden = true;
			document.getElementById("emailSuccess").hidden = false;
		}
	}
}

/* Send the e-mail to your api */
function sendJsonToApi()
{
	const uri = ""; // Enter your URI here
	
	var email = document.getElementById("newsEmail").value;
	let postObject = { title: "NewsLetter", body: email };
	let post = JSON.stringify(postObject);
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", uri, true);
	xmlhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	xmlhttp.send(post);
	xmlhttp.onload = function () { if (xmlhttp.status === 201) { console.log("Post successful") } };
}

/* create event listeners */
function createEventListeners()
{
	var form = document.getElementsByTagName("form")[0];
	if (form.addEventListener)
	{
		form.addEventListener("submit", validateForm, false);
	}
	else if (form.attachEvent)
	{
		form.attachEvent("onsubmit", validateForm);
	}
}

/* run setup when page finishes loading */
if (window.addEventListener)
{
	window.addEventListener("load", createEventListeners, false);
}
else if (window.attachEvent)
{
	window.attachEvent("onload", createEventListeners);
}