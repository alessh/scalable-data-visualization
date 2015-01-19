'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    var axis = this.props.axis;
    var other = this.props.axis === 'x' ? 'y' : 'x';
    var tickLength = this.props.axis === 'x' ? 8 : -8;
    var scale = this.props.scale;
    var [min, max] = scale.domain();
    var axisLineProps = {
      stroke: 'black',
      strokeWidth: 2
    };
    axisLineProps[axis + '1'] = scale(min) + this.props[axis];
    axisLineProps[axis + '2'] = scale(max) + this.props[axis];
    axisLineProps[other + '1'] = this.props[other];
    axisLineProps[other + '2'] = this.props[other];
    var axisLine = React.DOM.line(axisLineProps);
    return (
      <g>
        {axisLine}
        {scale.ticks().map(function(tick, idx) {
          var lineProps = {
            stroke: 'black',
            strokeWidth: 2
          };
          lineProps[axis + '1'] = scale(tick) + this.props[axis];
          lineProps[axis + '2'] = scale(tick) + this.props[axis];
          lineProps[other + '1'] = this.props[other];
          lineProps[other + '2'] = this.props[other] + tickLength;
          var line = React.DOM.line(lineProps);
          var labelProps = {
            
          };
          labelProps[axis] = scale(tick) + this.props[axis];
          labelProps[other] = this.props[other] + (tickLength * 4);
          var label = React.DOM.text(labelProps, tick);
          return (
            <g key={idx}>
              {line}
              {label}
            </g>
          );
        }.bind(this))}
      </g>
    );
  }
});