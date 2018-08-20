<?php
// // echo "<img src='./src/imgs/IMG_20180515_195118.jpg'>";

// $fileName = __DIR__."\\src\\imgs\\IMG_20180515_195118.jpg";
// // echo $fileName."\n";
// // $exifArr = exif_read_data($fileName);
// // echo "<pre>";
// // var_dump($exifArr);
// echo "<img src='./src/imgs/IMG_20180515_195118.jpg'>";
// echo "<br>";
// $origimg = imagecreatefromjpeg($fileName);
// $imagesize = getimagesize($fileName);

// list($width, $height) = $imagesize;
// $image = "data:".$imagesize["mime"].";base64,";
// // Load
// $thumb = imagecreatetruecolor($width, $height);
// $source = imagecreatefromjpeg($fileName);
// imagecopyresized($thumb, $source, 0, 0, 0, 0, $width, $height, $width, $height);

// 	$exif = exif_read_data($fileName);
// 	echo $exif["Orientation"];
//     switch($exif["Orientation"]){
//         case 1: // 原圖
//         	$rotate = imagerotate($thumb, 0, 0);
//             break;
//         case 2: // Y軸鏡像
//         	$rotate = imagerotate($thumb, 0, 0);
//             break;
//         case 3: // 順時針180
//         	$rotate = imagerotate($thumb, 180, 0);
//             break;
//         case 4: // X軸鏡像
//         	$rotate = imagerotate($thumb, 0, 0);
//             break;
//         case 5: // y=-x鏡像
//         	$rotate = imagerotate($thumb, 0, 0);
//             break;
//         case 6: // 順時針270
//         	$rotate = imagerotate($thumb, 270, 0);
//             break;
//         case 7: // y=x鏡像
//         	$rotate = imagerotate($thumb, 0, 0);
//             break;
//         case 8: // 順時針90
//         	$rotate = imagerotate($thumb, 90, 0);
//             break;
//         default:
//     }

// // Resize
// ob_start();

// imagejpeg($rotate,null,20);
// $rotate = ob_get_contents();
// ob_end_clean();

// $base64Code = base64_encode($rotate);



//     echo "<img src='".$image.$base64Code."'>";

echo "<img src='http://127.0.0.1:177/57b3b0030c03c4ba9f7e5b5abef1328a.png'>";
?>