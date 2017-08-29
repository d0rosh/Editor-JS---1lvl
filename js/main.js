var text_field = document.getElementById('text_field'); 
var fontS = document.querySelectorAll(".fontS");
var fontSel = document.getElementById('fontF');
var palette_col = document.getElementById("palette_color");
var tabl_check = document.getElementById('tabl_check');
var list_check = document.getElementById('list_check');
var body = document.body;

function getQ(a){
	return document.querySelector(a);
};


getQ(".edit").onclick = function() {
	getQ(".editor_text").style.display = "block";
	getQ(".editor_styles").style.display = "none";
	text_field.value = getQ(".screen").innerHTML;
}

getQ(".save").onclick = function() {
	getQ(".screen").innerHTML = text_field.value;
	text_field.value = "";
}

getQ(".styles").onclick = function() {
	getQ(".editor_styles").style.display = "block";
	getQ(".editor_text").style.display = "none";
}

// міняємо фонт сайз
for (var i = 0; i < fontS.length; i++) {
	fontS[i].onclick = function() {
		getQ(".screen").style.fontSize = this.value;			
	}
}

// міняємо тип шрифта
fontSel.onchange = function() {
	for (var i = 0; i < fontSel.children.length; i++) {
		if (fontSel.children[i].selected) {
			getQ(".screen").style.fontFamily = this.value;
		}
	}
}


// визначаємо як з кнопок буде активна:
// та шо належить до кольору тексту чи беграунду
body.onclick = function(event) {
	var target = event.target;
	if (target.classList.contains("scrColor")) {
		palette_col.style.display = "block";
		palette_col.classList.add("mainColor");
		palette_col.classList.remove("mainBack");
	}

	else if (target.classList.contains("scrBack")) {
		palette_col.style.display = "block";
		palette_col.classList.add("mainBack");
		palette_col.classList.remove("mainColor");
	}
	else {
		palette_col.style.display = "none";
	}

}

palette_col.onclick = function(event) {
	var target = event.target;
	if (target.parentNode.classList.contains("mainColor")) {
		getQ(".screen").style.color = target.style.background;
		this.style.display = "none";
	}else {
		getQ(".screen").style.background = target.style.background;
		this.style.display = "none";
	}
}


// курсивний і жирний тексту
getQ(".boldT").onclick = function() {
	if (this.checked) {
		getQ(".screen").style.fontWeight = "bold";
	}else {
		getQ(".screen").style.fontWeight = "normal";
	}
}

getQ(".italicT").onclick = function() {
	if (this.checked) {
		getQ(".screen").style.fontStyle = "italic";
	}else {
		getQ(".screen").style.fontStyle = "normal";
	}
}

// відкриваємо вікно з таблицею і списком
getQ(".add_text").onclick = function() {
	getQ(".screen").style.display = "none";
	getQ(".editor").style.display = "none";
	getQ(".navigation").style.display = "none";
	getQ(".wrap_list_table").style.display = "block";

}

// робимо активним блок списку
list_check.onclick = function() {
	if (this.checked) {
		getQ(".wrap_list").style.display = "block";
		getQ(".wrap_table").style.display = "none";
		tabl_check.checked = false;
	}
}
// робимо активним блок таблиці
tabl_check.onclick = function() {
	if (this.checked) {
		getQ(".wrap_list").style.display = "none";
		getQ(".wrap_table").style.display = "block";
		list_check.checked = false;
	}
}

// створення таблиці
function createTable() {
	var countTr = getQ(".countTr").value;
	var countTd = getQ(".countTd").value;
	var widthTd = getQ(".widthTd").value;
	var heightTd = getQ(".heightTd").value;
	var borderW = getQ(".borderW").value;
	var borderType = document.getElementById('borderT').value;
	var borderColor = document.getElementById('borderC').value;

	var table = document.createElement("table");
	table.id = "tab";
	table.style.borderWidth = borderW + "px";
	table.style.borderColor = borderColor;
	table.style.borderStyle = borderType;
	var div = document.createElement("div");
	body.appendChild(div);
	div.style.display = "none";
	div.appendChild(table);


	for (var i = 0; i < countTr; i++) {
		var tr = document.createElement("tr");
		table.appendChild(tr);	
		for (var j = 0; j < countTd; j++) {
			var td = document.createElement("td");
			td.style.width = widthTd + "px";
			td.style.height = heightTd + "px";
			td.innerHTML= "hello$";
			tr.appendChild(td);
		}
	
	}

	text_field.value = getQ(".screen").innerHTML + div.innerHTML;
	getQ(".wrap_list_table").style.display = "none";
	getQ(".screen").style.display = "block";
	getQ(".editor").style.display = "block";
	getQ(".navigation").style.display = "block";

}

getQ(".table_btn").onclick = function() {
	createTable();
}


// створення списку
function createList() {
	var countList = getQ(".countList").value;
	var mark = document.getElementById('mark').value;
	var ul = document.createElement("ul");
	ul.type = mark;

	ul.id = "ulList";

	var div = document.createElement("div");
	body.appendChild(div);
	div.style.display = "none";
	div.appendChild(ul);


	for (var i = 0; i < countList; i++) {
		var li = document.createElement("li");
		li.innerHTML = "Текст";
		ul.appendChild(li);
	}


	text_field.value = getQ(".screen").innerHTML + div.innerHTML;
	getQ(".wrap_list_table").style.display = "none";
	getQ(".screen").style.display = "block";
	getQ(".editor").style.display = "block";
	getQ(".navigation").style.display = "block";

}

getQ(".list_btn").onclick = function() {
	createList();
}
