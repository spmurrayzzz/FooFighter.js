/**
 * Util.js
 *
 * FooFighter.js — Util module
 *
 * Convenience utility functions for Fun and Profit™
 */

;(function( FooFighter ){

"use strict";

function guid () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function randInRange (min, max) {
    return Math.random() * (max - min) + min;
}

function isUndefined ( val ) {
    return typeof val === 'undefined';
}

FooFighter.Util = {
    guid: guid,
    randInRange: randInRange,
    isUndefined: isUndefined
};

})(FooFighter);
