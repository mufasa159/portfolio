# A Minimalist Portfolio

A configurable minimalist portfolio website for people who want to showcase multiple different types of projects.

Built by [@mufasa159](https://github.com/mufasa159) with performance in mind.

## Table of Contents
1. [Features](#1-features)
2. [Performance](#2-performance)
3. [Configuration](#3-configuration)
    1. [Website Information](#31-website-information)
    2. [Identity](#32-identity)
    2. [Content](#33-content)
    3. [SEO](#34-seo)
    4. [Appearance](#35-appearance)
4. [Data](#4-data)
    1. [JSON Files](#41-json-files)
    2. [Components](#42-components)
        1. [Projects](#421-projects)
        2. [Blog](#422-blog)
        3. [Gallery](#423-gallery)
        4. [Cards](#424-cards)
        5. [Showcase](#425-showcase)

## 1. Features
work in progress...


## 2. Performance
work in progress...


## 3. Configuration

### 3.1 &nbsp;Website Information
The `index.html` file contains some hardcoded data which you'll need to modify to your preference.

1. Page title
2. Meta tags for SEO
3. Copyright notice

The locations of the above items in the `index.html` file have been highlighted with comments.


### 3.2 &nbsp;Identity
The icons of the website are located in `/assets` directory. Replace them with your own icons and images. Make sure to keep the same filename with `.webp` and `.ico` extensions.

Note: if you have `jpg`, `png`, `heic` or any other file types, convert them to `webp` and `ico` files for better performance.


### 3.3 &nbsp;Content
All the content of the portfolio are stored in `/data` directory. [Section 4](#4-data) has more information on data model of each JSON file.

| Filepath | Content |
| - | - |
| `/data/home.json` | Homepage introduction sentences |  
| `/data/portfolio.json` | Portfolio content |  
| `/data/routers.json` | Route mapping of blog articles if you choose to include any. If you are not adding any blog articles to your portfolio, keep this file empty. |

For the following directories, it's not required to keep your data in the exact locations as listed. You can create subdirectories and organize your files as you see fit. Just make sure to update the filepaths in the JSON files.

| Filepath | Content |
| - | - |
| `/data/blog` | Blog articles as HTML files |
| `/data/gallery` | Full-sized gallery images |
| `/data/gallery/thumbnails` | Thumbnails of gallery images |

### 3.4 &nbsp;SEO
To improve your site's visibility to search engines, modify the following files to help web crawlers find and scan your portfolio website.
1. `sitemap.xml` - [Learn more](https://developers.google.com/search/docs/advanced/sitemaps/overview)
2. `robots.txt` - [Learn more](https://developers.google.com/search/docs/advanced/robots/intro)

### 3.5 &nbsp;Appearance
You can modify the color scheme of the website by changing the CSS variables in the `/css/variables.css` file.

## 4. Data

### 4.1 &nbsp;JSON Files
The object in `/data/home.json` file contains the following fields:  

```typescript
greeting: string,    // max 50 chars, HTML tags allowed
introduction: {
    line_1: string,  // max 90 chars, HTML tags allowed
    line_2: string   // max 90 chars, HTML tags allowed
}
```
The `/data/portfolio.json` file contains an **array** of the following objects:
```typescript
{
    title: string, 
    component: 'blog' | 'gallery' | 'projects' | 'cards' | 'showcase',
    items: any[]
}
```

See [section 4.2](#42-components) for the data model of `items` array for each component.

### 4.2 &nbsp;Components
#### 4.2.1 &nbsp;Projects
```typescript
name: string
url: string
description: string
```

#### 4.2.2 &nbsp;Blog
```typescript
id: string       // used as query param in the URL, must be unique
heading: string  // title of the blog article
```
For each blog article, create an HTML file in the `/data/blog` directory (or wherever you choose to store your blog articles). Then create an entry in `/data/routers.json` file mapping the `id` to the filepath of the HTML file. For example:

If your blog article entry in `/data/portfolio.json` is
```typescript
id: "my-first-blog",
heading: "My First Blog Article"
```
and the HTML file is stored in `/data/blog/my-first-blog.html`.
Then the entry in `/data/routers.json` should be:
```json
{
    "my-first-blog": "/data/blog/my-first-blog.html"
}
```
For the HTML file, make sure to only include the content of the blog article. The `<head>` and `<body>` tags are already included in the `index.html` file and is not required in the blog article HTML files.

#### 4.2.3 &nbsp;Gallery
```typescript
id: string                // must be unique
alt: string               // alt text for the image
image: string             // filepath of the full-sized image
thumbnail: string         // filepath of the thumbnail
description: string = ''  // optional, HTML tags allowed
```

#### 4.2.4 &nbsp;Cards
```typescript
alt: string
image: string
name: string
url: string
```

#### 4.2.5 &nbsp;Showcase
```typescript
alt: string
image: string
name: string
url: string
```
