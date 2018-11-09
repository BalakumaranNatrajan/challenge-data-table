var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var dimensions = [
  { value: 'date', title: 'Date' },
  { value: 'host', title: 'Host' }
]

var reduce = function (row, memo) {
  if (row.type == 'impression')
    memo.impression = (memo.impression || 0) + 1
  if (row.type == 'load')
    memo.load = (memo.load || 0) + 1
  if (row.type == 'display')
    memo.display = (memo.display || 0) + 1
  memo.loadRate = (memo.load / memo.impression * 100);
  memo.displayRate = (memo.display / memo.load * 100);
  return memo
}

var calculations = [
  {
    title: 'Impression', value: 'impression',
    template: function (val, row) {
      return val
    }
  },
  {
    title: 'Load', value: 'load',
    template: function (val, row) {
      return val
    }
  },
  {
    title: 'Display', value: 'display',
    template: function (val, row) {
      return val
    }
  },
  {
    title: 'Load Rate', value: 'loadRate',
    template: function (val, row) {
      return val.toFixed(1) + '%'
    }
  },
  {
    title: 'Display Rate', value: 'displayRate',
    template: function (val, row) {
      return val.toFixed(1) + '%'
    }
  }
]
module.exports = createReactClass({
  render() {
    return <div className="pivotTable"><ReactPivot rows={rows}
      dimensions={dimensions}
      reduce={reduce}
      calculations={calculations}
      hiddenColumns={[]}
    /></div>
  }
})
