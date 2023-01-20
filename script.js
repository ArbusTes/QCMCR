//window.addEventListener('load', debut);

//function debut(){
	class Question{
		constructor(titre){
			this.titre = titre.replace(" ?", "&nbsp;?");
			this.PRchecked = plusieursReponses.checked;
			this.id = arrayQuestions.length+1;
			this.arrayReponses = arrayReponses;
			this.butDel = null;
			this.question = null;
			this.ouverture = false;
			this.container = null;
		}

		update(){
			this.titre = thisTitreQuestion.value.replace(" ?", "&nbsp;?");
			this.PRchecked = thisPlusieursReponses.checked;
			this.arrayReponses = arrayReponses;
		}

		build(){
			let container = document.createElement('div');
			container.style.margin = '0 2%';
			let divBut = document.createElement('div');
			divBut.style.display = 'flex';
			divBut.style.justifyContent = 'space-around';
			let butMod = document.createElement('img');
			butMod.setAttribute('class', 'modifier_enlever_question');
			butMod.src = 'edit.png';
			butMod.setAttribute("id", this.id);		
			let question=this;
			butMod.addEventListener('click', function(evt){
				let q = question;
				modifierQuestionPanel.style.display = 'flex';
				modifierQuestionPanel.style.height = Math.max(document.body.offsetHeight, window.innerHeight)+"px";
				thisQuestion.style.top = (window.scrollY+window.innerHeight/2-thisQuestion.offsetHeight)+"px";
				let nbRep=q.arrayReponses.length;
				for(let i = 0 ; i < nbRep ; i++){
					let reponse = new Reponse();
					reponse.input = q.arrayReponses[i].input;
					reponse.checkbox = q.arrayReponses[i].checkbox;
					reponse.checkbox.checked = q.arrayReponses[i].checkbox.checked;
					reponse.delBut = q.arrayReponses[i].delBut;
					thisReponsesContainer.insertBefore(reponse.build(), thisAjouterReponse);
					arrayReponses.push(reponse);
				}
				thisTitreQuestion.value = q.titre.replace("&nbsp;?", " ?");
				thisPlusieursReponses.checked = q.PRchecked;
				idQMode = arrayQuestions.indexOf(question);
			});

			divBut.appendChild(butMod);
			let butDel = document.createElement('img');
			butDel.setAttribute('class', 'modifier_enlever_question');
			butDel.src = 'del.png';
			butDel.addEventListener('click', function(evt){
				evt.target.parentElement.parentElement.parentElement.removeChild(evt.target.parentElement.parentElement);
				let index = arrayQuestions.indexOf(evt.target.parentElement.parentElement.objet);
				arrayQuestions.splice(index, 1);
				for(let i = index ; i < arrayQuestions.length ; i++){
					let question = arrayQuestions[i];
					question.id -= 1;
					for(let j = 0 ; j < question.arrayReponses.length ; j++)
						question.arrayReponses[j].input.setAttribute("id", 'q'+question.id+'_'+(j+1));
				}
			});
			divBut.appendChild(butDel);
			this.butDel = butDel;
			if(!this.ouverture){
				let question = document.createElement('div');
				question.setAttribute('class', 'question');
				let question_titre = document.createElement('div');
				question_titre.setAttribute('class', 'question_titre');
				question_titre.innerHTML = this.titre;
				let question_reponses = document.createElement('div');
				question_reponses.setAttribute('class', 'question_reponses');
				let type = 'radio';
				if(plusieursReponses.checked||thisPlusieursReponses.checked) type = 'checkbox';
				for(let i = 0 ; i < this.arrayReponses.length ; i++){
					let div = document.createElement('div');
					div.style = 'display: flex;align-items: center;';
					let input = document.createElement('input');
					let id = 'q'+this.id+'_'+(i+1);
					if(this.arrayReponses[i].checkbox.checked){
						id += 'X';
						input.setAttribute('checked', true);
					}
					input.setAttribute('type', type);
					input.setAttribute('name', 'q'+this.id);
					input.setAttribute('id', id);
					input.setAttribute('disabled', true);
					let label = document.createElement('label');
					label.setAttribute('for', id);
					this.arrayReponses[i].id = id;
					label.textContent = this.arrayReponses[i].input.value;
					this.arrayReponses[i].finalInput = input;
					div.appendChild(input);
					div.appendChild(label);
					question_reponses.appendChild(div);
				}
				question.appendChild(question_titre);
				if(plusieursReponses.checked||thisPlusieursReponses.checked){
					let info = document.createElement('div');
					info.textContent = 'Plusieurs réponses';
					info.style.fontSize = '14px';
					info.style.textAlign = 'center';
					info.style.marginTop = '4px';
					question.appendChild(info);
				}
				question.appendChild(question_reponses);
				this.question = question;
			}
			container.appendChild(divBut);
			container.appendChild(this.question);
			container.objet = this;
			this.container = container;
			this.ouverture = false;
			return container;
		}
	}

	class Reponse{
		constructor(){
			this.input = null;
			this.checkbox = null;
			this.delBut = null;
			this.container = null;
		}
		build(){
			let container = document.createElement('div');
			container.style.display = 'flex';
			container.style.justifyContent = 'space-around';
			container.style.alignItems = 'center';
			container.style.margin = '5px 0';
			container.style.width = '100%';
			if(this.input == null){
				let input = this.creerInput();
				this.input = input;
			}
			if(this.checkbox == null){
				let checkbox = this.creerCheckbox();
				this.checkbox = checkbox;
			}
			if(this.delBut == null){
				let del = document.createElement('img');
				del.src = 'del.png';
				del.style.width = '5%';
				del.style.maxWidth = '28px';
				del.style.minWidth = '16px';
				del.style.cursor = 'pointer';
				del.addEventListener('click', function(evt){
					evt.target.parentElement.parentElement.removeChild(evt.target.parentElement);
					arrayReponses.splice(arrayReponses.indexOf(evt.target.parentElement.objet), 1);
				});
				this.delBut = del;
			}
			let div_reponse = document.createElement('div');
			div_reponse.style.width='80%';
			div_reponse.appendChild(this.input);
			div_reponse.appendChild(this.checkbox);
			container.appendChild(div_reponse);
			container.appendChild(this.delBut);
			container.objet = this;
			this.container = container;
			return container;
		}
		creerInput(){
			let input = document.createElement('input');
			input.style.width = '70%';
			return input;
		}
		creerCheckbox(){
			let checkbox = document.createElement('input');
			checkbox.setAttribute('type', 'checkbox');
			checkbox.style.outline = 'none';
			checkbox.style.marginLeft='20px';
			checkbox.style.transform='scale(2)';
			checkbox.style.verticalAlign='bottom';
			checkbox.style.marginBottom='10px';
			return checkbox;
		}
	}
	// Élements
	// Panel creerQuestionPanel
	var creerQuestionPanel = document.getElementById('creerQuestionPanel');
	var plusieursReponses = document.getElementById('plusieursReponses');
	var creerQuestion = document.getElementById('creerQuestion');
	var annulerQuestion = document.getElementById('annulerQuestion');
	var ajouterReponse = document.getElementById('ajouterReponse');
	var newQuestion = document.getElementById('newQuestion');
	var titreQuestion = document.getElementById('titreQuestion');
	var reponsesContainer = document.getElementById('reponsesContainer');
	// modifierQuestionPanel
	var modifierQuestionPanel = document.getElementById('modifierQuestionPanel');
	var thisPlusieursReponses = document.getElementById('thisPlusieursReponses');
	var enregistrerQuestion = document.getElementById('enregistrerQuestion');
	var thisAnnulerQuestion = document.getElementById('thisAnnulerQuestion');
	var thisAjouterReponse = document.getElementById('thisAjouterReponse');
	var thisQuestion = document.getElementById('thisQuestion');
	var thisTitreQuestion = document.getElementById('thisTitreQuestion');
	var thisReponsesContainer = document.getElementById('thisReponsesContainer');
	// Autres élements
	var allQuestions = document.getElementById('allQuestions');
	var ajouter = document.getElementById('ajouterQuestion');
	var tester = document.getElementById('tester');
	var choisir = document.getElementById('choisir');
	var enregistrer = document.getElementById('enregistrer');
	// Variables
	var arrayQuestions = [], arrayReponses = [], idQMode, questionnaire = '', test_questionnaire='', titreQuestionnaire = '', description = '', fileTxt = '';

	tester.addEventListener('click', function(){
		let verif = verifierQuestionnaire();
		if(verif == ''){
			testerQuestionnaire();
			//creer.removeAttribute('disabled');
		}
		else alert(verif);
	});
	enregistrer.addEventListener('click', function(){
		saveFile();
	});
	choisir.addEventListener('change', function(){
		var reader = new FileReader();
	    reader.onload = function(){
			var request, source;
			source = reader.result;
			if(window.XMLHttpRequest){ // Firefox
				request = new XMLHttpRequest();
			}
			else if(window.ActiveXObject){ // IE
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			else{
				return null; // Non supporte
			}	
			request.open('GET', source, false); // Synchro
			request.send(null);
			fileTxt = request.responseText;
			chargerFichier();
	    };
	    reader.readAsDataURL(choisir.files[0]);
	});
	ajouter.addEventListener('click', function(){
		creerQuestionPanel.style.display = 'flex';
		creerQuestionPanel.style.height = Math.max(document.body.offsetHeight, window.innerHeight)+"px";
		newQuestion.style.top = (window.scrollY+window.innerHeight/2-newQuestion.offsetHeight)+"px";
		titreQuestion.focus();
	});
	creerQuestion.addEventListener('click', function(){
		let verif = verifierQuestion('creer');
		if(verif == ''){
			let question = new Question(titreQuestion.value);
			allQuestions.insertBefore(question.build(), ajouterQuestion);
			arrayQuestions.push(question);
			creerQuestionPanel.style.display = 'none';
			resetQuestionPanel('creer');
		}
		else alert(verif);
	});
	enregistrerQuestion.addEventListener('click', function(){
		let verif = verifierQuestion('modifier');
		if(verif == ''){
			let question = arrayQuestions[idQMode];
			question.update();
			allQuestions.insertBefore(question.build(), allQuestions.childNodes[idQMode+2]);
			allQuestions.removeChild(allQuestions.childNodes[idQMode+1]);
			modifierQuestionPanel.style.display = 'none';
			resetQuestionPanel('modifier');
		}
		else alert(verif);
	});
	annulerQuestion.addEventListener('click', function(){
		creerQuestionPanel.style.display = 'none';
		resetQuestionPanel('creer');
	});
	thisAnnulerQuestion.addEventListener('click', function(){
		modifierQuestionPanel.style.display = 'none';
		resetQuestionPanel('modifier');
	});
	ajouterReponse.addEventListener('click', function(){
		let reponse = new Reponse();
		reponsesContainer.insertBefore(reponse.build(), ajouterReponse);
		arrayReponses.push(reponse);
		reponsesContainer.getElementsByTagName('div')[2*(arrayReponses.length-1)].getElementsByTagName('input')[0].focus();
	});
	thisAjouterReponse.addEventListener('click', function(){
		let reponse = new Reponse();
		thisReponsesContainer.insertBefore(reponse.build(), thisAjouterReponse);
		arrayReponses.push(reponse);
		thisReponsesContainer.getElementsByTagName('div')[2*(arrayReponses.length-1)].getElementsByTagName('input')[0].focus();
	});

	// ---------- RACCOURCIS --------------
	// Entrer -> ajoute une question ou une réponse
	window.addEventListener('keypress', checkkeypress);
	function checkkeypress(event){
		var x = event.which || event.keyCode;
		if(x == 13){
			if(creerQuestionPanel.style.display == 'none' && modifierQuestionPanel.style.display == 'none')
				ajouter.click(); // ajoute une question
			else if(creerQuestionPanel.style.display != 'none' && modifierQuestionPanel.style.display == 'none')
				ajouterReponse.click(); // ajoute une réponse
			else if(modifierQuestionPanel.style.display != 'none')
				thisAjouterReponse.click(); // ajoute une réponse
		}
	}

	function resetQuestionPanel(panel){
		if(panel == 'creer'){
			for(let i = 0 ; i < arrayReponses.length ; i++)
				reponsesContainer.removeChild(arrayReponses[i].container);
			arrayReponses = [];
			titreQuestion.value = '';
			plusieursReponses.checked = false;
		}
		else if(panel == 'modifier'){
			for(let i = 0 ; i < arrayReponses.length ; i++)
				thisReponsesContainer.removeChild(arrayReponses[i].container);
			arrayReponses = [];
			thisTitreQuestion.value = '';
			thisPlusieursReponses.checked = false;
		}
	}

	function verifierQuestion(panel){
		let verif = '';
		let titre = titreQuestion.value;
		let PRchecked = plusieursReponses.checked;
		if(panel == 'modifier'){
			titre = thisTitreQuestion.value;
			PRchecked = thisPlusieursReponses.checked;
		}
		if(titre == '') verif = 'Il faut insérer une question !';
		if(arrayReponses.length < 2) verif += '\nIl faut au minimum 2 réponses !';
		let nbReponses = 0, reponseVide = false;
		for(let i = 0 ; i < arrayReponses.length ; i++){
			if(!reponseVide && arrayReponses[i].input.value == ''){
				verif += '\nIl ne faut pas de réponse vide !';
				reponseVide = true;
			}
			if(arrayReponses[i].checkbox.checked) nbReponses++;
		}
		if(PRchecked && nbReponses == arrayReponses.length) verif += '\nIl faut au moins 1 mauvaise réponse !';
		else if(!PRchecked && nbReponses > 1) verif += '\nUne seule réponse possible ! (Ou cochez la case \'Plusieurs réponses possible\')';
		else if(PRchecked && nbReponses < 2) verif += '\nIl faut au moins 2 bonnes réponses !';
		else if(!PRchecked && nbReponses == 0) verif += '\nIl faut 1 bonne réponse !';
		return verif;
	}

	function verifierQuestionnaire(){
		var verif = '';
		titreQuestionnaire = document.getElementById('titreQuestionnaire').value;
		if(arrayQuestions.length < 5) verif = 'Il faut au moins 5 questions !';
		if(titreQuestionnaire == '') verif += '\nIl faut un titre à ton questionnaire !';
		return verif;
	}

	function saveFile(){
		if(document.getElementById('titreQuestionnaire').value == ''){
			alert('Tu dois ajouter un titre.');
			return;
		}
		updateQuestionnaire();

		var input = document.getElementById("input");
		var a = document.createElement("a");
	    document.body.appendChild(a);
	    a.style = "display: none";

	    var json = JSON.stringify(questionnaire),
	        blob = new Blob([questionnaire], {type: "text/html;charset=utf-8"}),
	        url = window.URL.createObjectURL(blob);
	    a.href = url;
		a.download = titreQuestionnaire;
	    a.click();
	    window.URL.revokeObjectURL(url);
	}

	function stripslashes (str) {
	  return (str + '')
	    .replace(/\\(.?)/g, function (s, n1) {
	      switch (n1) {
	        case '\\':
	          return '\\'
	        case '0':
	          return '\u0000'
	        case '':
	          return ''
	        default:
	          return n1
	      }
	    })
	}

	function addslashes (str) {
	  return (str + '')
	    .replace(/[\\"']/g, '\\$&')
	    .replace(/\u0000/g, '\\0')
	}

	function chargerFichier(txt=''){
		cleanBoard();
		var recep = document.getElementById('receptionneur');
		if (txt=='') recep.innerHTML = stripslashes(fileTxt);
		else recep.innerHTML = stripslashes(txt);
		var titre = document.getElementById('titreQuestionnaire2');
		var desc = document.getElementById('description2');
		if(titre == null){
			alert('Fichier invalide.');
			return;
		}

		var allQuestions2 = document.getElementById('allQuestions2');
		var arrayDivQuestions = allQuestions2.getElementsByClassName('question');
		document.getElementById('titreQuestionnaire').value = titre.innerHTML;
		document.getElementById('description').value = desc.innerHTML;
		let fin = arrayDivQuestions.length;
		for(let i = 0 ; i < fin ; i++){
			let quest = new Question(arrayDivQuestions[0].getElementsByClassName('question_titre')[0].innerHTML);
			let arrayDivReponses = arrayDivQuestions[0].getElementsByClassName('question_reponses')[0].getElementsByTagName('div');

			quest.PRchecked = false;
			if(arrayDivReponses[0].getElementsByTagName('input')[0].getAttribute('type') == 'checkbox')
				quest.PRchecked = true;
			quest.question = arrayDivQuestions[0];
			quest.ouverture = true;
			quest.arrayReponses = [];
			
			for(let j = 0 ; j < arrayDivReponses.length ; j++){
				let reponse = new Reponse();

				let inp = reponse.creerInput();
				inp.value = arrayDivReponses[j].getElementsByTagName('label')[0].innerHTML;

				let cb = reponse.creerCheckbox();
				let c = arrayDivReponses[j].getElementsByTagName('input')[0];
				if(c.getAttribute('id').substring(c.getAttribute('id').length-1) == 'X') cb.checked = true;

				reponse.input = inp;
				reponse.checkbox = cb;

				quest.arrayReponses.push(reponse);
			}

			arrayQuestions.push(quest);
			allQuestions.insertBefore(quest.build(), ajouterQuestion);
		}
	}

	function cleanBoard(){
		document.getElementById('titreQuestionnaire').value = '';
		document.getElementById('description').value = '';
		let fin = arrayQuestions.length;
		for(let i = 0 ; i < fin ; i++)
			arrayQuestions[0].butDel.click();
		arrayQuestions = [];
		arrayReponses = [];
	}

function updateQuestionnaire(){
	titreQuestionnaire = document.getElementById('titreQuestionnaire').value;
	description = document.getElementById('description').value;
	questionnaire_debut =
		'<html><head>'+
			'<meta charset="UTF-8">'+
			'<title>QCM</title>'+
			'<link rel="stylesheet" href="qcm.css">'+
		'</head>';

	test_questionnaire=questionnaire_debut;
	questionnaire=questionnaire_debut;

	test_questionnaire+='<div style="text-align:center;font-size:32px;color:#d94b05;">Vérifie l\'orthographe et les bonnes réponses !</div>';

	questionnaire_fin='<div style="display:flex;flex-direction:column;justify-content:center;">'+
	'<div id="titreQuestionnaire2">'+titreQuestionnaire+'</div>'+
	'<div id="description2">'+description+'</div>';
	if (hid!=0) questionnaire_fin+='<div id="login_et_classe">'+'<a href="https://arbustes.net/profil.php?hid='+hid+'" target="_top">'+login+'</a> '+classe+'</div>';
	questionnaire_fin+='</div><div id="allQuestions2">';

	for(let i = 0 ; i < arrayQuestions.length ; i++){
		questionnaire_fin += '<div style="margin: 2% 2%;"><div class="numero">'+(i+1)+'°)</div><div class="question">';
		questionnaire_fin += arrayQuestions[i].question.innerHTML;
		questionnaire_fin += '</div></div>';
	}

	questionnaire_fin +='</div>'+'<div style="display: flex;justify-content: space-around;"><button id="valider">Valider</button>';
	questionnaire+=questionnaire_fin+'</div>';	
	test_questionnaire+=questionnaire_fin+'<button id="creer" style="display:none">Envoyer au Webmaster</button></div>';
	test_questionnaire+='<script>var hid='+hid+';var login=\''+login+'\';var classe=\''+addslashes(classe)+'\';var titre=\''+addslashes(titreQuestionnaire)+'\';</script>';
	test_questionnaire+='<script src="script_test_et_envoi.js"></script>';
	test_questionnaire+='<script type="text/javascript" src="../../jquery/jquery.min.js"></script>';
	test_questionnaire+='<script>var questionnaire=\''+addslashes(questionnaire)+'\';</script>';
}

function testerQuestionnaire(){
	updateQuestionnaire();
	var win = window.open("", '_blank');
	win.document.write(test_questionnaire+'<script src="script_reponse.js"></script></body></html>');
	win.document.close();
}

//}
