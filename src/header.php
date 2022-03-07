<!DOCTYPE HTML>

<html lang="en-US">
    <head>
        <title>LifeTimer</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon"/>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="Description" content="Hello">

        <!-- JQuery -->
        <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>

        <!-- Latest compiled and minified Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

        <!-- Oxygen Font -->
        <link href='https://fonts.googleapis.com/css?family=Oxygen' rel='stylesheet' type='text/css'>

        <!--Load the AJAX API-->
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script src="https://www.gstatic.com/charts/loader.js"></script>

        <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-core.min.js"></script>
        <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-pie.min.js"></script>
        <script src="https://www.gstatic.com/charts/loader.js"></script>

        <!-- My Stylesheets -->
        <?php
            $directoryVar;

            if (file_exists('../stylesheets/style.css')) {
                $directoryVar = '../';
            } else if (file_exists('../../stylesheets/style.css')) {
                $directoryVar = '../../';
            } else {
                $directoryVar = "";
            }
            echo "<link href=" . $directoryVar . "stylesheets/style.css rel='stylesheet' type='text/css'>"
        ?>
    </head>

    <body>
        <div class="container-fluid timerHeader">
        </div>
        <div class="pageContainer">