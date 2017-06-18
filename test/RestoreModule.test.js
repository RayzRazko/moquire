'use strict';
const {expect} = require('chai');
const RestoreModule = require('./../src/RestoreModule');

describe('RestoreModule', function () {

   describe('getPreviousModule', function () {

       it('should return module passed to constructor', function () {
           const restorer = new RestoreModule(__filename, module);
           expect(restorer.getPreviousModule()).to.equal(module);
       });

   });


   describe('restore', function () {

       let testModule;
       const testModulePath = require.resolve('./__testModule');

       beforeEach(function () {
           delete require.cache[testModulePath];
           require('./__testModule');
           testModule = require.cache[testModulePath];
       });

       it('should replace module in cache by previous module', function () {
          const restorer = new RestoreModule(testModulePath, testModule);
          require.cache[testModulePath] = {};
          restorer.restore();
          expect(require.cache[testModulePath]).to.equal(testModule);
       });

       it('should clear cache from module if previous state wasn\'t passed', function () {
           delete require.cache[testModulePath];
           const restorer = new RestoreModule(testModulePath);
           require('./__testModule');
           expect(require.cache).to.hasOwnProperty(testModulePath);
           restorer.restore();
           expect(require.cache).to.not.hasOwnProperty(testModulePath);
       });
   });
});
