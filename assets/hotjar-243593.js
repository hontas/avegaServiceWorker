window.hjSiteSettings = window.hjSiteSettings || {"testers_widgets":[],"polls":[],"recording_capture_keystrokes":true,"site_id":243593,"deferred_page_contents":[],"record_targeting_rules":[],"surveys":[],"heatmaps":[{"targeting":[{"negate":false,"pattern":"http:\/\/www.avegagroup.se\/kundcase\/","match_operation":"simple","component":"url"}],"created_epoch_time":1483978346,"id":1044096,"selector_version":2},{"targeting":[{"negate":false,"pattern":"http:\/\/www.avegagroup.se\/jobba-har\/","match_operation":"simple","component":"url"}],"created_epoch_time":1483978327,"id":1044094,"selector_version":2}],"feedback_widgets":[],"forms":[],"record":false,"r":1.0,"state_change_listen_mode":"manual"};

window.hjBootstrap = window.hjBootstrap || function (scriptUrl) {
    var b = function () {}, d = document, h = d.head || d.getElementsByTagName('head')[0], s, v, c, ct;

    if (!d.addEventListener) {
        return;
    }

    s = d.createElement('script');
    s.src = scriptUrl;
    h.appendChild(s);

    ct = [
        'iframe#_hjRemoteVarsFrame {',
        'display: none !important; width: 1px !important; height: 1px !important; ' +
        'opacity: 0 !important; pointer-events: none !important;',
        '}'
    ];
    c = document.createElement('style');
    c.type = 'text/css';
    if (c.styleSheet) {
        c.styleSheet.cssText = ct.join('');
    } else {
        c.appendChild(d.createTextNode(ct.join('')));
    }
    h.appendChild(c);

    v = d.createElement('iframe');
    v.style.cssText = ct[1];
    v.name = '_hjRemoteVarsFrame';
    v.title = 'Hotjar Remote Vars Frame';
    v.id = '_hjRemoteVarsFrame';
    v.src = 'https://' + (window._hjSettings.varsHost || 'vars.hotjar.com') + '/rcj-b2c1bce0a548059f409c021a46ea2224.html';
    v.onload = function () {
        b.varsLoaded = true;
        if ((typeof hj != 'undefined') && hj.event) {
            hj.event.signal('varsLoaded');
        }
    };
    b.varsJar = v;

    if (d.body) {
        d.body.appendChild(v);
    } else {
        d.addEventListener('DOMContentLoaded', function () {
            d.body.appendChild(v);
        });
    }
    window.hjBootstrap = b;
};


hjBootstrap('https://script.hotjar.com/modules-c32705eea471a3b86fa01dc951b20d98.js');