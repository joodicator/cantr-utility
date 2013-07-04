<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <title>Tick Timings</title>
    <script type="text/javascript">
<?php
    include "utility.js";
    include "json2.js";
    include "getElementsByClassName-1.0.1.js";
    include "cookies.js";
    include "CantrTicks.js";
    include "sync.php";
    include "config.js";
?>
    </script>
    <style type="text/css">
<?php include "ticks.css"; ?>
        #main { position:fixed; left:0; top:0; width:100%; height:100%; }
        td.next, td.remain { text-align:center; }
    </style>
</head>
<body>
<?php include "table.htm"; ?>
</body>
</html>