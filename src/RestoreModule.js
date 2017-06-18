'use strict';
/**
 * @class RestoreModule
 * @classdesc object with restore function which rolls back changes and replaces passed module with original module in cache and the previousModule which was in the cache
 */
class RestoreModule {
    /**
     *
     * @param {String}modulePath
     * @param {Module}previousModule
     */
    constructor(modulePath, previousModule){
        this.modulePath = modulePath;
        this.prevModule = previousModule;
    }

    /**
     * Rolls back the changes
     */
    restore(){
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
    getPreviousModule(){
        return this.prevModule;
    }
}

module.exports = RestoreModule;
