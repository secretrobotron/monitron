function Monitor( monitorOptions ){
  var _id = monitorOptions[ 1 ],
      _connected = monitorOptions[ 2 ],
      _width = monitorOptions[ 5 ],
      _height = monitorOptions[ 6 ],
      _offsetX = monitorOptions[ 7 ],
      _offsetY = monitorOptions[ 9 ],
      _modes = [];
  Object.defineProperties( this, {
    id: { enumerable: true, get: function(){ return _id; } },
    connected: { enumerable: true, get: function(){ return _connected; } },
    width: { enumerable: true, get: function(){ return _width; } },
    height: { enumerable: true, get: function(){ return _height; } },
    offsetX: { enumerable: true, get: function(){ return _offsetX; } },
    offsetY: { enumerable: true, get: function(){ return _offsetY; } },
    modes: { enumerable: true, get: function(){ return _modes; } }
  });

  function Mode( modeOptions ){
    var _width = modeOptions[ 1 ],
        _height = modeOptions[ 2 ],
        _freqString = modeOptions[ 3 ],
        _frequencies = [];

    var _freqRegex = /([0-9]+\.[0-9]+)(\*\+|\*\ |\ \+)*/,
        freqStr = _freqString;
    while( true ){
      var match = _freqRegex.exec( freqStr );
      if( !match ) {
        break;
      } //if
      _frequencies.push({
        hz: match[ 1 ],
        current: match[ 2 ] ? match[ 2 ].indexOf( "*" ) > -1 : false,
        preferred: match[ 2 ] ? match[ 2 ].indexOf( "+" ) > -1 : false
      });
      freqStr = freqStr.slice( match.index + match[ 1 ].length + 1 + ( match[ 2 ] ? match[ 2 ].length : 0 ) );
    } //while
  } //Mode

  var _modeRegex = /^\s+([0-9]+)x([0-9]+)\s(.*)*/;

  this.addModes = function( modeOptions ) {
    for( var line in modeOptions ) {
      var modeResult = _modeRegex.exec( modeOptions[ line ] );
      if( modeResult ) {
        var mode = new Mode( modeResult );
        _modes.push( mode );
      } //if
    } //for
    return _modes.length - 1;
  }; //addMode

} //Monitor
Monitor.regex = /^([A-Z0-9]+) ((dis)?connected) (([0-9]+)x([0-9]+)((\+|\-)[0-9]+)((\+|\-)[0-9]+))?/;

exports.Monitor = Monitor;

