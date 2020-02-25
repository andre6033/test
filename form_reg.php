<?php
if(isset($_POST['first_name'])){
  $first_name = $_POST['first_name'];
}
if(isset($_POST['last_name'])){
    $last_name = $_POST['last_name'];
}
if(isset($_POST['national'])){
    $national = $_POST['national'];
}
if(isset($_POST['mail'])){
    $mail = $_POST['mail'];
}
if(isset($_POST['gender'])){
    $gender = $_POST['gender'];
}
if(isset($_POST['pass_confirm'])){
    $pass_confirm = $_POST['pass_confirm'];
}
if(isset($_POST['day'])&&isset($_POST['month'])&&isset($_POST['year'])){
    $day = $_POST['day'];
    $month = $_POST['month'];
    $year = $_POST['year'];
}
echo "<div class='thank'><h3>Thank You!</h3><p>you registered!</p></div>"
?>