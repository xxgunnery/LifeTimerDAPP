<div class="row tabs">
    <div class="tabsPane">
        <div class="paneGroup">
            <div class="tabsPaneTrapezoidL"></div>
            <div class="paneName" id="LifeTimer">Timer</div>
            <div class="tabsPaneTrapezoidR"></div>
        </div>
    </div>
    <div class="tabsPane">
        <div class="paneGroup">
            <div class="tabsPaneTrapezoidL"></div>
            <div class="paneName" id="TimerAnalysis">Analysis</div>
            <div class="tabsPaneTrapezoidR"></div>
        </div>
    </div>
</div>
<?php 
    if(isset($_GET['tab'])) {
        $tabSelected = $_GET['tab'];
        if($tabSelected == 'LifeTimer') {
            include 'LifeTimer.php';
        } else if ($tabSelected == 'TimerAnalysis') {
            include 'TimerAnalysis.php';
        } else {
            echo '<script> console.log("Not sure why this GET variable is bad...");</script>';
        }
    } else {
        include 'LifeTimer.php';
    }

?>
