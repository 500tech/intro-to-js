function trimAllLines(str) {
  if (!str) return '';
  return str.trim().replace(/^\s+/gm, '');
}

module.exports = function destructTest(object) {
  /**
   * object is defined like so:
   * {
   *   id: Number,
   *   email: String,
   *   personalInfo: {
   *       name: String,
   *       address: {
   *           line1: String,
   *           line2: Optional<String>,
   *           city: String,
   *           state: String
   *       }
   *   }
   *  }
   */

  /**
   * Implement 'formatUser' using destructuring that for this input:
   * {
   *   id: 101,
   *   email: 'jack@dev.com',
   *   personalInfo: {
   *       name: 'Jack',
   *       address: {
   *           line1: 'westwish st',
   *           line2: 'washmasher',
   *           city: 'wallas',
   *           state: 'WX'
   *       }
   *   }
   * }
   * returns `
   * User 101 (jack@dev.com)
   * Jack
   * westwish st (washmasher),
   * wallas,
   * WX
   * `
   *
   * If no "line2" was provided, the address line changes to "westwish st (unspecified)"
   */
  function formatUser() {}

  console.log(trimAllLines(formatUser(object)));
};
