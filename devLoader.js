//devLoader.js
/*
using async XHR or fetch works sometimes and is different than actually inlining html
replaceWith polyfill
https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
does ${script.src} need to ne html escaped ? 
*/
// convert to a frozen array
const scripts = [...document.getElementsByTagName(`script`)];

scripts.forEach(function (script) {
  if (!script.hasAttribute(`data-inline`)) {
    return;
  }
  const request = new XMLHttpRequest();
  request.overrideMimeType("text/plain");
  request.open('GET', script.src, false);
  try {
    request.send(null);
  } catch (error) {
    console.log(error, `problem loading ${script.src}`);
  }
  
  let htmlString;
  if (request.status === 200) {
    htmlString = request.responseText;
  } else {
    htmlString = `<strong>problem loading ${script.src}</strong>`;
  }
  
  // a way to parse a html string and add it inline in the DOM
  // without container element like <div></div>
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  
  script.replaceWith(document.importNode(template.content, true));
 
  

});

//fetch(script.src).
//then(function(response) {
  //return response.text();
//}).then(function (htmlString) {
  //const template = document.createElement('template');
  //template.innerHTML = htmlString;
  //
  //script.replaceWith(document.importNode(template.content, true));
//});
//}