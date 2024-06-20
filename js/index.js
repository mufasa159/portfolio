const q = new URLSearchParams(window.location.search);
const article = q.get('article');

if (article) {
    fetch('/data/routers.json', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then(response => response.json())
        .then(data => {
            const articleUrl = data[article];
            if (articleUrl) {
                load_css('components/article');
                fetch(articleUrl, { method: 'GET', headers: { 'Content-Type': 'text/html' } })
                    .then(response => response.text())
                    .then(content => {
                        document.getElementById('main').innerHTML = `<div class='article'><a href='/'>&#8592; Return Home</a>${content}</div>`;
                    })
                    .catch(() => {
                        document.getElementById('main').innerHTML = '<h1>Error</h1><p>Failed to load content.</p>';
                        console.error('failed to load article');
                    });
            } else {
                document.getElementById('main').innerHTML = '<h1>404</h1><p>Content Not Found</p>';
                console.error('invalid search query in url');
            }
        });
} else {
    load_js('render');
}