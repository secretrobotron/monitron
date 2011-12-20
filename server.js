var express = require( "express" ),
    child_process = require( "child_process" ),
    exec = child_process.exec,
    Screen = require( "./screen.js" ).Screen,
    Monitor = require( "./monitor.js" ).Monitor;

const PORT = 10501;
const SETTINGS_INTERVAL = 5000;

var __hostname = "",
    __app = express.createServer(),
    __settingsInterval,
    __currentSettings = {};

__app.get( "/", function( req, res ){
  res.render( "index.ejs", {
    hostname: __hostname,
    settings: __currentSettings
  });
});

__app.set( "view options", {
  layout: false
});

function getHostnameHandler( error, stdout, stderr ){
  if( !error ){
    __hostname = stdout;
  } //if
} //getHostnameHandler

function getOutputSettingsHandler( error, stdout, stderr ){
  if( !error ){

    var lines = stdout.split( "\n" );

    __currentSettings = {
      screens: [],
      monitors: []
    };

    for( var line = 0; line < lines.length; ++line ) {
      var screenResult = Screen.regex.exec( lines[ line ] ),
          monitorResult = Monitor.regex.exec( lines[ line ] );
      if ( screenResult ) {
        var screen = new Screen( screenResult );
        __currentSettings.screens.push( screen );
      }
      else if ( monitorResult ) {
        var monitor = new Monitor( monitorResult );
        __currentSettings.monitors.push( monitor );
        var numLines = monitor.addModes( lines.slice( line + 1 ) );
        line += numLines;
      } //if
    } //for

  } //if
} //getOutputSettingsHandler

function getOutputSettings() {
  exec( "xrandr", getOutputSettingsHandler );
}

exec( "uname -n", getHostnameHandler );
__settingsInterval = setInterval( getOutputSettings, SETTINGS_INTERVAL );
getOutputSettings();
__app.listen( PORT );
