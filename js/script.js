'use strict';
//checkbox
const checkboxes = document.querySelectorAll('.checkbox');

function switchCheckbox(event) {
    event.currentTarget.classList.toggle('checkbox_active');
}

checkboxes.forEach(check => check.addEventListener('click', switchCheckbox));

//dropdown
const selects = document.querySelectorAll('.properties__data');

function toggleDropdown(event) {
    const currentElem = event.currentTarget;
    const currentDropdown = currentElem.querySelector('.properties__data-dropdown');
    currentElem.querySelector('.properties__data-dropdown-list').classList.toggle('properties__data-dropdown-list_active');
    currentElem.querySelector('.properties__data-arrow').classList.toggle('properties__data-arrow_active');
    const currentItems = currentElem.querySelectorAll('.properties__data-dropdown-list-item');

    currentItems.forEach((item) => {
        item.addEventListener('click', (evt) => {
            currentDropdown.firstChild.replaceWith(evt.currentTarget.innerText)
        })
    })
}

selects.forEach(select => select.addEventListener('click', toggleDropdown));


//keyEvent
const search = document.querySelector('.left-navigation__search-input');

document.addEventListener('keydown', function (event) {
    if (event.code == 'KeyS' && (event.shiftKey)) {
        search.focus();
    }
})

//pageNavigation
const tabsNav = document.querySelectorAll('.tab-cont');
const pageButtonLeft = document.querySelector('.page-button_arrow-left');
const pageButtonRight = document.querySelector('.page-button_arrow-right');
const pageTitle = document.querySelector('.view__tab-switch-content');


let pageCount = tabsNav.length - 1;

function previousPage() {
    pageButtonRight.style.opacity = '1';
    pageCount--;
    if (pageCount <= 0) {
        pageButtonLeft.style.opacity = '.3';
        pageCount = 0
    }
    currentPage(pageCount);

}

function nextPage() {
    pageButtonLeft.style.opacity = '1';
    pageCount++;
    if (pageCount >= tabsNav.length - 1) {
        pageButtonRight.style.opacity = '.3';
        pageCount = tabsNav.length - 1;
    }
    currentPage(pageCount);
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

tabsNav.forEach((tabNav, index) => {
    tabNav.addEventListener('click', () => {
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
    })
});

pageButtonLeft.addEventListener('click', previousPage);
pageButtonRight.addEventListener('click', nextPage);
