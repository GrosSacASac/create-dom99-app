//inlineHTMLRuntime.js
/*
using async XHR or fetch works sometimes and is different than actually inlining html
replaceWith polyfill
https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
does ${script.src} need to ne html escaped ? 
*/
const typeTextHtml = `text/html`;
const map = {};
const importHTML = function (startNode) {
  // convert to a frozen array
  const scripts = Array.from(startNode.querySelectorAll(`script`));

  scripts.forEach(function (script) {
    if (script.getAttribute(`type`) !== typeTextHtml) {
      return;
    }
    let clone;
    if (Object.prototype.hasOwnProperty.call(map, script.src)) {
      clone = map[script.src].cloneNode(true);
    } else {
      const request = new XMLHttpRequest();
      request.overrideMimeType("text/plain");
      request.open('GET', script.src, false);
      
      const errorMessage = `problem loading ${script.src}
        check if path is correct, and if file can be served`
      try {
        request.send(null);
      } catch (error) {
        console.error(error);
        throw Error(errorMessage);
      }
      
      if (request.status !== 200) {
        throw Error(errorMessage);
      }
      const htmlString = request.responseText;
      
      // a way to parse a html string and add it inline in the DOM
      // without container element like <div></div>
      const template = document.createElement('template');
      template.innerHTML = htmlString;
      clone = document.importNode(template.content, true);
      importHTML(clone);
      map[script.src] = clone.cloneNode(true);
    }
    
    script.replaceWith(clone);
  });
};

importHTML(document);
