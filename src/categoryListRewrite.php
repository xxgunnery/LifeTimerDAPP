<?php
if( isset($_POST['functionname']) ) {
    switch( $_POST['functionname'] ) {
        case 'Category':
            $requestData = $_POST["dataset"];
            echo $requestData;
            $requestData = json_decode($requestData);
            $fileName = 'categoryLists/' . $requestData[0] . 'categoryList.json';
            $categoryChange = $requestData[2];
            $change = $requestData[3];
            $context = stream_context_create(array('http' => array('header'=>'Connection: close\r\n')));
            $jsonString = file_get_contents($fileName,false,$context);
            $requestedCategories = json_decode($jsonString, true);
            if($categoryChange == "new") {
                if($change == "") {
                    exit();
                } else {
                    $startJSON = array("Subcategories" => array("Example Subcategory" => array("Example Activity")));
                    $requestedCategories["Categories"][$change] = $startJSON;
                    $newJsonString = json_encode($requestedCategories);
                    file_put_contents($fileName, $newJsonString);
                }
            } else {
                if($change == "") {
                    unset($requestedCategories["Categories"][$categoryChange]);
                    $newJsonString = json_encode($requestedCategories);
                    file_put_contents($fileName, $newJsonString);
                } else {
                    $requestedCategories["Categories"][$change] = $requestedCategories["Categories"][$categoryChange];
                    unset($requestedCategories["Categories"][$categoryChange]);
                    $newJsonString = json_encode($requestedCategories);
                    file_put_contents($fileName, $newJsonString);
                }
            }
            exit();
        case 'Subcategory':
            $requestData = $_POST["dataset"];
            echo $requestData;
            $requestData = json_decode($requestData);
            $fileName = 'categoryLists/' . $requestData[0] . 'categoryList.json';
            $category = $requestData[2];
            $categoryChange = $requestData[3];
            $change = $requestData[4];
            $context = stream_context_create(array('http' => array('header'=>'Connection: close\r\n')));
            $jsonString = file_get_contents($fileName,false,$context);
            $requestedCategories = json_decode($jsonString, true);
            if($categoryChange == "new") {
                if($change == "") {
                    exit();
                } else {
                    $startJSON = (object) array("Activities"=> array("Example Activity" => array("Variations"=> ["Example Variation"], "Inputs"=> ["Example Input"])));
                    $requestedCategories["Categories"][$category]["Subcategories"][$change] = $startJSON;
                    $newJsonString = json_encode($requestedCategories);
                    $start = microtime(true);
                    file_put_contents($fileName, $newJsonString);
                    $time_elapsed_secs = microtime(true) - $start;
                    echo $time_elapsed_secs;
                }
            } else {
                if($change == "") {
                    unset($requestedCategories["Categories"][$category]["Subcategories"][$categoryChange]);
                    $newJsonString = json_encode($requestedCategories);
                    file_put_contents($fileName, $newJsonString);
                } else {
                    $requestedCategories["Categories"][$category]["Subcategories"][$change] = $requestedCategories["Categories"][$category]["Subcategories"][$categoryChange];
                    unset($requestedCategories["Categories"][$category]["Subcategories"][$categoryChange]);
                    $newJsonString = json_encode($requestedCategories);
                    $start = microtime(true);
                    file_put_contents($fileName, $newJsonString);
                    $time_elapsed_secs = microtime(true) - $start;
                    echo $time_elapsed_secs;
                }
            }
            exit();
        case 'Subsubcategory':
            $requestData = $_POST["dataset"];
            $requestData = json_decode($requestData);
            $fileName = 'categoryLists/' . $requestData[0] . 'categoryList.json';
            $category = $requestData[2];
            $subcategory = $requestData[3];
            $categoryChange = $requestData[4];
            $change = $requestData[5];
            $context = stream_context_create(array('http' => array('header'=>'Connection: close\r\n')));
            $jsonString = file_get_contents($fileName,false,$context);
            $requestedCategories = json_decode($jsonString, true);
            if($categoryChange == "new") {
                if($change == "") {
                    exit();
                } else {
                    $startJSON = (object) array("Variations"=> ["Example Variation"], "Inputs"=> ["Example Input"]);
                    $requestedCategories["Categories"][$category]["Subcategories"][$subcategory]["Activities"][$change] = $startJSON;
                    $newJsonString = json_encode($requestedCategories);
                    $start = microtime(true);
                    file_put_contents($fileName, $newJsonString);
                    $time_elapsed_secs = microtime(true) - $start;
                    echo $time_elapsed_secs;
                }
            } else {
                if($change == "") {
                    unset($requestedCategories["Categories"][$category]["Subcategories"][$subcategory]["Activities"][$categoryChange]);
                    $newJsonString = json_encode($requestedCategories);
                    file_put_contents($fileName, $newJsonString);
                } else {
                    $requestedCategories["Categories"][$category]["Subcategories"][$subcategory]["Activities"][$change] = (object) array("Variations"=> ["Example Variation"], "Inputs"=> ["Example Input"]);
                    unset($requestedCategories["Categories"][$category]["Subcategories"][$subcategory]["Activities"][$categoryChange]);
                    $newJsonString = json_encode($requestedCategories);
                    $start = microtime(true);
                    file_put_contents($fileName, $newJsonString);
                    $time_elapsed_secs = microtime(true) - $start;
                    echo $time_elapsed_secs;
                }
            }
            exit();
        case 'Variations':
            $requestData = $_POST["dataset"];
            $requestData = json_decode($requestData);
            $fileName = 'categoryLists/' . $requestData[0] . 'categoryList.json';
            $category = $requestData[2];
            $subcategory = $requestData[3];
            $activity = $requestData[4];
            $categoryChange = $requestData[5];
            $change = $requestData[6];
            $context = stream_context_create(array('http' => array('header'=>'Connection: close\r\n')));
            $jsonString = file_get_contents($fileName,false,$context);
            $requestedCategories = json_decode($jsonString, true);
            if($categoryChange == "new") {
                array_push($requestedCategories["Categories"][$category]["Subcategories"][$subcategory]["Activities"][$activity]["Variations"],$change);
                $newJsonString = json_encode($requestedCategories);
                file_put_contents($fileName, $newJsonString);
            } else {
                if($change == "") {
                    $arrayIndex = array_search($categoryChange, $requestedCategories["Categories"][$category]["Subcategories"][$subcategory]["Activities"][$activity]["Variations"], true);
                    array_splice($requestedCategories["Categories"][$category]["Subcategories"][$subcategory]["Activities"][$activity]["Variations"],$arrayIndex,1);
                    $newJsonString = json_encode($requestedCategories);
                    $start = microtime(true);
                    file_put_contents($fileName, $newJsonString);
                    $time_elapsed_secs = microtime(true) - $start;
                    echo $time_elapsed_secs;
                } else {
                    $arrayIndex = array_search($categoryChange, $requestedCategories["Categories"][$category]["Subcategories"][$subcategory]["Activities"][$activity]["Variations"], true);
                    echo " Subcategory: " . $subcategory . " ";
                    echo print_r($requestedCategories["Categories"][$category]["Subcategories"][$subcategory]["Activities"][$activity]["Variations"]);
                    echo " Array Index: " . $arrayIndex  . " ";
                    array_splice($requestedCategories["Categories"][$category]["Subcategories"][$subcategory]["Activities"][$activity]["Variations"],$arrayIndex,1,$change);
                    $newJsonString = json_encode($requestedCategories);
                    $start = microtime(true);
                    file_put_contents($fileName, $newJsonString);
                    $time_elapsed_secs = microtime(true) - $start;
                    echo $time_elapsed_secs;
                }
            }
            exit();
        case 'createJSON':
            $requestData = $_POST["dataset"];
            $fileName = 'categoryLists/' . $requestData . "_categoryList.json";
            $startJSON = array("Categories" => array("Example Category" => array("Subcategories" => array("Example Subcategory" => array("Activities" => array("Example Activity" => array("Variations" => array(),"Inputs" => array())))))));
            $fp = fopen($fileName,"w");
            fwrite($fp,json_encode($startJSON));
            fclose($fp);
            exit();
    }
}
?>