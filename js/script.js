'use strict';

//keyEvent
const search = document.querySelector('.left-navigation__search-input');

document.addEventListener('keydown', function (event) {
    if (document.activeElement === search) {
        event.stopPropagation();
    } else if (event.code == 'KeyS' && (event.shiftKey)) {
        event.preventDefault();
        search.focus();
    }
})

//pageNavigation
let tabsNav = document.querySelectorAll('.tab-cont');
let tabsTarget = document.querySelectorAll('.tab-target');
const pageButtonLeft = document.querySelector('.page-button_arrow-left');
const pageButtonRight = document.querySelector('.page-button_arrow-right');
const pageTitle = document.querySelector('.view__tab-switch-content');

let closeButtons = document.querySelectorAll('.nav-close__icon_close');

let pageCount = tabsNav.length - 1;

function previousPage() {
    pageButtonRight.style.opacity = '1';
    pageCount--;

    if (pageCount <= 0) {
        pageButtonLeft.style.opacity = '.3';
        pageCount = 0
    }
    currentPage(pageCount);

    if (tabsNav.length <= 1) {
        pageButtonLeft.style.opacity = '.3';
        pageButtonRight.style.opacity = '.3';
    }

}

function nextPage() {
    pageButtonLeft.style.opacity = '1';
    pageCount++;

    if (pageCount >= tabsNav.length - 1) {
        pageButtonRight.style.opacity = '.3';
        pageCount = tabsNav.length - 1;
    }

    currentPage(pageCount);

    if (tabsNav.length <= 1) {
        pageButtonLeft.style.opacity = '.3';
        pageButtonRight.style.opacity = '.3';
    }
}

function currentPage(index) {
    tabsNav.forEach(tabNav => tabNav.classList.remove('tab-cont_active'));
    tabsNav[index].classList.add('tab-cont_active');

    if (index > 0) {
        pageTitle.innerText = tabsNav[index].querySelector('.tab-nav-text__content').innerText
    } else {
        pageTitle.innerText = 'Home page';
    }
}

tabsTarget.forEach((tabTarget, index) => {
    tabTarget.addEventListener('click', () => {
        pageCount = index;
        currentPage(pageCount);
        switch (pageCount) {
            case 0:
                pageButtonLeft.style.opacity = '.3';
                pageButtonRight.style.opacity = '1';
                break;
            case tabsNav.length - 1:
                pageButtonRight.style.opacity = '.3';
                pageButtonLeft.style.opacity = '1';
                break;
            default:
                pageButtonLeft.style.opacity = '1';
                pageButtonRight.style.opacity = '1';
        }

        if (tabsNav.length <= 1) {
            pageButtonLeft.style.opacity = '.3';
            pageButtonRight.style.opacity = '.3';
        }
    })
});

pageButtonLeft.addEventListener('click', previousPage);
pageButtonRight.addEventListener('click', nextPage);



tabsNav.forEach((tabNav, index) => {
    let target = tabNav.querySelector('.nav-close__icon_close');
    if (target == null) {
        return;
    }

    target.addEventListener('click', () => {
        tabNav.remove();
        tabsNav = document.querySelectorAll('.tab-cont');
        tabsTarget = document.querySelectorAll('.tab-target');
        if (pageCount > tabsNav.length - 1) {
            pageCount = tabsNav.length - 1;
        }
        if (tabsNav.length <= 1) {
            pageButtonLeft.style.opacity = '.3';
            pageButtonRight.style.opacity = '.3';
        }
        currentPage(pageCount);
    });
});


