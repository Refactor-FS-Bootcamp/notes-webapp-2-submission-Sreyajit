let skills = document.querySelector(".skills");
let skillsArchived = document.createElement("div");
let submitButton = document.querySelector(".submitButton");
let backUpButton = document.querySelector(".backUpButton");
let deleteButton = document.querySelector(".deleteButton");
let showAllButton = document.querySelector(".showAllButton");
let searchButton = document.querySelector(".searchButton");
submitButton.addEventListener("click", createObject);
backUpButton.addEventListener("click", BackupObject);
deleteButton.addEventListener("click", deleteObject);
let objectArray = [];
addEventListener("beforeunload", () => {});
localStorage.setItem("array", JSON.stringify(objectArray));
postSpace();
searchButton.addEventListener("click", () =>
	postSearchSpace(document.querySelector("#search").value)
);
let title = document.getElementById("name");
let description = document.getElementById("Query");
let date = document.getElementById("Number");
let object = {};
let objectTime;
let id;
let title1 = document.createElement("h1");
title1.innerText = "Notes";
let title2 = document.createElement("h1");
title2.innerText = "Archived Notes";
function createObject() {
	object = {
		title: title.value,
		description: description.value,
		date: date.value,
	};
	if (object.title !== "" && object.description !== "" && object.date !== "") {
		object.objectTime = new Date().getTime();
		object.id = object.objectTime + Math.floor(Math.random() * 10000);
		object.isChecked = false;
		object.isEdited = false;
		object.isArchived = false;
		objectArray = JSON.parse(localStorage.getItem("array"));
		objectArray.push(object);
		localStorage.setItem("array", JSON.stringify(objectArray));
	} else {
		alert("please fill the full form");
	}
	postSpace();
}
function postSpace() {
	objectArray = JSON.parse(localStorage.getItem("array"));
	let allDeleted = objectArray.every((object) => object.isChecked == true);
	let noneDeleted = objectArray.every((object) => object.isChecked == false);
	let nullOrNot = objectArray == null;
	if (nullOrNot || objectArray.length == 0) {
		deleteButton.style.display = "none";
		showAllButton.style.display = "none";
		backUpButton.style.display = "none";
		noObjectPresent();
	} else {
		if (allDeleted) {
			deleteButton.style.display = "none";
			showAllButton.style.display = "none";
			backUpButton.style.display = "flex";
		} else if (noneDeleted) {
			deleteButton.style.display = "flex";
			showAllButton.style.display = "flex";
			backUpButton.style.display = "none";
		} else {
			deleteButton.style.display = "flex";
			showAllButton.style.display = "flex";
			backUpButton.style.display = "flex";
		}
		skills.innerHTML = "";
		skillsArchived.innerHTML = "";
		objectArray.sort((a, b) => {
			if (a.objectTime > b.objectTime) {
				return -1;
			} else if (a.objectTime < b.objectTime) {
				return 1;
			} else {
				return 0;
			}
		}); 
		showAllButton.addEventListener("click", () => {
			//todo find why this is getting called twice
			debugger;
			console.log("it is clicked");
			document.body.insertBefore(title1, skills);
			skillsArchived.className = "skillsArchived";
			document.body.appendChild(title2);
			document.body.appendChild(skillsArchived);
		});
		objectArray.forEach((element) => {
			if (element.isChecked == false) {
				cardCreator(element);
			}
		});
	}
}
function cardCreator(object) {
	let skill = document.createElement("div");
	let title = document.createElement("h2");
	let skillBody = document.createElement("div");
	let date = document.createElement("p");
	let checkbox = document.createElement("input");
	let editButton = document.createElement("input");
	let archiveButton = document.createElement("input");
	checkbox.className = "checkBox";
	skill.className = "skill";
	skillBody.className = "skillBody";
	editButton.className = "editButton";
	archiveButton.className = "archiveButton";
	checkbox.type = "checkbox";
	editButton.type = "button";
	archiveButton.type = "button";
	editButton.value = "Edit";
	archiveButton.value = "Archive";
	editButton.id = "button";
	archiveButton.id = "button";
	title.innerText = "Title:" + object.title;
	skillBody.innerText = object.description;
	date.innerText = "Dated:" + object.date;
	skill.appendChild(checkbox);
	skill.appendChild(title);
	skill.appendChild(skillBody);
	skill.appendChild(date);
	if (object.isEdited == true) {
		let modified = document.createElement("p");
		modified.innerText =
			"Modified on: " + new Date(object.objectTime).toString();
		skill.appendChild(modified);
	}
	skill.appendChild(editButton);
	if (object.isArchived == false) {
		skill.appendChild(archiveButton);
		skills.appendChild(skill);
		archiveButton.addEventListener("click", () => archiveObject(object));
	} else {
		skillsArchived.appendChild(skill);
	}
	checkbox.addEventListener("click", () => cardChecked(object));
	editButton.addEventListener("click", () => editObject(object));
}
function noObjectPresent() {
	skills.innerHTML = "";
	let h2 = document.createElement("h2");
	h2.innerText =
		"No posts found to display- fill the above form and click on the submit button to add posts to display here";
	skills.appendChild(h2);
}
function deleteObject() {
	alert("are you sure you want to delete these posts?");
	postSpace();
}
function editObject(object) {
	alert("Are you sure you want to edit the post?");
	objectArray = JSON.parse(localStorage.getItem("array"));
	id = object.id;
	indexToEdit = objectArray.findIndex((element) => element.id === id);
	title.focus();
	title.placeholder = "Edit title here";
	description.placeholder = "Edit description here";
	date.placeholder = "Edit date here";
	submitButton.value = "Save";
	submitButton.removeEventListener("click", createObject);
	title.value = "";
	description.value = "";
	date.value = "";
	submitButton.addEventListener("click", () => {
		alert("Are you sure you want to save the post?");
		if (title.value !== "" && description.value !== "" && date.value !== "") {
			object.title = title.value;
			object.description = description.value;
			object.date = date.value;
			object.objectTime = new Date().getTime();
			object.isEdited = true;
			objectArray[indexToEdit] = object;
			localStorage.setItem("array", JSON.stringify(objectArray));
			title.placeholder = "Write the title";
			description.placeholder = "Write the description";
			date.placeholder = "Give the date";
			submitButton.value = "Submit";
			submitButton.addEventListener("click", createObject);
		} else {
			alert("please fill the full form");
		}
		postSpace();
	});
}
function BackupObject() {
	alert("are you sure you want to bring back the deleted posts?");
	objectArray = JSON.parse(localStorage.getItem("array"));
	objectArray.forEach((object) => {
		if (object.isChecked == true) {
			object.isChecked = false;
		}
	});
	localStorage.setItem("array", JSON.stringify(objectArray));
	postSpace();
}
function cardChecked(object) {
	objectArray = JSON.parse(localStorage.getItem("array"));
	let indexToCheck = objectArray.findIndex(
		(element) => element.id === object.id
	);
	objectArray[indexToCheck].isChecked = !objectArray[indexToCheck].isChecked;
	localStorage.setItem("array", JSON.stringify(objectArray));
}
function postSearchSpace(title) {
	skills.innerHTML = "";
	let checker = 0;
	objectArray = JSON.parse(localStorage.getItem("array"));
	objectArray.forEach((object) => {
		if (object.title === title && object.isChecked == false) {
			cardCreator(object);
			checker++;
		}
	});
	if (checker === 0) {
		noSearchObjectPresent();
	}
}
function noSearchObjectPresent() {
	skills.innerHTML = "";
	let h2 = document.createElement("h2");
	h2.innerText =
		"No posts found - either it was deleted or you have given the wrong title press f5 to see the notes present.";
	skills.appendChild(h2);
}
function archiveObject(object) {
	objectArray = JSON.parse(localStorage.getItem("array"));
	let indexToCheck = objectArray.findIndex(
		(element) => element.id === object.id
	);
	objectArray[indexToCheck].isArchived = !objectArray[indexToCheck].isArchived;
	localStorage.setItem("array", JSON.stringify(objectArray));
	postSpace();
}
