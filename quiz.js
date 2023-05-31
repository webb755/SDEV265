/*	
	DEV 265 Final Project
	
	Author: 	Ben Webb, Tyler Smekens, Jeff Longsworth
	
	Date:   	12/1/2022
	
	Filename: quiz.js
	
	Updates:
		12/1/22 - Added functions to hide the quiz and show the user's results based on his score
*/

"use strict"; // interpret document contents in Javascript strict mode
const questions = new Array("Question 1: The world can be a dangerous place, how do you prepare yourself?",
	"Question 2: You must recover from your injuries, what is the best use of this time while you cannot physically train?",
	"Question 3: Why would you seek to learn everything there is to know about a subject?",
	"Question 4: Training requires you learn the craft, work with others, and challenge yourself; What area will you need to grow the most to reach success?",
	"Question 5: You will rally others, what in you motivates them?",
	"Question 6: Where would you most like to live?",
	"Question 7: What do you seek when you travel?",
	"Question 8: You must spend the next year on a project, which would be best for you?",
	"Question 9: What gives you the most fulfillment in life?",
"Question 10: You need to rebuild your life after a difficult time and must stay positive, how do you view this?");

const answers = new Array("	A. I must be strong, physically and mentally. Prepared to defend myself and others.",
	"B. I must learn all I can, strength lives or dies on planning. ",
	"C. It will take the efforts of many to survive, we must cultivate allies and create hope.",
	"A. I will rest well. Returning stronger requires patience.",
	"B. I will examine how and why this happened to ensure my training doesn't lapse again.",
	"C. I seek the counsel of my caretakers; they will make me strong again.",
	"A. This is what is necessary, that makes it important.",
	"B. Ways of knowing are the key to advancement for myself and the world.",
	"C. I have no right to walk among others without understanding their world.",
	"A. I will walk away with a greater understanding of study.  A fight is not always won in the ring.",
	"B. I have overcome many challenges before, but this will require more than just me.",
	"C. I cannot rely on everyone else all the time, I must harden my grit to get through.",
	"A. They will be inspired by my resolve.",
	"B. They will see that I am prepared.",
	"C. Their morale is lifted by my presence.",
	"A. In a city or town with others like me, living alongside others and contributing.",
	"B. On a university campus where I balance my life with pursuits of mastery.",
	"C. On a farm where I work to sustain my home's self-sufficiency.",
	"A. To see the world.",
	"B. To learn about new places.",
	"C. To collect memories and mementos.",
	"A. Write a book about whatever you want.",
	"B. Learn a new skill.",
	"C. Improve myself physically and mentally to improve the rest of my life.",
	"A. My career.",
	"B. My hobbies.", 
	"C. My family.",
	"A. I can rebuild my life with those who are still a part of it.",
	"B. This is an opportunity to reinvent myself!",
"C. I have made it to the other side of this struggle, my life will improve as a result.");

const classText = new Array('Warrior: The Warrior is a skilled combatant whose toughness and grit will see them through any challenge. "I will hold fast and overcome!"',
	'Cleric: The Cleric uses deep knowledge of the world, both magic and mundane, to find solutions to overcome challenge. "Power comes not from the tip of the spear, but from the wise application of its user."',
'Chaplain: Chaplains are the spiritual leaders of the people; warrior monks who inspire others and wield great powers of influence. "Legends will be made of our faith, our strength, our mission!"');

const raceText = new Array('Human: Humans are a diverse group who occupy all levels of society, possessing significant martial, political, and economic power world-wide and able to use magic using totems imbued with their spirit. Humans have a rich and varied history that spans the globe and influences all things in their world with vast empires that each have unique cultures, militaries, and lives. Able to appeal to many across the world, humans are solid all-rounders who can excel in any role. ',	
	'Sindari: respected everywhere, Sindari society stems from a cultured past built on their innate ability to control magic. They view the world through a philosophy of "Three Pillars": the way of the warrior, the wisdom of the teacher, and the spirit of the divine. They can live for hundreds of years and spend their lives in long phases where they strive to reach proficiency in each pillar. They are revered for their skills and can often be found in high places of society or are sought out for their prowess in specific areas; where there is challenge, there is a Sindari seeking to master it. ',
'Baluk: Organized into small tribes scattered across the untamed lands between population centers, the Baluk are rugged and renowned for their knowledge of survival and warfare which is magically transposed intergenerationally each time a Baluk overcomes challenges. They organize their lives around trials of "the Calmur" where adolescents embark on a pilgrimage to unlock their generational memories before returning to their clans. Baluk are strong and skilled; aspirants of pilgrimage often accompany adventurers and can draw on generational wisdom from those in their clans even when far apart. ');

const characterImages = new Array("Human_warrior_female.jpg", "human_warrior_male.jpg", "human_cleric_female.jpg", "human_cleric_male.png", "human_chaplain_female.jpg", "human_chaplain_male.jpg",
"sindari_warrior_female.jpg", "Sindari_warrior_male.jpg", "sindari_cleric_female.jpg", "sindari_cleric_male.jpg", "sindari_chaplain_female.jpg", "sindari_chaplain_male.png",
"baluk_warrior_female.jpg", "baluk_warrior_male.jpg", "baluk_cleric_female.jpg", "baluk_cleric_male.jpg", "baluk_chaplain_female.jpg", "baluk_chaplain_male.jpg");

/* Global variables */
var questionIndex = 0;
var classTotals = new Array(0, 0, 0);
var raceTotals = new Array(0, 0, 0);

function setupPage()
{
	document.getElementById("submitButton").action = startQuiz();
	document.getElementById("imageOne").hidden = true;
	document.getElementById("imageOne").src = "";
	document.getElementById("imageTwo").hidden = true;
	document.getElementById("imageTwo").src = "";
}

function startQuiz(evt)
{
	if (evt.preventDefault)
	{
		evt.preventDefault(); // prevent form from submitting
	}
	else
	{
		evt.returnValue = false; // prevent form from submitting in IE8
	}
	
	var submitButton = document.getElementById("submitButton");
	var label = document.getElementById("questionLabel");
	var answer1 = document.getElementById("answer1Label");
	var answer2 = document.getElementById("answer2Label");
	var answer3 = document.getElementById("answer3Label");
	var radioButtons = document.querySelectorAll("input[type=radio]");
	
	for (var i = 0; i < radioButtons.length; i++)
	{
		radioButtons[i].hidden = false;
	}
	
	label.innerHTML = questions[questionIndex];
	answer1Label.innerHTML = answers[questionIndex];
	answer2Label.innerHTML = answers[questionIndex + 1];
	answer3Label.innerHTML = answers[questionIndex + 2];
	
	submitButton.value = "Next Question";
	
	var form = document.getElementsByTagName("form")[0];	
	if (form.addEventListener)
	{
		form.removeEventListener("submit", startQuiz, false);
		form.addEventListener("submit", submitAnswer, false);
	}
	else if (form.attachEvent)
	{
		form.detachEvent("onsubmit", startQuiz);
		form.attachEvent("onsubmit", submitAnswer);
	}
}

function submitAnswer(evt)
{	
	if (evt.preventDefault)
	{
		evt.preventDefault(); // prevent form from submitting
	}
	else
	{
		evt.returnValue = false; // prevent form from submitting in IE8
	}
	
	var answerValues = answers.slice(questionIndex * 3, (questionIndex * 3) + 3);
	var label = document.getElementById("questionLabel");
	var choices = document.querySelectorAll("input[type=radio]");
	var answer1 = document.getElementById("answer1Label");
	var answer2 = document.getElementById("answer2Label");
	var answer3 = document.getElementById("answer3Label");
	
	// Do nothing if no choice is selected
	if (!choices[0].checked && !choices[1].checked && !choices[2].checked)
	{
		return;
	}
	else
	{			
		questionIndex++;
	}
	
	if (questionIndex > questions.length - 1)
	{
		showResults();
	}
	
	logScore(choices);
	
	label.innerHTML = questions[questionIndex];
	answer1Label.innerHTML = answerValues[0];
	answer2Label.innerHTML = answerValues[1];
	answer3Label.innerHTML = answerValues[2];
}

// Adjusts the race and class scores based on selected option
function logScore(choices)
{
	if (choices[0].checked)
	{
		choices[0].checked = false;
		if (questionIndex < 6)
		{
			classTotals[0]++;
		}
		else
		{
			raceTotals[0]++;
		}
	}
	else if (choices[1].checked)
	{
		choices[1].checked = false;
		if (questionIndex < 6)
		{
			classTotals[1]++;
		}
		else
		{
			raceTotals[1]++;
		}
	}
	else
	{
		choices[2].checked = false;
		if (questionIndex < 6)
		{
			classTotals[2]++;
		}
		else
		{
			raceTotals[2]++;
		}
	}
}

// Determine quiz results
function getQuizResults()
{
	var classIndex = classTotals.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
	var raceIndex = raceTotals.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
	
	document.getElementById("quizCharResult").innerHTML = classText[classIndex];
	document.getElementById("quizRaceResult").innerHTML = raceText[raceIndex];
	return new Array(classIndex, raceIndex);
}

// Hides the quiz and displays the user's results.
function showResults()
{	
	var resultsIndexes = getQuizResults();
	displayImages(resultsIndexes);
	document.getElementById("questions").hidden = true;
	document.getElementById("quizResults").hidden = false;
}

/* Shows the images which match the user's selected class/race */
function displayImages(resultsIndexes)
{
	var imageOne = document.getElementById("imageOne");
	var imageTwo = document.getElementById("imageTwo");
	
	var classIndex = resultsIndexes[0];
	var raceIndex = resultsIndexes[1];
	
	var imageOneSrc = 0;
	var imageTwoSrc = 0;
	
	if (classIndex === 0 && raceIndex === 0)
	{
		// human warrior
		imageOneSrc = characterImages[0];
		imageTwoSrc = characterImages[1];
	}
	else if (classIndex === 1 && raceIndex === 0)
	{
		// human cleric
		imageOneSrc = characterImages[2];
		imageTwoSrc = characterImages[3];
	}
	else if (classIndex === 2 && raceIndex === 0)
	{
		// human chaplain
		imageOneSrc = characterImages[4];
		imageTwoSrc = characterImages[5];
	}
	else if (classIndex === 0 && raceIndex === 1)
	{
		// sindari warrior
		imageOneSrc = characterImages[6];
		imageTwoSrc = characterImages[7];
	}
	else if (classIndex === 1 && raceIndex === 1)
	{
		// sindari cleric
		imageOneSrc = characterImages[8];
		imageTwoSrc = characterImages[9];
	}
	else if (classIndex === 2 && raceIndex === 1)
	{
		// sindari chaplain
		imageOneSrc = characterImages[10];
		imageTwoSrc = characterImages[11];
	}
	else if (classIndex === 0 && raceIndex === 2)
	{
		// baluk warrior
		imageOneSrc = characterImages[12];
		imageTwoSrc = characterImages[13];
	}
	else if (classIndex === 1 && raceIndex === 2)
	{
		// baluk cleric
		imageOneSrc = characterImages[14];
		imageTwoSrc = characterImages[15];
	}
	else if (classIndex === 2 && raceIndex === 2)
	{
		// baluk chaplain
		imageOneSrc = characterImages[16];
		imageTwoSrc = characterImages[17];
	}
	
	imageOne.src = "images\\" + imageOneSrc;
	imageOne.hidden = false;
	
	imageTwo.src = "images\\" + imageTwoSrc;
	imageTwo.hidden = false;
}

/* create event listeners */
function createEventListeners()
{
	var form = document.getElementsByTagName("form")[0];
	if (form.addEventListener)
	{
		form.addEventListener("submit", startQuiz, false);
	}
	else if (form.attachEvent)
	{
		form.attachEvent("onsubmit", startQuiz);
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