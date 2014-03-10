/*
 *  Shout.js
 *
 *  A quick and dirty pub/sub thingamajig
 *
 *  Author: Stephen Murray
 *  Shout.js may be freely distributed under the MIT license.
 */

;(function(){

  "use strict";

  // Event string delimiter (spaces)
  var _delim = /\s+/,
  // Convenience for slice cuz, yknow laziness
    slice = Array.prototype.slice;


  // Utility functions

  function getArgs( args ) {
    return slice.call(args, 0);
  }

  function splitEvents( events ) {
    return events.split(_delim);
  }


  // Primary constructor
  function Shout() {
    this._cache = {};
  }

  // Instance methods
  Shout.prototype = {

    /**
     * Bind event(s) to handlers
     * @return {self}
     */
    on: function(){
      var args = getArgs(arguments),
        events = splitEvents(args[0]),
        handlers = slice.call(args, 1),
        ev;

      while ( ev = events.shift() ) {
        this._cache[ev] = this._cache[ev] || [];
        for ( var i = 0; i < handlers.length; i++ ) {
          this._cache[ev].push(handlers[i]);
        }
      }

      return this;
    },

    /**
     * Unbind event(s)
     * @return {self}
     */
    off: function(){
      var args = getArgs(arguments),
        events = splitEvents(args[0]),
        ev,
        retains = [],
        handlers = slice.call(args, 1);

      while ( ev = events.shift() ) {
        this._cache[ev] = this._cache[ev] || [];
        if ( handlers.length ) {
          for ( var i = 0; i < this._cache[ev].length; i++ ) {
            for ( var j = 0; j < handlers.length; j++ ) {
              if ( this._cache[ev][i] !== handlers[j] ) {
                retains.push(this._cache[ev][i]);
              }
            }
          }
          this._cache[ev] = retains;
        } else {
          delete this._cache[ev];
        }
      }

      return this;
    },

    /**
     * Emit/trigger events
     * @return {self}
     */
    emit: function(){
      var args = getArgs(arguments),
        events = splitEvents(args[0]),
        argsToPass = slice.call(args, 1),
        ev,
        handlers;

      while ( ev = events.shift() ) {
        handlers = this._cache[ev] || [];
        for ( var i = 0; i < handlers.length; i++ ) {
          switch ( argsToPass.length ) {
                case 0:
                    handlers[i]();
                    break;
                case 1:
                    handlers[i](argsToPass[0]);
                    break;
                case 2:
                    handlers[i](argsToPass[0], argsToPass[1]);
                    break;
                case 3:
                    handlers[i](argsToPass[0], argsToPass[1], argsToPass[2]);
                    break;
                default:
                    handlers[i].apply(null, argsToPass);
                    break;
          }
        }
      }

      return this;
    }

  };

  this.Shout = Shout;

}).call(this);
