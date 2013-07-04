<?php
$countFileName = "_hit_count.txt";
$hits = file($countFileName);
$hits[0]++;
$fp = fopen($countFileName , "w");
fputs($fp , "$hits[0]");
fclose($fp);
?>