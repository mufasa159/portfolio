let html = {};

const show = async (div, target) => {
    target.classList.add('clicked');
    document.getElementById('portfolio-container').innerHTML = html[div];
    document.querySelectorAll('#portfolio-navigation button').forEach(item => {
        if (item !== target) item.classList.remove('clicked');
    });
};

const image = (id, thumbnail, src, alt, description = '') => `
    <button class='photo' id='photo_${id}' onclick="photo('${id}', '${src}', '${alt}', '${description}')">
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
    const endpoints = ['./data/home.json', './data/portfolio.json'];
    const data = await Promise.all(endpoints.map(async (url) => (await fetch(url)).json()));
    const { greeting, introduction: { line_1, line_2 } } = data[0];
    if ([greeting, line_1, line_2].some(text => text && text.length > 90)) {
        document.getElementById('main').innerHTML += `
            <h1>Content Too Long</h1>
            <p>Your introduction fucks up the minimalist vibe.</p>
        `;
        return;
    }

    if (greeting) document.getElementById('greeting').innerHTML = greeting;
    if (line_1) document.getElementById('intro-1').innerHTML = line_1;
    if (line_2) document.getElementById('intro-2').innerHTML = line_2;

    if (data[1].length) {
        const css_loaded = new Set();
        const js_loaded = new Set();

        data[1].forEach((portfolio, index) => {
            const component = portfolio.component.toLowerCase();
            const id = `${index}_${component}`;
            let attach_now = false;

            if (data[1].length > 1) {
                const button = document.createElement('button');
                button.textContent = portfolio.title;
                button.addEventListener('click', () => show(id, button));
                document.getElementById('portfolio-navigation').appendChild(button);
            } else {
                attach_now = true;
            }

            if (!css_loaded.has(component)) {
                load_css(`components/${component}`);
                css_loaded.add(component);
            }

            const createHtml = (items, itemHandler) => items.map(itemHandler).join('');

            if (component === 'projects') {
                html[id] = `<ul class='projects' id='${id}'>${createHtml(portfolio.items, (x) => {
                    if (![x.name, x.url, x.description].every(Boolean)) return error();
                    return `<li><a href="${x.url}" target="_blank">${x.name}</a>${x.description}</li>`;
                })}</ul>`;

            } else if (component === 'blog') {
                html[id] = `<div class='blog' id='${id}'>${createHtml(portfolio.items, (x) => {
                    if (![x.id, x.heading].every(Boolean)) return error();
                    return `<a href='?article=${x.id}'>${x.heading}</a>`;
                })}</div>`;

            } else if (component === 'gallery') {
                if (!js_loaded.has(component)) {
                    load_js('gallery');
                    js_loaded.add(component);
                }
                html[id] = `<div class='gallery' id='${id}'>${createHtml(portfolio.items, (x) => {
                    if (![x.id, x.thumbnail, x.image, x.alt].every(Boolean)) return error();
                    return image(x.id, x.thumbnail, x.image, x.alt, x.description);
                })}</div>`;

            } else if (component === 'cards') {
                html[id] = `<div class='cards' id='${id}'>${createHtml(portfolio.items, (x) => {
                    if (![x.alt, x.image, x.name, x.url].every(Boolean)) return error();
                    return `<a class='card' href='${x.url}' target='_blank'><img src='${x.image}' alt='${x.alt}' />
                    <p>${x.name.length > 25 ? '<b style="color:red">Error: card title too long</b>' : x.name}</p></a>`;
                })}</div>`;

            } else if (component === 'showcase') {
                html[id] = `<div class='showcase' id='${id}'>${createHtml(portfolio.items, (x) => {
                    if (![x.alt, x.image, x.name, x.url].every(Boolean)) return error();
                    return `<a class='case' href='${x.url}' target='_blank'><img src='${x.image}' alt='${x.alt}' />
                    <p>${x.name.length > 25 ? '<b style="color:red">Error: case title too long</b>' : x.name}</p></a>`;
                })}</div>`;
            }

            if (attach_now) {
                document.getElementById('portfolio-navigation').style.margin = '20px 0px';
                document.getElementById('portfolio-container').innerHTML = html[id];
                return;
            }
        });
    }
}

render();