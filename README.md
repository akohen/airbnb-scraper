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
* capacity : Integer
* type : String
* beds : Integer
* baths : Integer
* amenities : accessible through amenities[TAG] = Bool

## CLI usage
`airbnb-scraper PROPERTY_ID PROPERTY_ID...`
Will return the name of each property
