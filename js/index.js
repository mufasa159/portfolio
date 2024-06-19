const q = new URLSearchParams(window.location.search);
const component = q.get('c');
if (q.get('article')) {
    fetch(`/data/routers.json`, {method: 'GET', headers: {'Content-Type': 'application/json'}})
    .then(response => response.json())
    .then(d => {
        if (d[q.get('article')] !== undefined) {
            load_css('components/article');
            try {
                fetch(`${d[q.get('article')]}`, {method: 'GET', headers: {'Content-Type': 'text/html'}})
                .then(response => response.text())
                .then(d => {
                    document.getElementById('main').innerHTML = `<div class='article'><a href='/'>&#8592; Return Home</a>${d}</div>`;
                });
            } catch (e) {
                document.getElementById('main').innerHTML = '<h1>Error</h1><p>Failed to load content.</p>';
                console.error('failed to load article');
            }
        } else if (component === 'image' && q.get('article') !== null && d[q.get('article')] !== undefined) {
            // do stuff
        } else {
            document.getElementById('main').innerHTML = '<h1>404</h1><p>Content Not Found</p>';
            console.error('invalid search query in url');
        }
    })
} else {
    load_js('render');
}