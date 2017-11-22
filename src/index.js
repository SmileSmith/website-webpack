/* eslint-disable no-bitwise */
require('./scss/index.scss');

if (!('classList' in document.documentElement)) {
  Object.defineProperty(HTMLElement.prototype, 'classList', {
    get() {
      const self = this;

      function update(fn) {
        return (value) => {
          const classes = self.className.split(/\s+/g);
          const index = classes.indexOf(value);

          fn(classes, index, value);
          self.className = classes.join(' ');
        };
      }

      return {
        add: update((classes, index, value) => {
          if (!~index) classes.push(value);
        }),

        remove: update((classes, index) => {
          if (~index) classes.splice(index, 1);
        }),

        toggle: update((classes, index, value) => {
          if (~index) {
            classes.splice(index, 1);
          } else {
            classes.push(value);
          }
        }),

        contains: value => !!~self.className.split(/\s+/g).indexOf(value),

        item: i => self.className.split(/\s+/g)[i] || null
      };
    }
  });
}

const initClickEvent = function initEvent(dom, callback) {
  if (document.addEventListener) { // 一般浏览器
    dom.addEventListener('click', callback, false);
  } else if (document.attachEvent) { // IE
    dom.attach('click', callback);
  } else { // last resort
    dom.onclick = callback;
  }
};

const toHome = document.getElementById('toHome');
const home = document.getElementById('home');

const toExplore = document.getElementById('toExplore');
const explore = document.getElementById('explore');

initClickEvent(toHome, () => {
  toHome.classList.add('active');
  home.style.display = 'block';
  toExplore.classList.remove('active');
  explore.style.display = 'none';
});

initClickEvent(toExplore, () => {
  toHome.classList.remove('active');
  home.style.display = 'none';
  toExplore.classList.add('active');
  explore.style.display = 'block';
});


const agencyInfoLink = document.getElementById('toAgencyInfo');
const businessInfoLink = document.getElementById('toBusinessInfo');
const agencyInfo = document.getElementById('agencyInfo');
const businessInfo = document.getElementById('businessInfo');

initClickEvent(agencyInfoLink, () => {
  agencyInfoLink.classList.add('active');
  agencyInfo.style.display = 'block';
  businessInfoLink.classList.remove('active');
  businessInfo.style.display = 'none';
});

initClickEvent(businessInfoLink, () => {
  agencyInfoLink.classList.remove('active');
  agencyInfo.style.display = 'none';
  businessInfoLink.classList.add('active');
  businessInfo.style.display = 'block';
});
