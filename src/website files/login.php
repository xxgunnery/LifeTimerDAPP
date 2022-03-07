<?php

$conn = mysqli_connect("localhost","xxgunnery","Lemonade7470","lifetimer");

if (!$conn) {
    echo "Failed to connect to DB " .mysqli_connect_error();
    die("No connection to the host: ".mysqli_connect_error());
}

if( isset($_POST['functionname']) ) {
    switch( $_POST['functionname'] ) {
        case 'login':
            $username = $_POST['user'];
            $password = $_POST['pass'];

            $sql = "SELECT * FROM users WHERE user='$username' LIMIT 1";
            $result = mysqli_query($conn,$sql);
            $row = mysqli_fetch_assoc($result);
            $pass_hash = $row['pass'];
            $verify = password_verify($password,$pass_hash);

            if($verify < 1) {
                echo "BAD";
                exit();
            } else {
                echo "GOOD";
                exit();
            }

            break;
        case 'signup':
            $username = $_POST['user'];
            $password = $_POST['pass'];
            #$email = $_POST['email'];

            $username = preg_replace('#[^A-Za-z0-9]#i', '', $username);

            if (empty($username) OR empty($password)){
                echo "BAD";
                exit();
            } else {
                $sql = "SELECT user FROM users WHERE user='$username' LIMIT 1";
                $result = mysqli_query($conn,$sql);
                $uidcheck = mysqli_num_rows($result);
                if ($uidcheck > 0) {
                    echo "BAD";
                    exit();
                } else {
                    $pass_enc = password_hash($password, PASSWORD_DEFAULT);
                    $sql = "INSERT INTO users (user,pass) 
                    VALUES ('$username','$pass_enc')";
                    $result = mysqli_query($conn,$sql);
                    echo "GOOD";
                }


            }
    }
}

?>