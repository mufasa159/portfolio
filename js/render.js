let html = {};

function show(div, target) {
    target.classList.add('clicked');
    document.getElementById('portfolio-container').innerHTML = html[div];
    document.querySelectorAll('#portfolio-navigation button').forEach(item =>
        item !== target && item.classList.remove('clicked')
    );
}

const list = (name, url, description) => `<li><a href="${url}" target="_blank">${name}</a>${description}</li>`;

const image = (id, thumbnail, src, alt, info = '', description = '') => `
    <button class='photo' onclick="photo('${id}', '${src}', '${alt}', '${info}', '${description}')">
        <img src='${thumbnail}' alt='${alt}' />
    </button>
`;

const error = () => `
    <div style="background-color:red;padding:5px 10px;margin:0;text-align:left;border-radius:5px;width:fit-content;">
        <p style="color:white;font-weight:500;font-size:16px;">
            Error: Missing required field(s) in JSON data
        </p>
    </div>
`;

async function render() {
    load_css('buttons');

    let endpoints = ['/data/home.json', '/data/portfolio.json']
    const data = await Promise.all(endpoints.map(async x => {
        const response = await fetch(x, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }));

    const { greeting, introduction: { line_1, line_2 } } = data[0];

    if (
        (greeting && greeting.length > 50) ||
        (line_1 && line_1.length > 90) ||
        (line_2 && line_2.length > 90)
    ) {
        document.getElementById('main').innerHTML += `
            <h1>Content Too Long</h1>
            <p>Your introduction fucks up the minimalist vibe.</p>
        `;
        return;
    }

    if (greeting) { document.getElementById('greeting').innerHTML = greeting; }
    if (line_1) { document.getElementById('intro-1').innerHTML = line_1; }
    if (line_2) { document.getElementById('intro-2').innerHTML = line_2; }

    if (data[1].length !== 0) {
        let css_loaded = {};

        data[1].map((portfolio, index) => {
            const component = portfolio.component.toLowerCase();
            const id = `${index}_${component}`;
            document.getElementById('portfolio-navigation').innerHTML += `
                <button onclick="show('${id}', this)">${portfolio.title}</button>
            `;

            if (css_loaded[component] === undefined) {
                load_css(`components/${component}`);
                css_loaded[component] = true;
            }

            if (component === 'projects') {
                html[id] = `<ul class='projects' id='${id}'>${portfolio.items.map(x => {
                    if (
                        x.name === undefined ||
                        x.url === undefined ||
                        x.description === undefined
                    ) {
                        return error();
                    }
                    return list(x.name, x.url, x.description);
                }).join('')}</ul>`;

            } else if (component === 'blog') {
                html[id] = `<div class='blog' id='${id}'>${portfolio.items.map(x => {
                    if (
                        x.id === undefined ||
                        x.heading === undefined
                    ) {
                        return error();
                    }
                    return `<a href='?article=${x.id}'>${x.heading}</a>`;
                }).join('')}</div>`;

            } else if (component === 'gallery') {
                load_js('gallery');
                html[id] = `<div class='gallery' id='${id}'>${portfolio.items.map(x => {
                    if (
                        x.id === undefined ||
                        x.thumbnail === undefined ||
                        x.image === undefined ||
                        x.alt === undefined
                    ) {
                        return error();
                    }
                    return image(x.id, x.thumbnail, x.image, x.alt, x.info, x.description);
                }).join('')}</div>`;
            }
        });
    }
}


render();
