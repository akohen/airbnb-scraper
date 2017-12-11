# airbnb-scraper
A simple scraper for airbnb

## Installation
`npm install akohen/airbnb-scraper --save`
Can also be installed globally to use the CLI tool

## Usage
```
const scraper = require('airbnb-scraper')

scraper.scrape(PROPERTY_ID)
.then(property => {
  console.log(property.name)
})
```

Each returned object has the following properties:
* name : String
* type : String
* capacity : Integer
* bedrooms : Integer
* beds : Integer
* baths : Integer
* amenities : accessible through amenities[TAG] = Bool

## CLI usage
`airbnb-scraper PROPERTY_ID PROPERTY_ID...`
Will return the name of each property, the type of the property and the maximum number of guests, separated by semicolons
