<html>
  <head>
    <title>Hit Count for cantr/itemlist/</title>
    <style type="text/css">
    <!--
      body {font-size: 36pt;
            font-weight: bold}
    -->
    </style>
  </head>
  <body>
    <?php $countFileName = "_hit_count.txt";
          $hits = file($countFileName);
          echo($hits[0]); ?>
  </body>
</html>