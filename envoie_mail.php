<?php
require_once "../../_mail.php";

if (!isset($_POST['login']) or !isset($_POST['classe']) or !isset($_POST['titre']) or !isset($_POST['hid'])) {
  envoyer_message('PIRATAGE ENVOIE_MAIL.PHP', ID_WEBMASTER, ID_WEBMASTER, 1);
}

include ('../../init.php');

$login = $_POST['login'];
$classe = $_POST['classe'];
$titre=$_POST['titre'];
$message_txt = "Bonjour !\n\nJe suis ".$login.' de la classe '.$classe." et j'ai créé un questionnaire \"".$titre."\" ci-joint !";
$message_html = "<b>Bonjour !</b><br/><br/>Je suis ".$login.' de la classe '.$classe." et j'ai créé un questionnaire <b>\"".$titre."\"</b> ci-joint !";

$nom_fichier=$_POST['hid'].'_'.date("Y-m-d_H-i-s");
$fichier_avec_path='qcm/'.$nom_fichier.'.html';
$file=fopen($fichier_avec_path,"a+");
fprintf($file,"\n%s\n",$_POST['quest']);
fclose($file);

envoyer_message('Bonjour, je t\'ai envoyé un questionnaire "'.$titre.'"', $_POST['hid'], ID_WEBMASTER, 1);

$d=array();
$d=envoiPHPmail(array(
	'emetteur' => "ArbusTes",
  'tab_dest' => array('contact@arbustes.net'=>'QCMCR'),
  'objet' => 'Créateur de QCM', 
  'message_html' => $message_html, 
  'message_txt' => $message_txt,
  'signature_auto' => true,
  'fichier_avec_path' => $fichier_avec_path,
  'nom_piece_jointe' => $nom_fichier.'.txt'
  ));

echo json_encode($d); 
?>
