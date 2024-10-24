const sample = require('lodash.sample');
const argv = require('minimist')(process.argv.slice(2));
const isArray = require('lodash.isarray');

const customLaunchers = {
  bs_mavericks_chrome_44: {
    base: 'BrowserStack',
    device: null,
    os: 'OS X',
    browser_version: '44.0',
    browser: 'chrome',
    os_version: 'Mavericks',
  },
  /* Removed Firefox 40 because it has a max nesting depth of 200 which breaks tests */
  // bs_yosemite_firefox_40: {
  //   base: 'BrowserStack',
  //   device: null,
  //   os: 'OS X',
  //   browser_version: '40.0',
  //   browser: 'firefox',
  //   os_version: 'Yosemite',
  // },
  /* Removed Safari 8 because it fails for a reason unrelated to the patch () */
  // bs_yosemite_safari_8: {
  //   base: 'BrowserStack',
  //   device: null,
  //   os: 'OS X',
  //   browser_version: '8.0',
  //   browser: 'safari',
  //   os_version: 'Yosemite',
  // },
  bs_sierra_safari_10: {
    base: 'BrowserStack',
    device: null,
    os: 'OS X',
    browser_version: '10.0',
    browser: 'safari',
    os_version: 'Sierra',
  },
  bs_sierra_safari_12: {
    base: 'BrowserStack',
    device: null,
    os: 'OS X',
    browser_version: '12.0',
    browser: 'safari',
    os_version: 'Mojave',
  },
  /* Removed Opera 31 since it's deprecated and unrelated to the fix */
  // bs_win81_opera_31: {
  //   base: 'BrowserStack',
  //   device: null,
  //   os: 'Windows',
  //   browser_version: '31',
  //   browser: 'opera',
  //   os_version: '8.1',
  // },
  bs_win8_ie_10: {
    base: 'BrowserStack',
    browser: 'ie',
    browser_version: '10.0',
    os: 'Windows',
    os_version: '8',
  },
  bs_win81_ie_11: {
    base: 'BrowserStack',
    browser: 'ie',
    browser_version: '11.0',
    os: 'Windows',
    os_version: '8.1',
  },
  bs_win10_edge_13: {
    base: 'BrowserStack',
    device: null,
    os: 'Windows',
    browser_version: '13.0',
    browser: 'edge',
    os_version: '10',
  },
  bs_win10_edge_14: {
    base: 'BrowserStack',
    device: null,
    os: 'Windows',
    browser_version: '14.0',
    browser: 'edge',
    os_version: '10',
  },
  bs_win10_edge_17: {
    base: 'BrowserStack',
    device: null,
    os: 'Windows',
    browser_version: '17.0',
    browser: 'edge',
    os_version: '10',
  },
  bs_win10_edge_18: {
    base: 'BrowserStack',
    device: null,
    os: 'Windows',
    browser_version: '18.0',
    browser: 'edge',
    os_version: '10',
  },
  /* Removed Firefox 20, 15, 46, 52, 60, 64 because they have max nesting depth of 200 which break tests */
  // bs_win7_firefox_20: {
  //   base: 'BrowserStack',
  //   device: null,
  //   os: 'Windows',
  //   browser_version: '20.0',
  //   browser: 'firefox',
  //   os_version: '7',
  // },
  // bs_win7_firefox_15: {
  //   base: 'BrowserStack',
  //   device: null,
  //   os: 'Windows',
  //   browser_version: '15.0',
  //   browser: 'firefox',
  //   os_version: '7',
  // },
  // bs_win10_firefox_46: {
  //   base: 'BrowserStack',
  //   device: null,
  //   os: 'Windows',
  //   browser_version: '46.0',
  //   browser: 'firefox',
  //   os_version: '10',
  // },
  // bs_win10_firefox_52: {
  //   base: 'BrowserStack',
  //   device: null,
  //   os: 'Windows',
  //   browser_version: '52.0',
  //   browser: 'firefox',
  //   os_version: '10',
  // },
  // bs_win10_firefox_60: {
  //   base: 'BrowserStack',
  //   device: null,
  //   os: 'Windows',
  //   browser_version: '60.0',
  //   browser: 'firefox',
  //   os_version: '10',
  // },
  // bs_win10_firefox_64: {
  //   base: 'BrowserStack',
  //   device: null,
  //   os: 'Windows',
  //   browser_version: '64.0',
  //   browser: 'firefox',
  //   os_version: '10',
  // },
  bs_win81_chrome_22: {
    base: 'BrowserStack',
    device: null,
    os: 'Windows',
    browser_version: '22.0',
    browser: 'chrome',
    os_version: '8.1',
  },
  bs_win10_chrome_50: {
    base: 'BrowserStack',
    device: null,
    os: 'Windows',
    browser_version: '50.0',
    browser: 'chrome',
    os_version: '10',
  },
  bs_win10_chrome_57: {
    base: 'BrowserStack',
    device: null,
    os: 'Windows',
    browser_version: '57.0',
    browser: 'chrome',
    os_version: '10',
  },
  bs_win10_chrome_59: {
    base: 'BrowserStack',
    device: null,
    os: 'Windows',
    browser_version: '59.0',
    browser: 'chrome',
    os_version: '10',
  },
  bs_win10_chrome_66: {
    base: 'BrowserStack',
    device: null,
    os: 'Windows',
    browser_version: '66.0',
    browser: 'chrome',
    os_version: '10',
  },
  bs_win10_chrome_69: {
    base: 'BrowserStack',
    device: null,
    os: 'Windows',
    browser_version: '69.0',
    browser: 'chrome',
    os_version: '10',
  },
  bs_win10_chrome_71: {
    base: 'BrowserStack',
    device: null,
    os: 'Windows',
    browser_version: '71.0',
    browser: 'chrome',
    os_version: '10',
  }, //,
  //bs_win10_chrome_77: {
  //  base: 'BrowserStack',
  //  device: null,
  //  os: 'Windows',
  //  browser_version: '77.0',
  //  browser: 'chrome',
  //  os_version: '10',
  //}
};

const getAllBrowsers = () => Object.keys(customLaunchers);
const getRandomBrowser = () => sample(getAllBrowsers());

/**
 * Environment variables are passed into the script and the depth of testing
 * is affected accordginly.
 *
 * - Whenever on a PR we only want to probe test with Firefox
 * - Whenever we are on the most recent node version on Travis we test via BrowserStack
 * - If none of the prior mentioned holds we assume to be running local and respect the passed
 *   in borwsers argv
 */
const shouldProbeOnly = argv.shouldProbeOnly === 'true';
const shouldTestOnBrowserStack = argv.shouldTestOnBrowserStack === 'true';
const defaultBrowsers = ['Firefox'];
const argvBrowsers = isArray(argv.browsers)
  ? argv.browsers.split(' ')
  : defaultBrowsers;
const browsers = shouldTestOnBrowserStack
  ? shouldProbeOnly
    ? defaultBrowsers
    : getAllBrowsers()
  : argvBrowsers;

module.exports = {
  customLaunchers,
  browsers,
  getRandomBrowser,
};
