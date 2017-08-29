<?php

$filename = '../source/JPG2.jpg';
// header("Content-type: image/JPEG",true);
// echo "透過fread方式讀取圖片檔，再轉base64：";

$image = fread(fopen($filename,r), filesize($filename));
$base64 = 'data:image/jpb=g;base64,' . base64_encode($image);
// echo "<img src='".$base64."' />";
// echo $base64;
// fclose($image);


// echo "<br/>";
// echo "<br/>";

// echo "透過PHP API方式讀取圖片檔,再轉base64:";

$percent = 0.5;

// Get new sizes
list($width, $height) = getimagesize($filename);
$newwidth = $width * $percent;
$newheight = $height * $percent;

// Load
$thumb = imagecreatetruecolor($newwidth, $newheight);
$source = imagecreatefromjpeg($filename);

// Resize
imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

// Output
// imagejpeg($thumb);
// echo $thumb;
echo microtime();
echo "<br>";
ob_start(); // Let's start output buffering.
    imagejpeg($thumb); //This will normally output the image, but because of ob_start(), it won't.
    $thumb = ob_get_contents(); //Instead, output above is saved to $contents
ob_end_clean(); //End the output buffer.
echo microtime();

//
$base64 = 'data:image/jpb=g;base64,' . base64_encode($image);
$base642 = 'data:image/jpb=g;base64,' . base64_encode($thumb);
// echo "<img src='".$base64."' />";
echo "<img src='".$base642."' />";
echo strlen($base64);
echo "<br>";
echo strlen($base642);
?>