/* -----------------------------------------
   SOURCE CODE
   /source/js/cagov/sourcecode.js
----------------------------------------- */

// Displaying HTML Source code in HTML Page

const entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};

const escapeHtml = string =>
  String(string).replace(/[&<>"'/]/g, s => entityMap[s]);

function copyCode(btnElem) {
  const codeblock = btnElem.previousElementSibling;
  if (codeblock) {
    // copy the text
    if (codeblock.tagName.toLowerCase() == "pre") {
      navigator.clipboard.writeText(codeblock.querySelector("code").innerText);
    } else {
      navigator.clipboard.writeText(codeblock.value);
    }
    // select the text
    const range = document.createRange();
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

window.addEventListener("load", () => {
  const codeblock = document.querySelectorAll("pre code, textarea.sourcecode");

  if (codeblock.length) {
    for (let i = 0, len = codeblock.length; i < len; i++) {
      const dom = codeblock[i];
      if (dom.tagName.toLowerCase() == "code") {
        let html = dom.innerHTML;
        html = escapeHtml(html);
        dom.innerHTML = html;
      }
      // Create a 'copy code' button, insert it after the <pre> tag
      const newDiv = document.createElement("button");
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
