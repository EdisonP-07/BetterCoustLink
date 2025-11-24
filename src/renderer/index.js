if (typeof window !== 'undefined' && window.location) {
    var query = new URLSearchParams(window.location.search.substring(1));
    console.log('HEY');
    var view = query.get('view') || 'app';
    if (view === 'app') {
        Promise.resolve().then(function () { return require('./App'); });
    }
    else if (view === 'lobbies') {
        Promise.resolve().then(function () { return require('./LobbyBrowser/LobbyBrowserContainer'); });
    }
    else {
        Promise.resolve().then(function () { return require('./Overlay'); });
    }
}
