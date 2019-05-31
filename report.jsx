var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

const dimensions = [
  {'value': 'date', 'title': 'Date'},
  {'value': 'host', 'title': 'Host'}
]

const defaultDimensions = ['Date', 'Host']

const reduce = (row, calc) => {
  if (row.type === 'impression') {
    calc.impressionCount = (calc.impressionCount || 0) + 1
  }

  if (row.type === 'load') {
    calc.loadCount = (calc.loadCount || 0) + 1
  }

  if (row.type === 'display') {
    calc.displayCount = (calc.displayCount || 0) + 1
  }

  calc.loadRate = (calc.loadCount / calc.impressionCount) * 100
  calc.displayRate = (calc.displayCount / calc.loadCount) * 100
}

const calculations = [
  {'title': 'Impressions', 'value': 'impressionCount'},
  {'title': 'Loads', 'value': 'loadCount'},
  {'title': 'Displays', 'value': 'displayCount'},
  {
    'title': 'Load Rate',
    'value': 'loadRate',
    'template': (val, row) => val.toFixed(1) + '%'
  },
  {
    'title': 'Display Rate',
    'value': 'displayRate',
    'template': (val, row) => val.toFixed(1) + '%'
  }
]

module.exports = createReactClass({
  render () {
    return <div>
      <ReactPivot rows={rows}
        dimensions={dimensions}
        reduce={reduce}
        calculations={calculations}
        activeDimensions={defaultDimensions} />
    </div>
  }
})
