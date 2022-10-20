// Displaying HTML Source code in HTML Page

var entityMap = {
 "&": "&amp;",
 "<": "&lt;",
 ">": "&gt;",
 '"': '&quot;',
 "'": '&#39;',
 "/": '&#x2F;'
};

function escapeHtml(string) {
 return String(string).replace(/[&<>"'/]/g, function (s) {
  return entityMap[s];
 });
}

function copyCode(btnElem) {
 var codeblock = btnElem.previousElementSibling.querySelector("code");
 if (codeblock) {
  // copy the text
  navigator.clipboard.writeText(codeblock.innerText);
  // select the text
  var range = document.createRange();
  range.selectNode(codeblock);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  // replace the button icon
  btnElem.querySelector("span").classList.remove("ca-gov-icon-copy");
  btnElem.querySelector("span").classList.add("ca-gov-icon-check-mark");
 }
}

window.onload = function init() {
 var codeblock = document.querySelectorAll("pre code");

 if (codeblock.length) {
  for (var i = 0, len = codeblock.length; i < len; i++) {
   var dom = codeblock[i];
   var html = dom.innerHTML;
   html = escapeHtml(html);
   dom.innerHTML = html;
   // Create a 'copy code' button, insert it after the <pre> tag
   var newDiv = document.createElement("button");
   newDiv.onclick = function () { copyCode(this); };
   newDiv.classList.add("btn", "btn-outline-primary");
   newDiv.innerHTML = "<span class='ca-gov-icon-copy'></span> Copy code";
   dom.parentElement.after(newDiv);
  }
 }
};
