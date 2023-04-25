module.exports = {
  /**
   * Returns some attributes based on whether the link is active or
   * a parent of an active item
   *
   * @param {String} itemUrl is the link in question
   * @param {String} pageUrl is the page context
   * @returns {String} is the attributes or empty
   */
  getLinkActiveState(itemUrl, pageUrl) {
    let response = "";

    if (itemUrl === pageUrl) {
      response = ' aria-current="page" ';
    }

    if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
      response += ' class="active" ';
    }

    return response;
  },

  getActiveClass(itemUrl, pageUrl) {
    let response = "";

    if (itemUrl === pageUrl) {
      response = ' class="active" ';
    }

    return response;
  },

  getOpenAttr(itemUrl, pageUrl) {
    let response = "";

    if (itemUrl === pageUrl) {
      response = " open ";
    }

    if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
      response += ' class="current" ';
    }

    return response;
  },

  getSidenav(itemUrl, pageUrl) {
    let response = "";

    if (itemUrl === pageUrl) {
      response = ' class="active sidenav" ';
    }

    if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
      response += ' class="active sidenav" ';
    }

    return response;
  },

  getURL(itemUrl, pageUrl) {
    let response = "";

    if (itemUrl === pageUrl) {
      response = pageUrl;
    }

    return response;
  }
};
