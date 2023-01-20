	var arrayQuestions = document.getElementsByClassName('question');
	for(let i = 0 ; i < arrayQuestions.length ; i++){
		arrayQuestions[i].points = 0;
		arrayQuestions[i].arrayReponses = arrayQuestions[i].getElementsByTagName('input');
		for(let j = 0 ; j < arrayQuestions[i].arrayReponses.length ; j++) {
			arrayQuestions[i].arrayReponses[j].removeAttribute("disabled");
			arrayQuestions[i].arrayReponses[j].removeAttribute("checked");
		}
	}
	var valider = document.getElementById('valider');
	valider.addEventListener('click', verifierValidation);
	function verifierValidation(){
		var repondu = false;
		for(let i = 0 ; i < arrayQuestions.length ; i++){
			let j = 0;
			while(!repondu && j < arrayQuestions[i].arrayReponses.length){
				if(arrayQuestions[i].arrayReponses[j].checked) repondu = true;
				j++;
			}
			if(!repondu) break;
		}
		if(!repondu) alert("Tu n\'as pas répondu à toutes les questions.");
		else corriger();
	}
	var pointsMax = calculerPointsMax();
	function corriger(){
		var totalPoints = 0;
		for(let i = 0 ; i < arrayQuestions.length ; i++) arrayQuestions[i].style.color = "#2d266f";
		for(let i = 0 ; i < arrayQuestions.length ; i++){
			arrayQuestions[i].points = 0;
			for(let j = 0 ; j < arrayQuestions[i].arrayReponses.length ; j++){
				let reponse = arrayQuestions[i].arrayReponses[j];
				if(reponse.checked && reponse.getAttribute('id').substring(reponse.getAttribute('id').length-1) == 'X')
					arrayQuestions[i].points += 1;
				else if(reponse.getAttribute("type") == "checkbox" && reponse.checked && reponse.getAttribute('id').substring(reponse.getAttribute('id').length-1) != 'X'){
					arrayQuestions[i].points -= 0.15;
					arrayQuestions[i].style.color = "#d94b05";
				}
				else if(!reponse.checked && reponse.getAttribute('id').substring(reponse.getAttribute('id').length-1) == 'X'){
					arrayQuestions[i].points += 0;
					arrayQuestions[i].style.color = "#d94b05";
				}
			}
			totalPoints += arrayQuestions[i].points;
		}
		alert('Score : '+totalPoints+'/'+pointsMax);
		if (totalPoints==pointsMax) document.getElementById('creer').style.display='inline';
	}
	function calculerPointsMax(){
		let pM = 0;
		for(let i = 0 ; i < arrayQuestions.length ; i++){
			for(let j = 0 ; j < arrayQuestions[i].arrayReponses.length ; j++){
				let reponse = arrayQuestions[i].arrayReponses[j];
				if(reponse.getAttribute('id').substring(reponse.getAttribute('id').length-1) == 'X') pM += 1;
			}
		}
		return pM;
	}
