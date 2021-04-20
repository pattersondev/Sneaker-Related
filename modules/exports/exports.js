/**
 * @author Font
 * @version 12/15/2020
 */

const fs = require('fs');
const csv = require('csv-parser');

const profile = {
    'profile_name': 'name',
    'email': 'email',
    'one_checkout': true,
    'shipping': {
        'name': 'name',
        'phone': 'phone',
        'addy1': '1',
        'addy2': '2',
        'addy3': '3',
        'zip': '12345',
        'city': 'dallas',
        'state': 'texas',
        'country': 'united states'
    },
    'sameBilling': false,
    'billing': {
        'name': 'name',
        'phone': 'phone',
        'addy1': '1',
        'addy2': '2',
        'addy3': '3',
        'zip': '12345',
        'city': 'dallas',
        'state': 'texas',
        'country': 'united states'
    },
    'payment': {
        'name': 'shomboolton goozeman',
        'type': 'MasterCard / Visa / American Express / Discover',
        'cnb': 'number',
        'month': 'exp month',
        'year': 'exp year',
        'cvv': 'cvv'
    }
}
const abbrv = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};

const countries = {

"name": "Afghanistan", "code": "AF",
"name": "Åland Islands", "code": "AX",
"name": "Albania", "code": "AL",
"name": "Algeria", "code": "DZ",
"name": "American Samoa", "code": "AS",
"name": "AndorrA", "code": "AD",
"name": "Angola", "code": "AO",
"name": "Anguilla", "code": "AI",
"name": "Antarctica", "code": "AQ",
"name": "Belgium", "code": "BE",
"name": "Canada", "code": "CA",
"name": "China", "code": "CN",
"name": "Denmark", "code": "DK",
"name": "Finland", "code": "FI",
"name": "France", "code": "FR",
"name": "Germany", "code": "DE",
"name": "Greece", "code": "GR",
"name": "Greenland", "code": "GL",
"name": "Guam", "code": "GU",
"name": "Hong Kong", "code": "HK",
"name": "Iceland", "code": "IS",
"name": "India", "code": "IN",
"name": "Indonesia", "code": "ID",
"name": "Iran, Islamic Republic Of", "code": "IR",
"name": "Iraq", "code": "IQ",
"name": "Ireland", "code": "IE",
"name": "Israel", "code": "IL",
"name": "Italy", "code": "IT",
"name": "Jamaica", "code": "JM",
"name": "Japan", "code": "JP",
"name": "Korea, Republic of", "code": "KR",
"name": "Lithuania", "code": "LT",
"name": "Luxembourg", "code": "LU",
"name": "Malaysia", "code": "MY",
"name": "Maldives", "code": "MV",
"name": "Mexico", "code": "MX",
"name": "Netherlands", "code": "NL",
"name": "Netherlands Antilles", "code": "AN",
"name": "New Zealand", "code": "NZ",
"name": "Niue", "code": "NU",
"name": "Norway", "code": "NO",
"name": "Pakistan", "code": "PK",
"name": "Philippines", "code": "PH",
"name": "Poland", "code": "PL",
"name": "Portugal", "code": "PT",
"name": "Puerto Rico", "code": "PR",
"name": "Qatar", "code": "QA",
"name": "Romania", "code": "RO",
"name": "Russian Federation", "code": "RU",
"name": "South Africa", "code": "ZA",
"name": "South Georgia and the South Sandwich Islands", "code": "GS",
"name": "Spain", "code": "ES",
"name": "Sweden", "code": "SE",
"name": "Switzerland", "code": "CH",
"name": "Syrian Arab Republic", "code": "SY",
"name": "Taiwan, Province of China", "code": "TW",
"name": "United Arab Emirates", "code": "AE",
"name": "United Kingdom", "code": "GB",
"name": "United States", "code": "US",
"name": "United States Minor Outlying Islands", "code": "UM",
"name": "Viet Nam", "code": "VN",
"name": "Virgin Islands, British", "code": "VG",
"name": "Virgin Islands, U.S.", "code": "VI"


}


console.log(profile)
const nebula = () => {
    fs.readFile(path, 'utf8', function(err, data) {
        profile["matches"] = true
        profile["apt"] = profile.shipping.addy2
        profile["province"] = ''
        profile.province = {"value": abbrv[profile.shipping.state], "label" : profile.shipping.state}
        profile["country"] = ''
        profile.country = {"label": profile.shipping.state, "value" : countries.code[profile.shipping.state]}
        profile["holder"] = profile.payment.name
    })
}

const cyber = () => {
    fs.readFile(path, 'utf8', function(err, data) {
        profile["sizes"] = ["Random"]
        profile["modes"] = ["Fast"]
        profile["taskAmount"] = 1
        profile["singleCheckout"] = profile.one_checkout
        delete profile.one_checkout
        profile["billingDifferent"] = false
        delete profile.sameBilling
        profile["favorite"] = false
        profile["card"] = {"number": profile.payment.cnb, "expiryMonth" : profile.payment.month,
        "expiryYear" : profile.payment.year, "cvv" : profile.payment.cvv
        }
        delete profile.payment
        profile["paypal"] = {"email" : "", "password" : ""}
        profile["delivery"] = {"firstName": profile.shipping.name.substring(0, indexOf(" ")),
        "lastName" : profile.shipping.name.substring(indexOf(" "), profile.shipping.name.length),
        "address1" : profile.shipping.addy1,
        "address2" : profile.shipping.addy2,
        "city" : profile.shipping.city,
        "country" : profile.shipping.country,
        "state" : profile.shipping.state
        }
        profile["billing"] = {"firstName": profile.billingname.substring(0, indexOf(" ")),
        "lastName" : profile.billing.name.substring(indexOf(" "), profile.billing.name.length),
        "address1" : profile.billing.addy1,
        "address2" : profile.billing.addy2,
        "zip" : profile.billing.zip,
        "city" : profile.billing.city,
        "country" : profile.billing.country,
        "state" : profile.billing.state
        }

        delete profile.shipping
        delete profile.billing
        

    })
}

const dashe = () => {
    for (const key in profile) {
        key["billing"] = {"firstName" :key.billingname.substring(0, indexOf(" ")),
        "lastName" : key.billing.name.substring(indexOf(" "), key.billing.name.length),
        "zipCode" : key.billing.zip,
        "state" : abbrv[key.billing.state],
        "phoneNumber" : key.billing.phone,
        "apt" : key.billing.addy2,
        "address" : key.billing.addy1,
        }
        delete key.billing.name
        delete key.billing.zip
        delete key.billing.state
        delete key.billing.phone
        delete key.billing.addy2
        delete key.billing.addy1
        key["billingMatch"] = key.sameBilling
        delete key.sameBilling
        key["card"] = {"cvv" : key.payment.cvv,
        "holder" : key.payment.name,
        "month" : key.payment.month,
        "year" : key.payment.year,
        "number" : key.payment.cnb
        }
        delete key.payment
        profile["profileName"] = key.profile_name
        delete profile_name
        key["shipping"] = {"address": key.shipping.addy1,
        "apt" : key.shipping.addy2,
        "firstName" : key.shipping.name.substring(0, indexOf(" ")),
        "lastName" : key.shipping.name.substring(indexOf(" "), key.shipping.name.length),
        "phoneNumber" : key.shipping.phone,
        "state" : abbrv[key.shipping.state],
        "zipCode" : key.shipping.zip
        }

        delete key.shipping.name
        delete key.shipping.addy1
        delete key.shipping.addy2
        delete key.shipping.phone
        delete key.shipping.state
        delete key.shipping.zip
    }
}

const ganesh = (profile) => {
    for (const key in profile) {

    }
}

const kodai = (profile) => {
    for (const key in profile) {

    }
}

const mekpreme = (profile) => {
    for (const key in profile) {

    }
}

const nsb = (profile) => {
    fs.readFile(path, 'utf8', function(err, data) {
        profile["shipping"] = {
            "firstName" : profile.shipping.name.substring(0, indexOf(' ')),
            "lastName" : profile.shipping.name.substring(indexOf(' '), profile.shipping.name.length),
            "country" : countries.code[profile.shipping.country],
            "address" : profile.shipping.addy1,
            "address2" : profile.shipping.addy2,
            "state" : abbrv[profile.shipping.state]
        }
        profile["billing"] = {
            "firstName" : profile.billing.name.substring(0, indexOf(' ')),
            "lastName" : profile.billing.name.substring(indexOf(' '), profile.billing.name.length),
            "country" : countries.code[profile.billing.country],
            "address" : profile.billing.addy1,
            "address2" : profile.billing.addy2,
            "state" : abbrv[profile.billing.state]
        }
        profile["name"] = profile.profile_name
        profile["cc"] = {
            "number" : profile.payment.cnb,
            "expiry" : profile.payment.month + " / " + profile.payment.year,
            "cvc" : profile.payment.cvv
        }
        profile["checkoutLimit"] = "0"
        profile["billingSame"] = profile.sameBilling


        delete profile.shipping.name
        delete profile.shipping.country
        delete profile.shipping.addy1
        delete profile.shipping.addy2
        delete profile.shipping.state

        delete profile.billing.name
        delete profile.billing.country
        delete profile.billing.addy1
        delete profile.billing.addy2
        delete profile.billing.state

        delete profile.payment.cnb
        delete profile.payment.month
        delete profile.payment.year
        delete profile.payment.cvv
        delete profile.profile_name
        delete profile.sameBilling
        delete profile.one_checkout
    })
}

const phantom = (profile) => {
    fs.readFile(path, 'utf8', function(err, data) {
        profile["Billing"] = {"Address" : profile.billing.addy1,
        ["Apt"] : profile.billing.addy2,
        ["City"] : profile.billing.city,
        ["FirstName"] : profile.billing.name.substring(0, indexOf(' ')),
        ["LastName"] : profile.billing.name.substring(indexOf(' '), profile.billing.name.length),
        ["State"] : abbrv[profile.billing.state],
        ["Zip"] : profile.billing.zip
        }
        profile["Shipping"] = {"Address" : profile.shipping.addy1,
        ["Apt"] : profile.shipping.addy2,
        ["City"] : profile.shipping.city,
        ["FirstName"] : profile.shipping.name.substring(0, indexOf(' ')),
        ["LastName"] : profile.shipping.name.substring(indexOf(' '), profile.shipping.name.length),
        ["State"] : abbrv[profile.shipping.state],
        ["Zip"] : profile.shipping.zip
        }
        profile["CCNumber"] = profile.payment.cnb
        profile["CVV"] = profile.payment.cvv
        profile["CardType"] = profile.payment.type
        profile["Country"] = abbrv[profile.billing.country]
        profile["Email"] = profile.email
        profile["ExpMonth"] = profile.payment.month
        profile["ExpYear"] = profile.payment.year
        profile["Name"] = profile.profile_name
        profile["Phone"] = profile.phone
        profile["Same"] = profile.sameBilling

        delete profile.payment
        delete profile.profile_name
        delete profile.sameBilling
        delete profile.phone

    })
}

const prism = (profile) => {
    fs.readFile(path, 'utf8', function(err, data) {
        
        profile["oneTimeUse"] = profile.one_checkout
        profile["shipping"] = {"firstName" :profile.shipping.name.substring(0, indexOf(' ')),
        "lastName" : profile.shipping.name.substring(indexOf(' '), profile.shipping.name.length),
        "address1" : profile.shipping.addy1,
        "address2" : profile.shipping.addy2,
        "province" : profile.shipping.state,
        "postalCode" : profile.shipping.zip,
        }
        profile["shipping"] = {"firstName" :profile.billing.name.substring(0, indexOf(' ')),
        "lastName" : profile.billing.name.substring(indexOf(' '), profile.billing.name.length),
        "address1" : profile.billing.addy1,
        "address2" : profile.billing.addy2,
        "province" : profile.billing.state,
        "postalCode" : profile.billing.zip,
        }
        profile["payment"] = {
            "num" : profile.payment.cnb
        }
        
        delete profile.shipping.name
        delete profile.shipping.addy1
        delete profile.shipping.addy2
        delete profile.shipping.state
        delete profile.shipping.zip

        delete profile.billing.name
        delete profile.billing.addy1
        delete profile.billing.addy2
        delete profile.billing.state
        delete profile.billing.zip
        delete profile.one_checkout
        delete profile.payment.cnb
    })
}

const pd = (profile) => {
    fs.readFile(path, 'utf8', function(err, data) {
        profile["billing"] = {
            "address1" : profile.billing.addy1,
            "address2" : profile.billing.addy2,
            "firstName" : profile.billing.name.substring(0, indexOf(' ')),
            "lastName" : profile.billing.name.substring(indexOf(' '), profile.billing.name.length),
            "zipcode" : profile.billing.zip
        }
        profile["card"] = {
            "code" : profile.payment.cvv,
            "expire" : profile.payment.month + "/" + profile.payment.year,
            "name" : profile.payment.name,
            "number" : profile.payment.cnb 
        }
        profile["cashOnDelivery"] = false
        profile["dotTrick"] = false
        profile["jigAddress"] = false
        profile["jigPhone"] = false
        profile["limit"] = profile.one_checkout
        profile["limitCount"] = ""
        profile["match"] = profile.sameBilling

        profile["shipping"] = {
            "address1" : profile.shipping.addy1,
            "address2" : profile.shipping.addy2,
            "firstName" : profile.shipping.name.substring(0, indexOf(' ')),
            "lastName" : profile.shipping.name.substring(indexOf(' '), profile.shipping.name.length),
            "zipcode" : profile.shipping.zip
        }

        profile["title"] = profile.profile_name

        delete profile.billing.addy1
        delete profile.billing.addy2
        delete profile.billing.name
        delete profile.billing.zip

        delete profile.shipping.addy1
        delete profile.shipping.addy2
        delete profile.shipping.name
        delete profile.shipping.zip

        delete profile.one_checkout
        delete profile.sameBilling
        delete profile.profile_name

    })
}

const sole = (profile) => {
    for (const key in profile) {

    }
}

const splashforce = () => {
    for (const key in profile) {
        key["jigAddress"] = false
        key["oneCheckout"] = key.one_checkout
        delete key.one_checkout
        key["shipToBill"] = key.sameBilling
        delete key.sameBilling
        key["useThreeD"] = false;
    }
}

const tks = () => {
    for (const key in profile) {

    }
}

const tohru = (profile) => {
    //fs.readFile(path, 'utf8', function(err, data) {
        for (const key in profile) {

        profile["profileGroup"] = "purplImport"
        profile["cardHolder"] = profile.payment.name
        profile["cardNumber"] = profile.payment.cnb
        profile["expiryMonth"] = profile.payment.month
        profile["expiryYear"] = profile.payment.year
        profile["cardCVV"] = profile.payment.cvv
        profile["billingFirstName"] = profile.billing.name.substring(0, indexOf(' '))
        profile["billingLastName"] = profile.billing.name.substring(indexOf(' '), profile.billing.name.length)
        profile["billingAddress1"] = profile.billing.addy1
        profile["billingAddress2"] = profile.billing.addy2
        profile["billingCountry"] = profile.billing.country
        profile["billingCity"] = profile.billing.city
        profile["billingState"] = abbrv[profile.billing.state]
        profile["billingZip"] = profile.billing.zip
        profile["shippingFirstName"] = profile.shipping.name.substring(0, indexOf(' '))
        profile["shippingLastName"] = profile.shipping.name.substring(indexOf(' '), profile.shipping.name.length)
        profile["shippingAddress1"] = profile.shipping.addy1
        profile["shippingAddress2"] = profile.shipping.addy2
        profile["shippingCountry"] = profile.shipping.country
        profile["shippingCity"] = profile.shipping.city
        profile["shippingState"] = abbrv[profile.shipping.state]
        profile["shippingZip"] = profile.shipping.zip
        //Deleting all variables that had to be renamed cause ugly Tohru
        delete profile.payment.name
        delete profile.payment.cnb
        delete profile.payment.month
        delete profile.payment.year
        delete profile.payment.cvv
        delete profile.billing.name
        delete profile.billing.addy1
        delete profile.billing.addy2
        delete profile.billing.country
        delete profile.billing.state
        delete profile.billing.city
        delete profile.billing.zip
        delete profile.shipping.name
        delete profile.shipping.addy1
        delete profile.shipping.addy2
        delete profile.shipping.country
        delete profile.shipping.city
        delete profile.shipping.state
        delete profile.shipping.zip

        }
    }

const wrath = (profile) => {
    for (const key in profile) {

    }
}

