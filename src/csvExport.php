<?php

if( isset($_POST['functionname']) ) {
    switch( $_POST['functionname'] ) {
        case 'csvExport':
            $csvData = "";
            $jsonData = $_POST['dataset'];
            $jsonData = json_decode($jsonData);
            $csvData = array();
            for($i = 0; $i < sizeof($jsonData); $i++) {
                $pieData = $jsonData[$i];
                echo $pieData;
                array_push($csvData,$pieData);
            }
            $line = $csvData;
            $fp = fopen("timerData.csv","a+");
            fputcsv($fp,$line,",");
            fclose($fp);
            echo "Complete!";
            break;
    }
}
?>