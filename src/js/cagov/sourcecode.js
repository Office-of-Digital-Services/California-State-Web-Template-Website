/* -----------------------------------------
   SOURCE CODE
   /source/js/cagov/sourcecode.js
----------------------------------------- */

// Displaying HTML Source code in HTML Page

var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'/]/g, function (s) {
    return entityMap[s];
  });
}

function copyCode(btnElem) {
  var codeblock = btnElem.previousElementSibling;
  if (codeblock) {
    // copy the text
    if (codeblock.tagName.toLowerCase() == "pre") {
      navigator.clipboard.writeText(codeblock.querySelector("code").innerText);
    } else {
      navigator.clipboard.writeText(codeblock.value);
    }
    // select the text
    var range = document.createRange();
    range.selectNode(codeblock);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    // replace the button icon
    //btnElem.querySelector("span").classList.remove("ca-gov-icon-copy");
    //btnElem.querySelector("span").classList.add("ca-gov-icon-check-mark");
    btnElem.innerHTML =
      '<span class="ca-gov-icon-check-mark"></span> Code copied';
  }
}

window.addEventListener("load", function () {
  var codeblock = document.querySelectorAll("pre code, textarea.sourcecode");

  if (codeblock.length) {
    for (var i = 0, len = codeblock.length; i < len; i++) {
      var dom = codeblock[i];
      if (dom.tagName.toLowerCase() == "code") {
        var html = dom.innerHTML;
        html = escapeHtml(html);
        dom.innerHTML = html;
      }
      // Create a 'copy code' button, insert it after the <pre> tag
      var newDiv = document.createElement("button");
      newDiv.onclick = function () {
        copyCode(this);
      };
      newDiv.classList.add("btn", "btn-outline-primary");
      newDiv.innerHTML = "<span class='ca-gov-icon-copy'></span> Copy code";
      if (dom.tagName.toLowerCase() == "code") {
        dom.parentElement.after(newDiv);
      } else {
        dom.after(newDiv);
      }
    }
  }
});
