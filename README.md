# IdentifierIdetifier
Given an financial identifier, the algo tries to identify the type of identifier, and a place to get the data

# Concept
Within finance there are so many identifiers: legal entities, instrument identifiers, product codes, exchnge names, 

The consumer has an identifier represented as a string. They don't know what it is. For example, someone sees an ID in a text file, or on a screen. Rather than search multple systems to find the identifier, they can simply paste it in. This isn't a 'Google' for financial data, because that's Google. The limitation of google is that many data are licensed so not publically available. Additionally, the results from Google often don't lead to machine reable results without large engineering costs.

## Input
String: identifier

## Output

Can be multiple results:

String: identifier
Enum: IdentifierType (BBG ID, SEC LEI, MIC Code, ISO code, etc)
MatchType: Exact | Pattern | Fuzzy | Guess/Regex
DataSource: Link to where the data can be sourced from

## Match types
* Exact = An exact match based on a brute force lookup, or lookup based on a Elasticache mechanism
* Patter = Using a neural network, the algo has determined a likely identifier type
* Fuzzy = This isn't an exact match, but is very simliar to a record that exists (computationally expensive!)
* Guess/Regex = Hard-coded/regex based matching

# Vision

The results would be offered in a freemium model. E.g. the first X queries per day are without cost; or perhaps only the first result is returned. This would allow us to gauge product/market fit from a basic level.

If the algorithm is succesful then add-ons can be numerous to expand revenue possibilities:
* Email add-ons; search the email for identifiers, and make them click-able (e.g. highlight a bond isin and provide a link to the refernece data, or price source)
* Powering internal search: allow organizations to use their own systems for lookup, so that the algo returns company internal links.

# Deployment Model

* The algo would be a key part; presuming a CNN of some kind
* The service could be operated as a lambda function in AWS
* Any caching could be done with DynamoDB
* Exposed to users using a public swagger endpoint via AWS API gateway
* The model would be hosted on an S3 bucket

Fixed costs likely to be less than $10/month. 
