/// <reference types="Cypress" />

var startPrice = 3.00

describe('Pizza Builder test suite', function () {

    it('User adding ingredient should have one ingredient on the pizza', function () {
        cy.visit("http://stanislavv.ca/React/PizzaMaker1/#")

        cy.selectIngredient('Pepperoni')
        cy.get('.ingredientSpace').find('.card').should('have.length', 2)
    })

    it('User adding ingredients and resetting pizza should have no ingredients left', function () {
        cy.visit("http://stanislavv.ca/React/PizzaMaker1/#")

        cy.selectIngredient('Mozzarella')
        cy.selectIngredient('Vegetables')
        cy.selectIngredient('Spices')

        cy.get('.ingredientSpace').find('.card').should('have.length', 4)
        cy.get('.btn.btn-warning').click()
        cy.get('.ingredientSpace').find('.card').should('have.length', 1)
    })

    it('User adding and removing ingredients should see the correct total price', function () {
        cy.visit("http://stanislavv.ca/React/PizzaMaker1/#")

        cy.selectIngredient('Mozzarella')
        cy.getPriceOfIngredient('Mozzarella')

        cy.get('@price').then(price => {
            cy.get('.badge').then(function (totalPriceElement) {
                var totalPrice = totalPriceElement.text()
                expect(totalPrice).to.contain(startPrice + price)
            })
        })
    })

    it('User should see the same total price in cart as in check out', function () {
        cy.visit("http://stanislavv.ca/React/PizzaMaker1/#")
        
        cy.selectIngredient('Swiss cheese')
        cy.selectIngredient('Swiss cheese')
        cy.selectIngredient('Cold cuts')

        cy.get('.badge').then(function (totalPriceElement) {
            var totalPrice = totalPriceElement.text()
            cy.wrap(totalPrice).as('totalPrice')
        })

        cy.get('.btn.btn-primary').click()
        cy.get('@totalPrice').then(totalPrice => {
            cy.get('.whiteRectangle').find('h3').then(function (totalCheckoutPriceElement) {
                var totalCheckoutPrice = totalCheckoutPriceElement.text()
                expect(totalCheckoutPrice).to.contain(totalPrice)
            })
        })
    })

    it('User adding ingredients should see correct ingredients in check out', function () {
        cy.visit("http://stanislavv.ca/React/PizzaMaker1/#")

        cy.selectIngredient('Vegetables')
        cy.selectIngredient('Feta')
        cy.selectIngredient('Spices')
        cy.get('.btn.btn-primary').click()

        cy.get('.whiteRectangle').find('ul').then(function(checkoutIngredientsElement) {
            var checkoutIngredients = checkoutIngredientsElement.text()
            cy.get('.whiteRectangle').find('li').should('have.length', 3)
            expect(checkoutIngredients).to.contain('Vegetables')
            expect(checkoutIngredients).to.contain('Feta')
            expect(checkoutIngredients).to.contain('Spices')
        })
    })
})