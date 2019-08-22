"use strict";

function renderCoffee(coffee) {
    var html = '<div class="col l6">';
    html += '<h3>' + coffee.name + '</h3>';
    html += ' <p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for (var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees() {
    var selectedRoast = roastSelection.value;
    var selectedCoffee = coffeeSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (selectedRoast === "all" && (coffee.name.toLowerCase().indexOf(selectedCoffee) !== -1)) {
            filteredCoffees.push(coffee);
        } else {
            if (coffee.roast === selectedRoast && (coffee.name.toLowerCase().indexOf(selectedCoffee) !== -1)) {
                filteredCoffees.push(coffee);
            }
        }
    });
    body.innerHTML = renderCoffees(filteredCoffees);
}

function addToCoffees() {

    if (!newCoffeeSelection.value) {
        return;
    }
    var coffee = {
        id: (coffees.length + 1),
        name: newCoffeeSelection.value,
        roast: newCoffeeRoast.value
    };
    newCoffeeSelection.value = "";
    M.updateTextFields();
    coffees.push(coffee);
    localStorage.setItem('coffees', JSON.stringify(coffees));
    updateCoffees();
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
if (localStorage.length === 0) {
    var coffees = [
        {id: 1, name: 'Light City', roast: 'light'},
        {id: 2, name: 'Half City', roast: 'light'},
        {id: 3, name: 'Cinnamon', roast: 'light'},
        {id: 4, name: 'City', roast: 'medium'},
        {id: 5, name: 'American', roast: 'medium'},
        {id: 6, name: 'Breakfast', roast: 'medium'},
        {id: 7, name: 'High', roast: 'dark'},
        {id: 8, name: 'Continental', roast: 'dark'},
        {id: 9, name: 'New Orleans', roast: 'dark'},
        {id: 10, name: 'European', roast: 'dark'},
        {id: 11, name: 'Espresso', roast: 'dark'},
        {id: 12, name: 'Viennese', roast: 'dark'},
        {id: 13, name: 'Italian', roast: 'dark'},
        {id: 14, name: 'French', roast: 'dark'},
    ];
} else {
    var coffees = JSON.parse(localStorage.getItem('coffees'));
}

var body = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeSelection = document.querySelector('#coffee-selection');
var newCoffeeSelection = document.querySelector('#new-coffee-selection');
var newCoffeeRoast = document.querySelector('#new-roast-selection');

body.innerHTML = renderCoffees(coffees);

roastSelection.addEventListener('change', updateCoffees);
coffeeSelection.addEventListener('input', updateCoffees);
submitButton.addEventListener('click', addToCoffees);

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});