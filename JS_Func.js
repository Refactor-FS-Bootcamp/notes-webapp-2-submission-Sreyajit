let skills = document.querySelector(".skills");
let submitButton = document.querySelector(".submitButton");
let backUpButton = document.querySelector(".backUpButton");
let deleteButton = document.querySelector(".deleteButton");
submitButton.addEventListener("click", createObject);
backUpButton.addEventListener("click", BackupObject);
deleteButton.addEventListener("click", deleteObject);
let title = document.getElementById("name");
let description = document.getElementById("Query");
let date = document.getElementById("Number");
let objectArray = [];
localStorage.setItem("array", JSON.stringify(objectArray));
let object = {};
let objectTime;
postSpace();
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
		objectArray.push(object);
		localStorage.setItem("array", JSON.stringify(objectArray));
	} else {
		alert("please fill the full form");
	}
	postSpace();
}
function postSpace() {
	objectArray = JSON.parse(localStorage.getItem("array"));
	if (
		objectArray == null ||
		objectArray.every((object) => object.isDeleted == true)
	) {
		noObjectPresent();
	} else {
		skills.innerHTML = "";
		objectArray.sort((a, b) => {
			if (a.objectTime > b.objectTime) {
				return -1;
			} else if (a.objectTime < b.objectTime) {
				return 1;
			} else {
				return 0;
			}
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
	checkbox.className = "checkBox";
	skill.className = "skill";
	skillBody.className = "skillBody";
	checkbox.type = "checkbox";
	deleteButton.value = "Delete";
	editButton.type = "button";
	editButton.value = "Edit";
	editButton.id = "button";
	editButton.className = "editButton";
	title.innerText = "Title:" + object.title;
	skillBody.innerText = object.description;
	date.innerText = "Dated:" + object.date;
	skill.appendChild(checkbox);
	skill.appendChild(title);
	skill.appendChild(skillBody);
	skill.appendChild(date);
	skill.appendChild(editButton);
	skills.appendChild(skill);
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
	objectTime = object.objectTime;
	indexToEdit = objectArray.findIndex(
		(element) => element.objectTime === objectTime
	);
	title.focus();
	title.placeholder = "Edit title here";
	description.placeholder = "Edit description here";
	date.placeholder = "Edit date here";
	submitButton.value = "Save";
	submitButton.addEventListener("click", () => {
		alert("Are you sure you want to save the post?");
		object = {
			title: title.value,
			description: description.value,
			date: date.value,
		};
		if (
			object.title !== "" &&
			object.description !== "" &&
			object.date !== ""
		) {
			object.objectTime = new Date().getTime();
			objectArray[indexToEdit] = object;
			localStorage.setItem("array", JSON.stringify(objectArray));
			title.placeholder = "Write the title";
			description.placeholder = "Write the description";
			date.placeholder = "Give the date";
			submitButton.value = "Submit";
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
