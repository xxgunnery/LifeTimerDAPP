<?php

$conn = mysqli_connect("localhost","root","","lifetimer");

if (!$conn) {
    echo "Failed to connect to DB " .mysqli_connect_error();
    die("No connection to the host: ".mysqli_connect_error());
}

if( isset($_POST['functionname']) ) {
    switch( $_POST['functionname'] ) {
        case 'signupMeta':
            $metaID = $_POST['metaID'];

            $sql = "SELECT metaID FROM metaUsers WHERE metaID='$metaID' LIMIT 1";
            $result = mysqli_query($conn,$sql);
            $check = mysqli_num_rows($result);
            if ($check > 0) {
                echo "BAD";
                exit();
            } else {
                $meta_enc = hash("sha256", $metaID);
                $meta_enc = substr($meta_enc, 0, 8);
                $sql = "INSERT INTO metaUsers (metaID,metaHash) 
                VALUES ('$metaID','$meta_enc')";
                $result = mysqli_query($conn,$sql);
                echo "GOOD";
            }

            break;
        case 'loginMeta':
            $metaID = $_POST['metaID'];

            $sql = "SELECT * FROM metaUsers WHERE metaID='$metaID' LIMIT 1";
            $result = mysqli_query($conn,$sql);
            $check = mysqli_num_rows($result);

            if ($check > 0) {
                $sql = "SELECT * FROM metaUsers WHERE metaID='$metaID' LIMIT 1";
                $result = mysqli_query($conn,$sql);
                $row = mysqli_fetch_assoc($result);
                $metaIDShort = $row["metaHash"];
                echo $metaIDShort;
                exit();
            } else {
                echo "BAD";
                exit();
            }

        break;
    }
}

?>