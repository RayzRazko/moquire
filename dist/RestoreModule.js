'use strict';
/**
 * @class RestoreModule
 * @classdesc object with restore function which rolls back changes and replaces passed module with original module in cache and the previousModule which was in the cache
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RestoreModule = function () {
    /**
     *
     * @param {String}modulePath
     * @param {Module}previousModule
     */
    function RestoreModule(modulePath, previousModule) {
        _classCallCheck(this, RestoreModule);

        this.modulePath = modulePath;
        this.prevModule = previousModule;
    }

    /**
     * Rolls back the changes
     */


    _createClass(RestoreModule, [{
        key: 'restore',
        value: function restore() {
            if (this.prevModule) {
                require.cache[this.modulePath] = this.prevModule;
            } else {
                delete require.cache[this.modulePath];
            }
        }

        /**
         * Returns the previous module if it exists
         * @returns {Module} - the previous module which was in the cache
         */

    }, {
        key: 'getPreviousModule',
        value: function getPreviousModule() {
            return this.prevModule;
        }
    }]);

    return RestoreModule;
}();

module.exports = RestoreModule;