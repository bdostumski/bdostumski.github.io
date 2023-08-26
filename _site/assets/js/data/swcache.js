const resource = [
    /* --- CSS --- */
    '/assets/css/style.css',

    /* --- PWA --- */
    '/app.js',
    '/sw.js',

    /* --- HTML --- */
    '/index.html',
    '/404.html',

    
        '/categories/',
    
        '/tags/',
    
        '/archives/',
    
        '/about/',
    

    /* --- Favicons & compressed JS --- */
    
    
        '/assets/img/favicons/hide-alien_dark.jpg',
        '/assets/img/favicons/hide-android-chrome-192x192.png',
        '/assets/img/favicons/hide-android-chrome-512x512.png',
        '/assets/img/favicons/hide-apple-touch-icon.png',
        '/assets/img/favicons/hide-favicon-16x16.png',
        '/assets/img/favicons/hide-favicon-32x32.png',
        '/assets/img/favicons/hide-favicon.ico',
        '/assets/img/favicons/hide-mstile-150x150.png',
        '/assets/img/favicons/old/android-chrome-192x192.png',
        '/assets/img/favicons/old/android-chrome-512x512.png',
        '/assets/img/favicons/old/apple-touch-icon.png',
        '/assets/img/favicons/old/favicon-16x16.png',
        '/assets/img/favicons/old/favicon-32x32.png',
        '/assets/img/favicons/old/favicon.ico',
        '/assets/img/favicons/old/mstile-150x150.png'
];

/* The request url with below domain will be cached */
const allowedDomains = [
    

    'localhost:4000',

    
        'bdostumski.github.io',
    

    'fonts.gstatic.com',
    'fonts.googleapis.com',
    'cdn.jsdelivr.net',
    'polyfill.io'
];

/* Requests that include the following path will be banned */
const denyUrls = [];

