#!/usr/bin/env node

const request = require('request')
    , cheerio = require('cheerio')
    , scraper = require('./scraper')

const idsToScrape = process.argv.slice(2)

const results = idsToScrape.map( id => {
  return scraper.scrape(id)
    .then(property => {
      return property
    })
    .catch(err => {
      console.log(`Error while scraping ${id}: ${err}`)
    })
})

Promise.all(results).then(properties => {
  properties
    .filter(i => i) // removing empty responses (if an error was catched)
    .map(property => console.log(property.name)) // do something with the remaining results
})