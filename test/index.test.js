'use strict';
const {expect} = require('chai');

const initialTestModuleState = require('./__testModule');
const testModulePath = require.resolve('./__testModule');
const moquire = require('./../src/index');
const RestoreModule = require('./../src/RestoreModule');


describe('index', function () {

    describe('removeModuleFromCache', function () {
        it('should remove loaded module from cache', function () {
            const testModule = require('./__testModule');
            expect(require.cache).to.hasOwnProperty(testModulePath);
            expect(require.cache[testModulePath].exports).to.equal(initialTestModuleState);
            moquire.removeModuleFromCache('./__testModule');
            expect(require.cache).to.not.hasOwnProperty(testModulePath);
        })
    });

    describe('replaceModuleInCache', function () {
        beforeEach(function () {
            delete require.cache[testModulePath];
        });

        it('should return instance of RestoreModule', function () {
            const resotreObj = moquire.replaceModuleInCache('./__testModule', {});
            expect(resotreObj).to.be.instanceOf(RestoreModule);
        });

        it('should replace loaded module in caches with mock', function () {
            require('./__testModule');
            const mock = {
                adventure: 'time'
            };

            moquire.replaceModuleInCache('./__testModule', mock);

            const module = require('./__testModule');
            expect(module).to.equal(mock);
        });

        it('should replace not loaded module in caches with mock', function () {
            const mock = {
                adventure: 'time'
            };

            moquire.replaceModuleInCache('./__testModule', mock);

            const module = require('./__testModule');
            expect(module).to.equal(mock);
        });
    });

    describe('clearModulesCache', function () {
        it('should remove all modules from cache', function () {
            require('./../src/index');
            require('./../src/RestoreModule');
            require('./__testModule');

            moquire.clearModulesCache();
            expect(require.cache).to.be.empty;
        });
    });

});
