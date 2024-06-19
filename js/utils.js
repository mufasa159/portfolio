function load_js(js) {
    document.head.appendChild(Object.assign(document.createElement('script'), { src: `/js/${js}.js`, defer: true }));
}
  
function load_css(css) {
    document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'stylesheet', href: `/css/${css}.css` }));
}