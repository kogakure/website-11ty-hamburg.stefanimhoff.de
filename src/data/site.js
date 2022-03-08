const animation = 'slide-up';
const delay = 300;
const duration = 800;
const easing = 'ease-out-sine';

module.exports = {
  isProduction: process.env.ELEVENTY_ENV === 'production',
  buildTime: new Date(),
  title: 'Exploring Hamburg',
  description: 'Street by Street, District by District',
  url: 'https://hamburg.stefanimhoff.de',
  author: 'Stefan Imhoff',
  twitter: '@kogakure',
  faviconPath: '/assets/images/branding/favicons/',
  animationDelay: `data-sal=${animation} data-sal-duration=${duration} data-sal-delay=${delay} data-sal-easing=${easing}`,
  animation: `data-sal=${animation} data-sal-duration=${duration} data-sal-easing=${easing}`,
};
