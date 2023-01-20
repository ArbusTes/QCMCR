<?php
$dir_rel="../../";
$dir_cdi="../";
$fichier="index.php";
include($dir_rel.'_init.php');
$sans_head_outil_header=1;include ($dir_rel."_outil_header.php"); 
if (isset($_SESSION['outil_retour'])) $retour=$_SESSION['outil_retour']; else if (isset($_SESSION['retour_page'])) $retour=$_SESSION['retour_page']; else $retour='outil.php';  
$_SESSION['outil_id'] = trouve_outil_id($_SERVER["PHP_SELF"]);
$outil=get_outil($_SESSION['outil_id']);?>
<style><?php include('qcm.css');?></style>
</head>
<body>
	<?php affichage_titre_et_liens($outil['outil_nom'],$retour,"",0,NULL,NULL,$dir_rel);?>
	<div id="liens">
			<button><input id="choisir" style="display: none;" type="file" accept=".html"><label for="choisir" style="width: 100%;margin: 2px;">Ouvrir</label></button>
			
			<button id="enregistrer">Enregistrer</button>
	</div>
	<input type="text" id="titreQuestionnaire" placeholder="Titre du questionnaire" autofocus>
	<div id="allQuestions">
		<img id="ajouterQuestion" src="add.png">
	</div>
	<button id="tester">Tester dans un nouvel onglet</button>
	<div style="margin-top:20px;"><p>Si tu veux le proposer pour le CDI, teste le puis clique sur le bouton "Envoyer au Webmaster".</p>
</div>
	<div id="creerQuestionPanel" style="display: none">
		<div id="newQuestion">
			<div style="display: flex;flex-direction: column;width: 80%;align-items: center;">
				<input type="text" id="titreQuestion" placeholder="Question">
				<div style="display:flex;">
					<input type="checkbox" id="plusieursReponses">
					<label style="padding-left:10px;margin-top:10px;" for="plusieursReponses">Plusieurs bonnes réponses</label>
				</div>
			</div>
			<div id="reponsesContainer">
				<img id="ajouterReponse" src="add.png">
			</div>
			<div style="display: flex;justify-content: space-around;width: 100%">
				<button id="annulerQuestion">Annuler</button>
				<button id="creerQuestion">Créer</button>
			</div>
		</div>
	</div>
	<div id="modifierQuestionPanel" style="display: none">
		<div id="thisQuestion">
			<div style="display: flex;flex-direction: column;width: 80%;align-items: center;">
				<input type="text" id="thisTitreQuestion" placeholder="Titre, question...">
				<label style="width: 100%;display: flex;justify-content: center" for="thisPlusieursReponses"><input type="checkbox" id="thisPlusieursReponses">Plusieurs bonnes réponses</label>
			</div>
			<div id="thisReponsesContainer">
				<img id="thisAjouterReponse" src="add.png">
			</div>
			<div style="display: flex;justify-content: space-around;width: 60%">
				<button id="thisAnnulerQuestion">Annuler</button>
				<button id="enregistrerQuestion">Valider</button>
			</div>
		</div>
	</div>
	<div id="receptionneur" style="display:none;">
	</div>
<script type="text/javascript">
	var hid = '<?= isset($globales['humain']['humain_id']) ? $globales['humain']['humain_id'] : '0' ?>';
	var login = '<?= isset($globales['humain']['humain_login']) ? $globales['humain']['humain_login'] : 'Inconnu' ?>';
	var classe = '<?= isset($globales['classe_memo']['classe_nom']) ? $globales['classe_memo']['classe_nom'] : 'Inconnue' ?>';
</script>
<script src="script.js"></script><?php
if (isset($_GET['qcm'])) : 
	$txt=file_get_contents($_GET['qcm']);?>
	<script>chargerFichier('<?= addslashes($txt) ?>')</script>
	<?php 
endif;
include ($dir_rel."_outil_footer.php"); ?> 
