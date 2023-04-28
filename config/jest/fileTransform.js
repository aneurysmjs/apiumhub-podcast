const path = require('node:path');

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/tutorial-webpack.html

module.exports = {
  /**
   * @see https://jestjs.io/docs/28.x/upgrading-to-jest28#transformer
   */
  process(src, filename) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(filename))}`,
    };
  },
};
