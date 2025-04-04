const countryList = {
    AED: 'AE',
    AFN: 'AF',
    XCD: 'AG',
    ALL: 'AL',
    AMD: 'AM',
    ANG: 'AN',
    AOA: 'AO',
    AQD: 'AQ',
    ARS: 'AR',
    AUD: 'AU',
    AZN: 'AZ',
    BAM: 'BA',
    BBD: 'BB',
    BDT: 'BD',
    XOF: 'BE',
    BGN: 'BG',
    BHD: 'BH',
    BIF: 'BI',
    BMD: 'BM',
    BND: 'BN',
    BOB: 'BO',
    BRL: 'BR',
    BSD: 'BS',
    NOK: 'BV',
    BWP: 'BW',
    BYR: 'BY',
    BZD: 'BZ',
    CAD: 'CA',
    CDF: 'CD',
    XAF: 'CF',
    CHF: 'CH',
    CLP: 'CL',
    CNY: 'CN',
    COP: 'CO',
    CRC: 'CR',
    CUP: 'CU',
    CVE: 'CV',
    CYP: 'CY',
    CZK: 'CZ',
    DJF: 'DJ',
    DKK: 'DK',
    DOP: 'DO',
    DZD: 'DZ',
    ECS: 'EC',
    EEK: 'EE',
    EGP: 'EG',
    ETB: 'ET',
    EUR: 'FR',
    FJD: 'FJ',
    FKP: 'FK',
    GBP: 'GB',
    GEL: 'GE',
    GGP: 'GG',
    GHS: 'GH',
    GIP: 'GI',
    GMD: 'GM',
    GNF: 'GN',
    GTQ: 'GT',
    GYD: 'GY',
    HKD: 'HK',
    HNL: 'HN',
    HRK: 'HR',
    HTG: 'HT',
    HUF: 'HU',
    IDR: 'ID',
    ILS: 'IL',
    INR: 'IN',
    IQD: 'IQ',
    IRR: 'IR',
    ISK: 'IS',
    JMD: 'JM',
    JOD: 'JO',
    JPY: 'JP',
    KES: 'KE',
    KGS: 'KG',
    KHR: 'KH',
    KMF: 'KM',
    KPW: 'KP',
    KRW: 'KR',
    KWD: 'KW',
    KYD: 'KY',
    KZT: 'KZ',
    LAK: 'LA',
    LBP: 'LB',
    LKR: 'LK',
    LRD: 'LR',
    LSL: 'LS',
    LTL: 'LT',
    LVL: 'LV',
    LYD: 'LY',
    MAD: 'MA',
    MDL: 'MD',
    MGA: 'MG',
    MKD: 'MK',
    MMK: 'MM',
    MNT: 'MN',
    MOP: 'MO',
    MRO: 'MR',
    MTL: 'MT',
    MUR: 'MU',
    MVR: 'MV',
    MWK: 'MW',
    MXN: 'MX',
    MYR: 'MY',
    MZN: 'MZ',
    NAD: 'NA',
    XPF: 'NC',
    NGN: 'NG',
    NIO: 'NI',
    NPR: 'NP',
    NZD: 'NZ',
    OMR: 'OM',
    PAB: 'PA',
    PEN: 'PE',
    PGK: 'PG',
    PHP: 'PH',
    PKR: 'PK',
    PLN: 'PL',
    PYG: 'PY',
    QAR: 'QA',
    RON: 'RO',
    RSD: 'RS',
    RUB: 'RU',
    RWF: 'RW',
    SAR: 'SA',
    SBD: 'SB',
    SCR: 'SC',
    SDG: 'SD',
    SEK: 'SE',
    SGD: 'SG',
    SKK: 'SK',
    SLL: 'SL',
    SOS: 'SO',
    SRD: 'SR',
    STD: 'ST',
    SVC: 'SV',
    SYP: 'SY',
    SZL: 'SZ',
    THB: 'TH',
    TJS: 'TJ',
    TMT: 'TM',
    TND: 'TN',
    TOP: 'TO',
    TRY: 'TR',
    TTD: 'TT',
    TWD: 'TW',
    TZS: 'TZ',
    UAH: 'UA',
    UGX: 'UG',
    USD: 'US',
    UYU: 'UY',
    UZS: 'UZ',
    VEF: 'VE',
    VND: 'VN',
    VUV: 'VU',
    YER: 'YE',
    ZAR: 'ZA',
    ZMK: 'ZM',
    ZWD: 'ZW',
};
const dropdowns = document.querySelectorAll('.dropdown select');
for (let select of dropdowns) {
    select.addEventListener('change', (evt) => {
        updateFlage(evt.target);
    });
}
function updateFlage(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}
const apiKey = 'bda6fc547e8893c404f33f13';
const apiUrl = 'https://v6.exchangerate-api.com/v6/' + apiKey + '/latest/';

let dropdown = document.querySelectorAll('.dropdown select');
let convertbtn = document.getElementById('convert');
let fromCurrency = document.getElementById('fromCurrency');
let toCurrency = document.getElementById('toCurrency');
let result = document.getElementById('result');
let amount_value = document.getElementById('amount_value');

convertbtn.addEventListener('click', async (evt) => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amt = amount_value.value;
    if (!amt || amt <= 0) {
        result.innerText = 'Please enter a valid amount';
        return;
    }
    try {
        const response = await fetch(apiUrl + from);
        const data = await response.json();
        console.log(data);
        if (data.result === 'success') {
            const rate = data.conversion_rates[to];
            const convertedAmount = (amt * rate).toFixed(2);
            result.innerText = `${amt}${from} = ${convertedAmount}${to}`;
        }
    } catch (error) {
        result.innerText =
            'Failed to fetch data. Check your API key and internet connection';
    }
});

// for (let select of dropdowns) {
//     for (let currCode in countryList) {
//         let newOption = document.createElement('option');
//         newOption.innerText = currCode;
//         newOption.value = currCode;
//         if (select.name === 'from' && currCode === 'USD') {
//             newOption.selected = 'selected';
//         } else if (select.name === 'to' && currCode === 'INR') {
//             newOption.selected = 'selected';
//         }
//         select.append(newOption);
//     }

//     select.addEventListener('change', (evt) => {
//         updateFlage(evt.target);
//     });
// }
// convertbtn.addEventListener('click', async () => {
//     let amt = amount_value.value;
//     let from = fromCurrency.value;
//     let to = toCurrency.value;
//     if (!amt || amt <= 0) {
//         result.innerText = 'Please enter a valid amount';
//         return;
//     }
//     try {
//         let response = await fetch(apiUrl + from);
//         let data = await response.json();
//         console.log(data);
//         if (data.result === 'success') {
//             let rate = data.conversion_rates[to];
//             let finalAmount = (amt * rate).toFixed(2);
//             result.innerText = `${amt} ${from} = ${finalAmount} ${to}`;
//         } else {
//             result.innerText = 'Error fetching exchange rates';
//         }
//     } catch (erroe) {
//         result.innerText =
//             'Failed to fetch data. Check your API key and internet';
//     }
// });
