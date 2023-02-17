<?php
// require_once('../../../wp-load.php');


// $leads_email = boffeer_explode_textarea(carbon_get_theme_option('leads_emails'));
$to = 'qurydigital@gmail.com';
// $to = 'boffeechane@gmail.com';
$email_from = 'boffeer@beefheads.ru';
// $email_from = 'info@urem.ru';



$ff = ($_FILES['file']);
if (!empty($_FILES['file']['tmp_name'])) {
	$filepath = $_FILES['file']['tmp_name'];
	$filename = $_FILES['file']['name'];
} else {
	$filepath = '';
	$filename = '';
}


foreach ($_POST as $key => $value) {
	if (($key != 'file') && ($value != "") && ($key != "project_name") && ($key != "form_subject")  && ($key != "sendMail")) {
		$customkey = $key;
		if ($key == 'user_name') {
			$customkey = "Имя:";
		} elseif ($key == 'user_tel') {
			$customkey = 'Телефон:';
		} elseif ($key == 'user_email') {
			$customkey = 'E-mail:';
		} elseif ($key == 'user_city') {
			$customkey = 'Город:';
		} elseif ($key == 'user_message') {
			$customkey = 'Сообщение:';
		} elseif ($key == 'form_name') {
			$customkey = 'Форма:';
		} elseif ($key == 'page') {
			$customkey = 'Страница:';
		} elseif ($key == 'user_company') {
			$customkey = 'Компания:';
		}


		$body .= "$customkey \r\n" . $value . "\r\n\r\n";
	}
}



$subject = 'Заявка с сайта';
$boundary = "--" . md5(uniqid(time())); // генерируем разделитель
$headers = "From: " . $email_from . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";
$multipart = "--" . $boundary . "\r\n";
$multipart .= "Content-type: text/plain; charset=\"utf-8\"\r\n";
$multipart .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";

$body = $body . "\r\n\r\n";


$multipart .= $body;
$file = '';
if (!empty($filepath)) {
	$fp = fopen($filepath, "r");
	if ($fp) {
		$content = fread($fp, filesize($filepath));
		fclose($fp);
		$file .= "--" . $boundary . "\r\n";
		$file .= "Content-Type: application/octet-stream\r\n";
		$file .= "Content-Transfer-Encoding: base64\r\n";
		$file .= "Content-Disposition: attachment; filename=\"" . $filename . "\"\r\n\r\n";
		$file .= chunk_split(base64_encode($content)) . "\r\n";
	}
}

$multipart .= $file . "--" . $boundary . "--\r\n";

$mail_log = array();
// foreach ($leads_email as $email) {
$mail_log[] = mail($to, $subject, $multipart, $headers);
// }

echo json_encode(array('status' => json_encode($mail_log), 'leads' => json_encode($leads_email)));

die;
