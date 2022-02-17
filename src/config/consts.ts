const widthOfWindow  = window.innerWidth;
const heightOfWindow = window.innerHeight;

export {widthOfWindow, heightOfWindow};

const beef = require('../images/beef.jpg');
const candy = require('../images/candy.jpg');
const chicken = require('../images/chicken.jpg');
const fish = require('../images/fish.jpg');
const juice = require('../images/juice.jpg');
const notFound = require('../images/notFound.jpg');
const soda = require('../images/soda.jpg');
const vegetable = require('../images/vegetable.jpg');

export const defineImage = (category: string) => {
    if(category === 'Bovino') return beef;
    if(category === 'Doce') return candy;
    if(category === 'Frango') return chicken;
    if(category === 'Peixe') return fish;
    if(category === 'Suco') return juice;
    if(category === 'Refrigerante') return soda;
    if(category === 'Salada') return vegetable;

    return notFound;
}
