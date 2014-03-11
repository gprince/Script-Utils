/*jslint         browser:  true,  continue: true,
 devel:  true,   maxerr:   50,    newcap:   true,
 nomen:  true,   plusplus: true,  indent:   2,
 regexp: true,   sloppy:   false, vars:    false,
 white:  true,   maxlen:   80
 */

/*global define, module*/

// ScriptUtils v1.0.0
// (c) 2014 Grégory Prince
// Available via the MIT license.
// see: https://github.com/gprince/Script-Utils
( function ( window ) {

  'use strict';

  var ScriptUtils;

  ScriptUtils = ( function ( window ) {

    var CLASS_TO_STRING = {
          ARRAY    : "[object Array]",
          BOOLEAN  : "[object Boolean]",
          DATE     : "[object Date]",
          ERROR    : "[object Error]",
          FUNCTION : "[object Function]",
          GLOBAL   : "[object global]",
          NUMBER   : "[object Number]",
          OBJECT   : "[object Object]",
          REGEX    : "[object RegExp]",
          STRING   : "[object String]",
          NULL     : "[object Null]",
          UNDEFINED: "[object Undefined]"
        },
        Lang = {
          Array   : 'Array',
          Boolean : 'Boolean',
          Date    : 'Date',
          Error   : 'Error',
          Function: 'Function',
          Number  : 'Number',
          Object  : 'Object',
          Regexp  : 'Regexp',
          String  : 'String'
        };

    // Assertions

    function isArray ( obj ) {
      return isTypeOf( obj, CLASS_TO_STRING.ARRAY );
    }

    function isBlank ( str ) {
      return ( isNothing( str ) || str.length === 0 || /^\s*$/.test( str ) );
    }

    function isBoolean ( obj ) {
      return isTypeOf( obj, CLASS_TO_STRING.BOOLEAN );
    }

    function isDate ( obj ) {
      return isTypeOf( obj, CLASS_TO_STRING.DATE );
    }

    function isError ( obj ) {
      return isTypeOf( obj, CLASS_TO_STRING.ERROR );
    }

    function isFunction ( obj ) {
      return isTypeOf( obj, CLASS_TO_STRING.FUNCTION );
    }

    function isGlobal ( obj ) {
      return isTypeOf( obj, CLASS_TO_STRING.GLOBAL );
    }

    function isNothing ( obj ) {
      return ( isUndefined( obj ) || isNull( obj ) );
    }

    function isNull ( obj ) {
      return obj === null;
    }

    function isPlainObject ( obj ) {
      return isTypeOf( obj, CLASS_TO_STRING.OBJECT );
    }

    function isRegex ( obj ) {
      return isTypeOf( obj, CLASS_TO_STRING.REGEX );
    }

    function isString ( obj ) {
      return isTypeOf( obj, CLASS_TO_STRING.STRING );
    }

    function isTypeOf ( obj, type ) {
      return ( Object.prototype.toString.call( obj ) === type );
    }

    function isUndefined ( obj ) {
      return obj === void 0;
    }

    function isWindow ( obj ) {
      return ( !isNothing( window ) && !isNothing( obj ) && obj === window );
    }

    // Utilities

    /* Log helpers */
    function error () {
      console.error && console.error.apply( console, arguments );
    }

    function info () {
      console.info && console.info.apply( console, arguments );
    }

    function log () {
      console.log && console.log.apply( console, arguments );
    }

    /* Function helpers */

    function negate ( fn ) {
      return function () {
        return ( !isNothing( fn ) && !fn.apply( null, arguments ) );
      }
    }

    /* JSON helpers */

    function deserialize () {
      return JSON.parse.apply( null, arguments );
    }

    function serialize () {
      return JSON.stringify.apply( null, arguments );
    }

    /* Mixin helpers */

    function mix ( fn, obj ) {
      return ( fn && fn.apply( obj || {}, Array.prototype.slice.call( arguments, 2 ) ) || obj );
    }

    // Mixins

    function loggable () {
      this.error = this.error || error;
      this.info = this.info || info;
      this.log = this.log || log;
      return this;
    }

    function serializable () {
      var self = this;
      this.serialize = this.serialize || function () {
        return serialize.bind( null, self ).apply( null, Array.prototype.slice.call( arguments ) );
      };
      return this;
    }

    return {

      // Assertions

      isArray      : isArray,
      isBlank      : isBlank,
      isBoolean    : isBoolean,
      isDate       : isDate,
      isError      : isError,
      isFunction   : isFunction,
      isGlobal     : isGlobal,
      isNotBlank   : negate( isBlank ),
      isNotNull    : negate( isNull ),
      isNothing    : isNothing,
      isNumber     : negate( isNaN ),
      isNull       : isNull,
      isPlainObject: isPlainObject,
      isRegex      : isRegex,
      isSomething  : negate( isNothing ),
      isString     : isString,
      isUndefined  : isUndefined,
      isWindow     : isWindow,

      // Utilities

      /* Log */
      error        : error,
      info         : info,
      log          : log,

      /* Function helpers */
      negate       : negate,

      /* JSON helpers */
      deserialize  : deserialize,
      serialize    : serialize,

      /* Mixin helpers */
      mix          : mix,

      // Mixins
      loggable     : function ( obj ) {
        return mix( loggable, obj );
      },

      serializable: function ( obj ) {
        return mix( serializable, obj );
      }
    };
  }( window ) );

  // AMD / RequireJS
  if ( typeof define !== 'undefined' && define.amd ) {
    define( [], function () {
      return ScriptUtils;
    } );
  }
  // Node.js
  else if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = ScriptUtils;
  }
  // included directly via <script> tag
  else {
    window.ScriptUtils = ScriptUtils;
  }

}( window ) );
