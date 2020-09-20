# Current

TODO

## Input 

REST API currently supports a POST request here:

https://mkd29ltjoa.execute-api.us-east-1.amazonaws.com/default/WhichIdentifier

The post format is simple, just a list of strings, e.g.

```["912828P46"]```

## Security

You need to add a request header called 'Dave', with the token you get from Cognito (See my email)

## Output

Returns a map. The key will be the same as your input. The value is a list of ticker types.

I'll be substantially revising these formats. See below

```{
    "912828P46": [
        "CUSIP"
    ]
}```

# Target state

## Input

### GET: <url>?s=912828P46 

Evaluates a single search request. There is no splitting of data, e.g. split by comma is not supported.

### POST

Format: a list of strings. Use this when providing multiples values

["912828P46"]

## Output

TODO: Should we just have the entity ID (912828P46 as the root result? Simpler to read?)

There are 3 categories of result:

* Entity recognition from the model; 'entities'. These may be post-processed to improve results. The goal is to include a confidence score for each result so that we can categorize in the UI. Example: 'just show me certain results', 'just show me things where you're 90% confident of what it is, etc.

* Data Attributes. Product information about what this identifier is. For example, is it a bond, swap, etc. What's the maturity date, etc. Maybe this could be an accordian 'More information' which slides out.

* Data Sources. Where you can find more information about the results. We'll prefer the official source, if that source is free. These could be represented as cards in the UI.

{
    "input" : ["912828P46"],
    "entities" : {
        "912828P46": { #Calling entity, as we will support more than identifiers longer term I think
        "substring": [0, 8],
        "entity" : "CUSIP",
        "entityType" : "FinancialIdentifier"
        "entityProvider" : "CUSIP",
        "entityConfidence" : 1.0, # value can be 0 to 1.0
        "tags" : [
            {
                "product" : "bond"
                # etc. TODO: Only include things here that can be inferred from the input?
            }
        ]
    }},
    "dataAttributes" : { 
        "912828P46": [{ #only include verified characteristics
            "product" : "bond",
            "maturityDate" : "mm/dd/yyyy",
            "currency" : "USD",
            "issuerID" : "<ID>", #will have to think about this. There can be multiple id types for identifier so this may be nested
            #etc
            "tags" : [
                "INFLATION_LINKED",
                "EARLY_REPAYMENT_OPTION",
                #etc
            ]
        }]
    }
    "dataSources" : { 
        #Visually, each one of these could be a 'card' underneath the serach box.
        #Goal would be to allow companies to include internal data sources, or allow for advertised
        #data providers (E.g. Bloomberg)

        "912828P46": [{
            "dataProvider" : "Bloomberg OpenFIGI",
            "dataLicenseType" : "FREE", #PAYWALL
            "datalinks" : ["https://www.openfigi.com/search#!?simpleSearchString=912828P46", 
                "https://www.openfigi.com/id/BBG00C59XZ86"]
        }, {
            "dataProvider" : "TreasuryDirect",
            "dataLicenseType" : "FREE", #PAYWALL
            "datalinks" : ["https://fiscaldata.treasury.gov/datasets/TODO!!!!"]
        }]
    }]
}