<?php
$dest = imagecreatefromjpeg('storage/frame.jpeg');
$src = imagecreatefromjpeg('storage/orange.jpeg');
imagealphablending($dest, false);
imagesavealpha($dest, true);
imagecopymerge($dest, $src, 0, 0, 0, 0, 1100, 1100, 100);
header('Content-Type: image/png');
imagejpeg($dest);
imagedestroy($dest);
imagedestroy($src);
