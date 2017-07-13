# moquire
Moquire is a node.js module for mocking modules.
Native modules such as 'fs', 'http' etc cannot be mocked with this module.

## Usage
Consider following directory structure:
```
/src
  /utils
     foo.js
  bar.js
/test
  /utils
     foo.test.js
  bar.test.js
```
`bar.js` contains dependency for `foo.js` and installed `lodash` modules:
```
const foo = require('./utils/foo');
const lodash = require('lodash');
...
```

In order to load `bar.js` with mocked `foo` module in `bar.test.js` you can do:
```
//define mocks
const fooMock = {};
const lodashMock = {};

//remove previously loaded bar module in order
//to next require invocation load module from scratch
moquire.removeModuleFromCache('./../src/bar');

//replace needed module with mock
const fooRestore = moquire.replaceModuleInCache('./../src/utils/foo', fooMock);
const lodashMock = moquire.replaceModuleInCache('lodash', lodashMock);

//require bar module
const bar = require('./../src/bar');

//do the tests

//restore foo module
fooRestore.restore();
lodashMock.restore();

//remove bar module with mock from cache
moquire.removeModuleFromCache('./../src/bar');
```

