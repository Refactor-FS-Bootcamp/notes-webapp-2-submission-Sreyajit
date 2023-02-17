let skills = document.querySelector(".skills");
let submitButton = document.querySelector(".submitButton");
submitButton.addEventListener("click", createObject);
let title = document.getElementById("name");
let description = document.getElementById("Query");
let date = document.getElementById("Number");
let objectArray = [];
let object = {};
let noOfPosts = 0;
postSpace();
function createObject() {
	object = {
		title: title.value,
		description: description.value,
		date: date.value,
	};
	if (object.title !== "" && object.description !== "" && object.date !== "") {
		object.id = `${++noOfPosts}`;
		objectArray.push(object);
		localStorage.setItem("array", JSON.stringify(objectArray));
	} else {
		alert("please fill the full form");
	}
	postSpace();
}
function postSpace() {
	let variable = JSON.parse(localStorage.getItem("array"));
	if (variable == null || variable.length == 0) {
		noObjectPresent();
		noOfPosts = 0;
	} else {
		skills.innerHTML = "";
		variable.forEach((element) => {
			cardCreator(element);
		});
	}
}
function cardCreator(object) {
	let skill = document.createElement("div");
	let title = document.createElement("h2");
	let skillBody = document.createElement("div");
	let date = document.createElement("p");
	let deleteButton = document.createElement("input");
	let editButton = document.createElement("input");
	skill.className = "skill";
	skillBody.className = "skillBody";
	deleteButton.type = "button";
	deleteButton.value = "Delete";
	deleteButton.id = "button";
	deleteButton.className = "deleteButton";
	editButton.type = "button";
	editButton.value = "Edit";
	editButton.id = "button";
	editButton.className = "editButton";
	title.innerText = "Title:" + object.title;
	skillBody.innerText = object.description;
	date.innerText = "Dated:" + object.date;
	skill.appendChild(title);
	skill.appendChild(skillBody);
	skill.appendChild(date);
	skill.appendChild(deleteButton);
	skill.appendChild(editButton);
	skills.appendChild(skill);
	deleteButton.addEventListener("click", () => deleteObject(object));
	editButton.addEventListener("click", () => editObject(object));
}
function noObjectPresent() {
	skills.innerHTML = "";
	let h2 = document.createElement("h2");
	h2.innerText =
		"No posts found to display- fill the above form and click on the submit button to add posts to display here";
	skills.appendChild(h2);
}
function deleteObject(object) {
	alert("are you sure you want to delete?");
	noOfPosts--;
	let variable = JSON.parse(localStorage.getItem("array"));
	indexToDelete = variable.findIndex((element) => element.id === object.id);
	variable.splice(indexToDelete, 1);
	objectArray = [...variable];
	localStorage.setItem("array", JSON.stringify(objectArray));
	postSpace();
}
function editObject(object) {
	alert("Are you sure you want to edit the post?");
	let variable = JSON.parse(localStorage.getItem("array"));
	let id = object.id;
	indexToEdit = variable.findIndex((element) => element.id === id);
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
			id: id,
		};
		if (
			object.title !== "" &&
			object.description !== "" &&
			object.date !== ""
		) {
			variable[indexToEdit] = object;
			localStorage.setItem("array", JSON.stringify(variable));
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
