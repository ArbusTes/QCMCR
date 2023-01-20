var creer = document.getElementById('creer');

creer.addEventListener('click', function(){creerQuestionnaire();});

function creerQuestionnaire(){
	$.post('envoie_mail.php', {hid:hid,login:login,classe:classe,quest:questionnaire+'<script src="script_reponse.js"></script></body></html>',titre:titre}, 
		function(data){
			alert(data.cr);
			if (data.cr=='1') alert('Ton QCM a bien été envoyé au Webmaster.\nTu n\'as plus qu\'à attendre sa validation.');	
			else alert("Erreur d'envoi, peux-tu contacter le Webmaster pour lui signaler cette erreur ?");	 
	},"json");
} 