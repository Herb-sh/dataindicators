var app = (function() {

    'use strict';

    /**
     * Loops through array and finds max number
     * @param {type} array
     * @returns {Number|max} 
     */
    function getMax(array) {
        var max = 0;

        for (var i = 0; i < array.length; i++) {
            if (array[i].value && Number(array[i].value) && Number(array[i].value) > max) {
                max = Number(array[i].value);
            }
        }
        return max;
    }
    
        var loader = {
        selector : ".loader",
        dom : undefined,
        show : function(){
            if(!this.dom){
                this.dom = $(this.selector);
            }
            $(this.dom).show();
        },
        hide: function(){
            if(!this.dom){
                this.dom = $(this.selector);
            }
            this.dom.hide();
        }
    };

    /* Handles data format makes them compatible with datamap */
    function dataMediator(data) {
        var ajxdata = (typeof data === "object") ? data : JSON.parse(data);
        var maxPrice = getMax(data);//parseFloat(parseFloat(ajxdata.max_price).toFixed(2));

        var fillObj = {};
        var listInObjFormat = {};
        for (var i = 0; i < ajxdata.length; i++) {

            var country = ajxdata[i];//ggpInit[state]
            var countryID = country.country.id;
            listInObjFormat[country.country.id] = country;

            if (country && country.value) {

                if (wbToTopo[countryID]) {
                    fillObj[wbToTopo[countryID]] = getColorForPercentage(parseFloat(Number(country.value) || 0) / maxPrice);
                }
            }
        }

        return {
            fillObj: fillObj,
            countriesObj: listInObjFormat
        };
    }
    
    function numberFormat( number ){
        
        var digitCount = (number+"").length;
        var formatedNumber = number+"";
        var ind = digitCount%3 || 3;
        var temparr = formatedNumber.split('');
        
        if( digitCount > 3 && digitCount <= 6 ){
            
            temparr.splice(ind,0,',');
            formatedNumber = temparr.join('');
            
        }else if (digitCount >= 7 && digitCount <= 15) {
            var temparr2 = temparr.slice(0, ind);
            temparr2.push(',');
            temparr2.push(temparr[ind]);
            temparr2.push(temparr[ind + 1]);
            // temparr2.push( temparr[ind + 2] ); 
            if (digitCount >= 7 && digitCount <= 9) {
                temparr2.push(" million");
            } else if (digitCount >= 10 && digitCount <= 12) {
                temparr2.push(" billion");
            } else if (digitCount >= 13 && digitCount <= 15) {
                temparr2.push(" trillion");

            }
            formatedNumber = temparr2.join('');
        }
        return formatedNumber;
    }

    /*
     * @param {type} passedObj
     *      passedObj.countryData
     *      passedObj.countryProperties
     * @returns {undefined}
     */
    function countryHoverTemplate(passedObj) {

        var indicator = passedObj.countryData.indicator.value;
        var country = passedObj.countryProperties.name;
        var countryZone = passedObj.countryData.country.value;

        var val = passedObj.countryData.value;
        var date = passedObj.countryData.date;
        
//        val = (!!val) ? ( val.indexOf('.') && Number(val) => 1000 ? Number(val).toFixed(2) : numberFormat( val ) ) : "nodata";
        if(!!val){
            if( val.indexOf('.') && Number(val)  < 100 ){
                val = Number(val).toFixed(2);
            }else{
                val = numberFormat(  Number(val).toFixed(0) );
            }
        }else{
            val = "nodata";
        }

        if (passedObj.countryData) {

            return ['<div class="card">',
                '<div class="card-header">' + country + '  -  ' + date + '</div>',
                '<div class="card-block">',
                '<p class="card-title">' + indicator,
                '<span class="label label-default label-pill pull-xs-right">' + val + '</span>',
                '</p>',
                '</div>',
                '</div>'].join('');

        } else {
            return ['Nothing here!'].join('');
        }

    }

    /*
     * @param {Object} countriesData 
     *      countriesData.fillObj
     *      countriesData.countriesObj
     * @returns {undefined}
     */
    function dataMapInit(countriesData) {


        countriesData.fillObj.defaultFill = '#444';
//    console.log( countriesData );
        var mapDom = document.getElementById('container');
        while (mapDom.firstChild) {
            mapDom.removeChild(mapDom.firstChild);
        }

        window.Map = new Datamap(
                {
                    element: document.getElementById('container'),
                    projection: 'mercator',
                    fills: countriesData.fillObj,
                    data: dataObjZ,
                    responsive: true,
                    geographyConfig: {
                        popupTemplate: function(geography, data) {

                            var item = countriesData.countriesObj[topoToWb[geography.id]];

                            var template = countryHoverTemplate({
                                countryData: item,
                                countryProperties: geography.properties
                            });

                            return template;

                        },
                        highlightBorderColor: 'brown'
                    },
                    done: function() {

                    }
                }

        );

    }

    $(window).off("resize.map").on("resize.map", function() {
        if (typeof resizeMapTimer === "undefined") {
            var resizeMapTimer;
        }
        clearTimeout(resizeMapTimer);
        resizeMapTimer = setTimeout(function() {

            mapSize();
            
            Map.resize();
        }, 250);

    });

    function mapSize() {

        var width = $(window).width();
        var height = $(window).height();
        var ratioWidthToHeight = 1.5;

        /*
         * only if width larger than height
         */
        if (width > height) {
            /* In case width/height larger than ratio
             * respect ratio
             */
            console.log(width / height)
            if (width / height > ratioWidthToHeight) {
                $("#container").width(height * ratioWidthToHeight)
            }

        }

    }


    var dataProvider = (function() {
        /*
         * @param {type} obj
         *      obj.topics {Boolean} to get all topics
         *      obj.country {String} country prefix or id
         *      obj.countries {Boolean} All countries or not
         *      obj.indicator {String} Indicator id
         *      obj.data {String} a date or a date range see world bank date formats
         *      obj.callbacks {String} function name lowercase that will handle data in return
         * @returns {String}
         */
        function getDataUrl(obj) {
            var url = "http://api.worldbank.org/";

            if (obj && !obj.topics && !obj.country && !obj.countries) {
                throw("countries or topics required");
            }
            if (obj && obj.topics) { /* Boolean */
                url += "topic";
            }
            if (obj.country) { /* String country prefix */
                url += "countries/" + obj.country + "/indicators/";
                if (!obj.indicator) {
                    throw("indicator required")
                }
            }
            if (obj.countries) {/* Boolean */
                url += "countries/indicators/";
                if (!obj.indicator) {
                    throw("indicator required")
                }
            }

            if (obj.indicator) { /* String indicator id */
                url += obj.indicator;
                if (!obj.country && !obj.countries) {
                    throw("country or countries required")
                }
            }

            url += "?per_page=1000&format=jsonP";

            if (obj.date) {
                url += "&date=" + obj.date;
            }
            if (obj.MRV) {
                url += "&MRV=" + obj.MRV;
            }
            if (obj.Gapfill) {
                url += "&Gapfill=" + obj.Gapfill;
            }
            if (obj.callback) {
                url += "&prefix=" + obj.callback;
            }
            return url;
        }

        function getData(url) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'jsonp',
                success: function(data) {
//                console.log("success");
                }, error: function(error) {
//                console.log("error");
                }, done: function() {
//                console.log("done");
                }
            });
        }
        ;

        return {
            getDataUrl: getDataUrl,
            getData: getData
        };
    })();


     function getByIndicator(ind) {
         /** Show loader before triggerin get indicator  */
         loader.show();
        return dataProvider.getData(dataProvider.getDataUrl({
            countries: true,
            indicator: ind,
            MRV: 1,
            Gapfill: "Y",
            callback: "app.allbyindicatorcallback"
        }));
    }
    
    /*  */
    getByIndicator("EP.PMP.SGAS.CD");
    
    dataProvider.getData(dataProvider.getDataUrl({
        topics: true,
        callback: "app.indicatorscallback"
    }));

    /* Data returned Callbacks */
    function allbyindicatorcallback(data) {
        if (data[1]) {
            var dataConverted = dataMediator(data[1]);
            dataMapInit(dataConverted);
        } else {
            dataMapInit([]);
        }
        /* Hide loader after indicator is changed */
        loader.hide();
    }

    /* . */
    function indicatorscallback(data) {
        // console.log("indicators",data , data[1]);
    }

    /* Utilities and services */

    function getColorForPercentage(pct) {

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
    }
    
    



    return {
        indicatorscallback: indicatorscallback,
        allbyindicatorcallback: allbyindicatorcallback,
        getByIndicator: getByIndicator,
        loader: loader
    };
})();