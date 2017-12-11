const request = require('request-promise')
    , cheerio = require('cheerio')

function getNumber(value) { // returns 0 on invalid input !
  return Number(value.substr(0, value.indexOf(" ")))
}

function scrape(roomID) {
  const options = {
    url: 'https://www.airbnb.co.uk/rooms/' + roomID + '?s=51',
    transform: function (body) {
        return cheerio.load(body);
    },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
    },
    timeout:15000
  }

  return request(options)
    .then($ => {
      const summary = $('#summary')
      const type = $('[data-location] a').first()
      const mainContent = summary.next()
      const name = summary.find("div[itemprop='name']").first()
      const details = summary.find('div')
        .filter(function(i,el) {
          return this.children.length == 4
        }) // Looks like only the details div has 4 children
        .find('span[aria-hidden!="true"]') // remove the icons
        .not(':has(span)') // remove the elements holding the icons

      //load JSON data for amenities
      const bundleJSON = $('script[data-hypernova-key="spaspabundlejs"]').html()
      const amenities = {}
      JSON.parse(bundleJSON.substring(4,bundleJSON.length-3))['bootstrapData']['reduxData']['marketplacePdp']['listingInfo']['listing']['listing_amenities'].forEach(i => {
        amenities[i['tag']] = i['is_present']
      })

      const property = {
        name: name.text(),
        type: type.text(),
        capacity: getNumber(details.eq(0).text()),
        bedrooms: getNumber(details.eq(1).text()), // this will return 0 bedrooms for a studio, which sounds acceptable ?
        beds: getNumber(details.eq(2).text()),
        baths: getNumber(details.eq(3).text()),
        amenities: amenities
      }

      return property
    })
    .catch(err => {
      console.log(err)
      throw 'Scrape failed'
    })
}

exports.scrape = scrape

