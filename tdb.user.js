// ==UserScript==
// @name        TweetDeck Buttons
// @namespace   uk.lonm.tweetdeck.buttons
// @include     https://tweetdeck.twitter.com/*
// @version     1
// ==/UserScript==

var dark;
var light;

function doScroll(positive){
    var col = document.getElementsByClassName("js-column")[0];
    var colWidth = col.getBoundingClientRect().width;
    if(!positive) colWidth = 0 - colWidth;
    document.getElementById("container").scrollLeft += colWidth;
}

function toggleTheme(){
    if(light.disabled==dark.disabled){
        dark.disabled = true;
        light.disabled = false;
        return;
    }
    light.disabled=!light.disabled;
    dark.disabled=!dark.disabled;
}

function getLinks(){
    var links = document.getElementsByTagName('link');
    for(var i = 0; i < links.length; i++){
        if(!links[i].attributes.title){
            continue;
        }
        if(links[i].attributes.title.value==="dark"){
            dark = links[i];
        }
        else if(links[i].attributes.title.value==="light"){
            light = links[i];
        }
    }
}

function makeButton(offset, tip, action){
    var bp = document.createElement('button');
    bp.id = "scrollPositive";
    bp.style.position = "fixed";
    bp.style.top = "0px";
    bp.style.right = (50*offset)+"px";
    bp.style.width = "50px";
    bp.style.height = "30px";
    bp.style.background = bp.style.border = "transparent";
    bp.style.color = "white";
    bp.style.zIndex = "50";
    bp.innerText = tip;
    bp.addEventListener('click', action);
    return bp;
}

function makeStyle(){
    var style = document.createElement('style');
    style.innerHTML = "/* fonts */ html { font-family: Segoe UI; font-weight: 400; }  /* like */ .js-tweet-actions > li:nth-child(3), .tweet-detail-actions > li:nth-child(3) { display: none; } .without-tweet-drag-handles .tweet-detail-action-item { width: 33%; }  /* columns */ .js-app-columns, .is-wide-columns .app-columns { padding: 0px; } .js-column, .is-wide-columns .column { margin: 0px; } .gap-chirp{display:none;}  /* column headers */ h1 .attribution { opacity: 0; } header .sprite-drag-vertical { opacity: 0; } header .column-number { opacity: 0; } header i.icon-sliders { opacity: 0; } header:hover i.icon-sliders { opacity: 1; }  /** * Webkit Scrollbar styles */ .scroll-styled-v::-webkit-scrollbar-track { border-left: 1px solid transparent; } .scroll-styled-v::-webkit-scrollbar-thumb { border-radius: 0px; background-color: #222426; } .js-column:hover .scroll-styled-v::-webkit-scrollbar-thumb { background-color: #444; } .js-column:hover .scroll-styled-v::-webkit-scrollbar-thumb:hover { background-color: #888; } .scroll-styled-h::-webkit-scrollbar-thumb { border-radius: 0px; } .bg-r-light-gray { background-color: #444; }  /* sidebar */ .js-app-header, .app-navigator, .js-column-nav-menu-item, .app-search-fake { background-color: rgb(20,154,233); } .column-nav-link, .app-nav-link, .app-nav-tab, .app-search-fake  { color: #fff; } #column-navigator .js-header-action:after { color: transparent; } #column-navigator .txt-mute { color: transparent; height: 0px; } #column-navigator .nbfc { padding-top: 10px; } .app-navigator .nbfc { padding-top: 6px; } .app-search-fake { box-shadow: none; } .with-nav-border-t:before { border-top-color: transparent; } .app-title {display: none; }  /* small mode */ @media(max-width:400px){  .js-app-header, .app-navigator, .js-column-nav-menu-item, .app-search-fake { background-color: #2d2d2d; }  /* new tweet closed */ .is-condensed .app-content { left: 0px; } .is-condensed header.js-app-header, .is-condensed .js-app-content .js-drawer{ left: -40px; opacity: 0; transition: all 0.2s ease-out; } .is-condensed  header.js-app-header:hover, .is-condensed .js-app-content .js-drawer:hover{ left: 0px; opacity: 1; } /* new tweet open */ .is-condensed .app-content.is-open { left: 50px; } .hide-detail-view-inline.is-condensed header.js-app-header{ left: 0px; opacity: 1; } .is-condensed .js-app-content.is-open .js-drawer{ left: -270px; opacity: 1; } }";
    document.body.appendChild(style);
}

document.body.appendChild(makeButton(0, "⏩", function(){doScroll(true);}));
document.body.appendChild(makeButton(1, "⏪", function(){doScroll(false);}));
document.body.appendChild(makeButton(2, "✴️", function(){toggleTheme();}));

getLinks();
makeStyle();