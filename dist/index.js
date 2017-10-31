'use strict';

var path = require('path');
var Module = require('module');
var RestoreModule = require('./RestoreModule');

/**
 * @module
 * Contains utilities that helps in unit testing
 */

function getStack() {
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
        return stack;
    };

    var stack = void 0;
    try {
        throw new Error();
    } catch (err) {
        stack = err.stack;
    } finally {
        Error.prepareStackTrace = orig;
    }
    return stack;
}

/**
 * Returns the path to the module from which caller function were called.
 */
function getModulePathBasedOnParentModule(module) {
    var modulePath = module.indexOf('/') >= 0 || module.indexOf(path.sep) >= 0 ? path.join(path.dirname(getStack()[3].getFileName()), module) : module;
    return require.resolve(modulePath);
}

function createMockModule(path) {
    var resultModule = new Module(path);
    resultModule.filename = path;
    resultModule.loaded = true;
    resultModule.parent = module;
    return resultModule;
}

module.exports = {
    /**
     * Removes module from node cache. Next time module will be required, node will reload it.
     * NOTE!! Doesn't work with node native modules such as fs, path, etc
     * @param {string} module - module name or path to the module
     * @returns {boolean} - returns true if module were removed, false otherwise.
     * (NOTE! if module wasn't loaded by node before calling this function false will be returned since there is nothing to remove)
     */
    removeModuleFromCache: function removeModuleFromCache(module) {
        return delete require.cache[getModulePathBasedOnParentModule(module)];
    },


    /**
     * Replaces loaded module with passed module or places passed module into cache.
     * NOTE!! Doesn't work with node native modules such as fs, path, etc
     * @param {string} module - module name or path
     * @param {Object|Function} newModule - new module's object/function
     * @returns {RestoreModule} - object with restore function which rolls back changes and replaces passed module with original module in cache and the previousModule which was in the cache
     */
    replaceModuleInCache: function replaceModuleInCache(module, newModule) {
        var modulePath = getModulePathBasedOnParentModule(module);
        var prevModule = require.cache[modulePath];

        if (!prevModule) {
            require.cache[modulePath] = createMockModule(modulePath);
        }

        require.cache[modulePath].exports = newModule;
        return new RestoreModule(modulePath, prevModule);
    },


    /**
     * Clears node.js caches
     */
    clearModulesCache: function clearModulesCache() {
        Object.keys(require.cache).forEach(function (module) {
            return delete require.cache[module];
        });
    }
};