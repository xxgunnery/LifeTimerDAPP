<div class="accountContainer row">
    <div id="web3" class="col-10">
        <div class="web3row">Account ID:<div class="web3Data" id="web3ID"></div></div>
        <div class="web3row">Token Balance (DATT):<div class="web3Data" id="web3Balance"></div></div>
    </div>
    <div class="col-2 align-self-center justify-self-center">
        <div class="web3row"><img id="check"></div>
    </div>
</div>
<div class="appContainer">
    <div class="chartContainer row">
        <div id="categoryChart" class="pieChart col-sm-4"></div>
        <div id="subCategoryChart" class="pieChart col-sm-4"></div>
        <div id="activityChart" class="pieChart col-sm-4"></div>
        <div id="displayCharts">Display all charts</div>
    </div>
    <div class="timerControls">
        <div class="row justify-content-center align-items-center">
            <div class="dropdown col-xs-3" id="dropdownCategory">
                <div id="dropdownBoxCategory" class="dropdownText"><img src="images/downarrow.png">Choose a category</div>
                <div class="dropdownOptions" id="dropdownOptionsCategory"></div>
            </div>
            <div class="dropdown col-xs-3" id="dropdownSubcategory">
                <div id="dropdownBoxSubcategory" class="dropdownText"><img src="images/downarrow.png">Choose a subcategory</div>
                <div class="dropdownOptions" id="dropdownOptionsSubcategory"></div>
            </div>
            <div class="dropdown col-xs-3" id="dropdownActivity">
                <div id="dropdownBoxActivity" class="dropdownText"><img src="images/downarrow.png">Choose an activity</div>
                <div class="dropdownOptions" id="dropdownOptionsActivity"></div>
            </div>
    </div>
    <div class="row justify-content-center align-items-center">
        <div class="hiddenMenu col-xs-12">
            <div class="dropdown" id="dropdownVariations">
                <div id="dropdownBoxVariations" class="dropdownText"><img src="images/downarrow.png"></img>Choose a variation</div>
                <div class="dropdownOptions" id="dropdownOptionsVariations"></div>
            </div>
        </div>
    </div>
    <div class="row justify-content-center align-items-center">
        <div class="tagField col-xs-6">
            <input type="text" id="field1">
        </div>
        <div class="tagField col-xs-6">
            <input type="text" id="field2">
        </div>

        <div id="edit">EDIT</div>
    </div>
    <div class="timerButtons">
        <img id="play" src="images/play-button.png">
        <img id="pause" src="images/pause-button.png">
        <img id="save" src="images/save-button.png">
    </div>
    <div class="row justify-content-center align-items-center">
        <div id="timerContainer" class="timerContainer col-xs-4">
            <div id="time" class="timer">00:00:00</div>
        </div>
    </div>
</div>