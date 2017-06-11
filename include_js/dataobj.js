//Global Gas Price
var topoToWb = {
    'AFG': 'AF',
    'AGO': 'AO',
    'ALB': 'AL',
    'ARE': 'AE',
    'ARG': 'AR',
    'ARM': 'AM',
    'ATA': 'Antarctica',
    'ATF': 'French Southern and Antarctic Lands',
    'AUS': 'AU',
    'AUT': 'AT',
    'AZE': 'AZ',
    'BDI': 'BI',
    'BEL': 'BE',
    'BEN': 'BJ',
    'BFA': 'BF',
    'BGD': 'BD',
    'BGR': 'BG',
    'BHS': 'BS',
    'BIH': 'BA',
    'BLR': 'BY',
    'BLZ': 'BZ',
    'BOL': 'BO',
    'BRA': 'BR',
    'BRN': 'BN',
    'BTN': 'BT',
    'BWA': 'BW',
    'CAF': 'CF',
    'CAN': 'CA',
    'CHE': 'CH',
    'CHL': 'CL',
    'CHN': 'CN',
    'CIV': 'CI',
    'CMR': 'CM',
    'COD': 'CD',
    'COG': 'CG',
    'COL': 'CO',
    'CRI': 'CR',
    'CUB': 'CU',
    'CYP': 'CY',
    'CZE': 'CZ',
    'DEU': 'DE',
    'DJI': 'DJ',
    'DNK': 'DK',
    'DOM': 'DO',
    'DZA': 'DZ',
    'ECU': 'EC',
    'EGY': 'EG',
    'ERI': 'ER',
    'ESP': 'ES',
    'EST': 'EE',
    'ETH': 'ET',
    'FIN': 'FI',
    'FJI': 'FJ',
    'FLK': 'Falkland Islands',
    'FRA': 'FR',
    'GUF': 'French Guiana',
    'GAB': 'GA',
    'GBR': 'GB',
    'GEO': 'GE',
    'GHA': 'GH',
    'GIN': 'GN',
    'GMB': 'GM',
    'GNB': 'GW',
    'GNQ': 'GQ',
    'GRC': 'GR',
    'GRL': 'GL',
    'GTM': 'GT',
    'GUY': 'GY',
    'HND': 'HN',
    'HRV': 'HR',
    'HTI': 'HT',
    'HUN': 'HU',
    'IDN': 'ID',
    'IND': 'IN',
    'IRL': 'IE',
    'IRN': 'IR',
    'IRQ': 'IQ',
    'ISL': 'IS',
    'ISR': 'IL',
    'ITA': 'IT',
    'JAM': 'JM',
    'JOR': 'JO',
    'JPN': 'JP',
    'KAZ': 'KZ',
    'KEN': 'KE',
    'KGZ': 'KG',
    'KHM': 'KH',
    'KOR': 'KR',
    'kosovo': 'XK',
    'KWT': 'KW',
    'LAO': 'LA',
    'LBN': 'LB',
    'LBR': 'LR',
    'LBY': 'LY',
    'LKA': 'LK',
    'LSO': 'LS',
    'LTU': 'LT',
    'LUX': 'LU',
    'LVA': 'LV',
    'MAR': 'MA',
    'MDA': 'MD',
    'MDG': 'MG',
    'MEX': 'MX',
    'MKD': 'MK',
    'MLI': 'ML',
    'MMR': 'MM',
    'MNE': 'ME',
    'MNG': 'MN',
    'MOZ': 'MZ',
    'MRT': 'MR',
    'MWI': 'MW',
    'MYS': 'MY',
    'NAM': 'NA',
    'NCL': 'NC',
    'NER': 'NE',
    'NGA': 'NG',
    'NIC': 'NI',
    'NLD': 'NL',
    'NOR': 'NO',
    'NPL': 'NP',
    'NZL': 'NZ',
    'OMN': 'OM',
    'PAK': 'PK',
    'PAN': 'PA',
    'PER': 'PE',
    'PHL': 'PH',
    'PNG': 'PG',
    'POL': 'PL',
    'PRI': 'PR',
    'PRK': 'KP',
    'PRT': 'PT',
    'PRY': 'PY',
    'QAT': 'QA',
    'ROU': 'RO',
    'RUS': 'RU',
    'RWA': 'RW',
    'ESH': 'Western Sahara',
    'SAU': 'SA',
    'SDN': 'SD',
    'SSD': 'SS',
    'SEN': 'SN',
    'SLB': 'SB',
    'SLE': 'SL',
    'SLV': 'SV',
    'SOM': 'SO',
    'somaliland': 'SO',
    'SRB': 'RS',
    'SUR': 'SR',
    'SVK': 'SK',
    'SVN': 'SI',
    'SWE': 'SE',
    'SWZ': 'SZ',
    'SYR': 'SY',
    'TCD': 'TD',
    'TGO': 'TG',
    'THA': 'TH',
    'TJK': 'TJ',
    'TKM': 'TM',
    'TLS': 'TL',
    'TTO': 'TT',
    'TUN': 'TN',
    'TUR': 'TR',
    'TWN': 'TW',
    'TZA': 'TZ',
    'UGA': 'UG',
    'UKR': 'UA',
    'URY': 'UY',
    'USA': 'US',
    'UZB': 'UZ',
    'VEN': 'VE',
    'VNM': 'VN',
    'VUT': 'VU',
    'PSE': 'PS',
    'YEM': 'YE',
    'ZAF': 'ZA',
    'ZMB': 'ZM',
    'ZWE': 'ZW'
};


/*
 * 
 * key => world bank country.id 
 * value => topojson country.id
 * wordlbank country id used as key here
 * we loop through worldbank countries array than try to match its
 * country id with topojson respective country id
 * 
 **/
var wbToTopo = {};
for (var k in topoToWb) {
    if (k !== "somaliland") {
        wbToTopo[topoToWb[k]] = k;
    }
}


var dataObjZ = {};
for (var key in topoToWb) {
    dataObjZ[key] = {"fillKey": key};
}

/* Selected indicators from more than 15000 available */
var indicatorsSelected = {
    "Economy & Growth": {
        "indicators": {
            "NY.GDP.MKTP.KD.ZG": "GDP growth (annual %)",
            "NY.GDP.PCAP.CD": "GDP per capita (current international $)",
            "NY.GDP.PCAP.PP.CD": "GDP per capita, PPP",
            "GC.DOD.TOTL.GD.ZS": "Central government debt, total (% of GDP)",
            "NY.GNP.MKTP.PP.CD": "GNI, PPP (current international $)",
            "NE.EXP.GNFS.ZS": "Exports of goods and services (% of GDP)",
            "NE.IMP.GNFS.ZS": "Imports of goods and services (% of GDP)",
            "NY.GDP.DEFL.KD.ZG": "Inflation, GDP deflator (annual %)",
            "FP.CPI.TOTL.ZG": "Inflation, consumer prices (annual %)",
            "NV.AGR.TOTL.ZS": "Agriculture, value added (% of GDP)",
            "NV.IND.TOTL.ZS": "Industry, value added (% of GDP)",
            "NV.SRV.TETC.ZS": "Services, etc., value added (% of GDP)"
//            "DT.DOD.DECT.CD": "External debt stocks, total (DOD, current US$)",
//            "BX.KLT.DINV.CD.WD": "Foreign direct investment, net inflows (BoP, current US$)",
//            "NY.GDP.MKTP.CD": "GDP at market prices (current US$)",
//            "NE.GDI.TOTL.ZS": "Gross capital formation (% of GDP)",
//            "NY.GNS.ICTR.ZS": "Gross savings (% of GDP)",
        }
    },
    "Population": {
        "indicators" : {
            "SP.POP.TOTL": "Population",
            "SP.POP.GROW": "Population growth (annual %)"
        }
    },
    "Education": {
        "indicators": {
            "SE.XPD.TOTL.GD.ZS": "Government expenditure on education as % of GDP (%)",
            "SE.XPD.TOTL.GB.ZS": "Expenditure on education as % of total government expenditure (%)",
            "SL.TLF.TOTL.IN": "Labor force, total",
            "SE.PRM.TCAQ.ZS": "Percentage of teachers in primary education who are trained, both sexes (%)",
            "SP.POP.0014.TO.ZS": "Population, ages 0-14 (% of total)",
            "SP.POP.1564.TO.ZS": "Population, ages 15-64 (% of total)",
            "SE.PRM.ENRL.TC.ZS": "Pupil-teacher ratio in primary education (headcount basis)",
            "SL.UEM.TOTL.ZS": "Unemployment, total (% of total labor force)",
            "SE.ADT.1524.LT.ZS": "Youth literacy rate, population 15-24 years, both sexes (%)"
        }
    },
    "Energy & Mining": {
        "indicators": {
            "EP.PMP.DESL.CD": "Pump price for diesel fuel (US$ per liter)",
            "EP.PMP.SGAS.CD": "Pump price for gasoline (US$ per liter)",
            "EG.USE.PCAP.KG.OE": "Energy use (kg of oil equivalent per capita)",
            "EG.IMP.CONS.ZS": "Energy imports, net (% of energy use)",
            "TX.VAL.FUEL.ZS.UN": "Fuel exports (% of merchandise exports)",
            "EG.USE.COMM.FO.ZS": "Fossil fuel energy consumption (% of total)"
        }
    },
    "Environment": {
        "indicators": {
            "EG.ELC.ACCS.ZS": "Access to electricity (% of population)",
            "EN.ATM.CO2E.PC": "CO2 emissions (metric tons per capita)",
            "AG.LND.FRST.K2": "Forest area (sq. km)",
            "EG.ELC.RNEW.ZS": "Renewable electricity output (% of total electricity output)",
            "EG.FEC.RNEW.ZS": "Renewable energy consumption (% of total final energy consumption)"
        }
    },
    "Agriculture & Rural Development": {
        "indicators": {
            "SP.RUR.TOTL.ZS": "Rural population (% of total population)",
            "SL.AGR.EMPL.ZS": "Employment in agriculture (% of total employment)",
            "AG.LND.FRST.ZS": "Forest area (% of land area)"
        }
    },
    "Aid Effectiveness": {
        "indicators": {
            "EN.ATM.CO2E.PC": "CO2 emissions (metric tons per capita)",
            "SP.DYN.CONU.ZS": "Contraceptive prevalence, any methods (% of women ages 15-49)",
            "SP.DYN.LE00.FE.IN": "Life expectancy at birth, female (years)",
            "SP.DYN.LE00.MA.IN": "Life expectancy at birth, male (years)",
            "SH.STA.MMRT": "Maternal mortality ratio (modeled estimate, per 100,000 live births)",
            "IT.CEL.SETS.P2": "Mobile cellular subscriptions (per 100 people)",
            "SH.DYN.MORT": "Mortality rate, under-5 (per 1,000)",
            "SM.POP.NETM": "Net migration",
            "SP.POP.TOTL.FE.ZS": "Population, female (% of total)",
            "SP.MTR.1519.ZS": "Teenage mothers (% of women ages 15-19 who have had children or are currently pregnant)"
        }
    }
};