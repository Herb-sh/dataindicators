
function fuelMapInit(data) {
    var ajxdata = JSON.parse(data);
    var maxPrice = parseFloat(parseFloat(ajxdata.max_price).toFixed(2));
    var fillObj = {};
    for (var state in ggpInit) {
        if (ajxdata[ggpInit[state]] && ajxdata[ggpInit[state]].ggp_fuel_price) {
            fillObj[state] = getColorForPercentage(parseFloat(ajxdata[ggpInit[state]].ggp_fuel_price) / maxPrice  );
        }
    }

    fillObj.defaultFill = '#444';

    new Datamap(
            {
                element: document.getElementById('container'),
                projection: 'mercator',
                fills: fillObj,
                data: dataObjZ,
                geographyConfig: {
                    popupTemplate: function(geography, data) {

                       
                        if (ajxdata[ggpInit[geography.id]] && ajxdata[ggpInit[geography.id]].ggp_fuel_price) {
                            return '<div class="m2 teal lighten-1 pad_v pad z-depth-3 color white">\n\
                                            <strong>' + geography.properties.name + '</strong>\n\
                                            <strong> - ' + ajxdata[ggpInit[geography.id]].ggp_fuel_price + '$</strong>\n\
                                        </div>';
                        } else {
                            return '<div class="m2 teal lighten-1 pad_v pad z-depth-3 color white">\n\
                                    <strong>' + geography.properties.name + '</strong>\n\
                                    <strong> - nodata </strong>\n\
                                </div>';
                        }

                    },
                    highlightBorderColor: 'brown'
                },
                done: function() {
                    
                }
            }

    );
}



(function() {
    $.ajax({
        type: 'GET',
        url: 'include_php/restapi.php',
        data: 'fueltype=diesel',
        success: function(data) {
            fuelMapInit(data);
        }, error: function() {
            console.log("error");
        }, done: function() {
            console.log("done");
        }
    });
})();

function getdata(){
    
}




var getColorForPercentage = function(pct) {

    var percentColors = [
        {pct: 0.0, color: {r: 0xff, g: 0x00, b: 0}},
        {pct: 0.5, color: {r: 0xff, g: 0xff, b: 0}},
        {pct: 1.0, color: {r: 0x00, g: 0xff, b: 0}}];

    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        g: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
};