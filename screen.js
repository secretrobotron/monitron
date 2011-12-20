function Screen( screenOptions ){
  var _screenNum = screenOptions[ 1 ],
      _minDims = [
        screenOptions[ 2 ],
        screenOptions[ 3 ]
      ],
      _currentDims = [
        screenOptions[ 4 ],
        screenOptions[ 5 ]
      ],
      _maxDims = [
        screenOptions[ 6 ],
        screenOptions[ 7 ]
      ];

  Object.defineProperties( this, {
    id: {
      enumerable: true,
      get: function(){
        return _screenNum;
      }
    },
    minimum: {
      enumerable: true,
      get: function(){
        return _minDims.slice();
      }
    },
    current: {
      enumerable: true,
      get: function(){
        return _currentDims.slice();
      }
    },
    maximum: {
      enumerable: true,
      get: function(){
        return _maxDims.slice();
      }
    }
  });

} //Screen
Screen.regex = /^Screen ([0-9]): minimum ([0-9]+) x ([0-9]+), current ([0-9]+) x ([0-9]+), maximum ([0-9]+) x ([0-9]+)/;

exports.Screen = Screen;
