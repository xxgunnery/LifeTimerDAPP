jQuery(document).ready(
    function() {

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Slices');
            data.addRows([
            ['Mushrooms', 3],
            ['Onions', 1],
            ['Olives', 1],
            ['Zucchini', 1],
            ['Pepperoni', 2]
            ]);

            // Set chart options
            var options = {'title':'How Much Pizza I Ate Last Night',
                        'width':400,
                        'height':300};

            // Instantiate and draw our chart, passing in some options.
            //var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            //chart.draw(data, options);
        }
        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

        function useTab(tabSelected) {
            window.location.search = "?tab=" + tabSelected;
            console.log(tabSelected);
        }
    
        jQuery(document).on('click','#LifeTimer', 
            function() {
                useTab('LifeTimer');
        });
    
        jQuery(document).on('click', '#TimerAnalysis',
            function() {
                useTab('TimerAnalysis');
        });
    
        var searchVar = window.location.search;

        //show the input tab, or inventory tab based on the selection (URL read)
    
        if(searchVar == '?tab=LifeTimer') {
            jQuery('#LifeTimer').parent().css("background-color", "black");
        } else if(searchVar == '?tab=TimerAnalysis') {
            jQuery('#TimerAnalysis').parent().css("background-color", "black");
        }

});