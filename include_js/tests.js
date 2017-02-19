
function getDataUrlTests(){
    
    console.log(dataProvider.getDataUrl({topics:true}));
    console.log(dataProvider.getDataUrl({country:"ALB",indicator:"EP.PMP.SGAS.CD"}));
    console.log(dataProvider.getDataUrl({countries:true, indicator:"EP.PMP.SGAS.CD"}));
    console.log(dataProvider.getDataUrl({countries:true, indicator:"EP.PMP.SGAS.CD",date:"2015"}));
    
}


function getDataTests(){
    
    dataProvider.getData(dataProvider.getDataUrl({topics:true}));
    dataProvider.getData(dataProvider.getDataUrl({country:"ALB",indicator:"EP.PMP.SGAS.CD"}));
    dataProvider.getData(dataProvider.getDataUrl({countries:true, indicator:"EP.PMP.SGAS.CD"}));
    dataProvider.getData(dataProvider.getDataUrl({countries:true, indicator:"EP.PMP.SGAS.CD",date:"2015"}));
    
}

