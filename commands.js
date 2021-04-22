Cypress.Commands.add("selectIngredient", (productName) => {
cy.get('.list-group-item').each(($el, index) => {
    if($el.text().includes(productName))
    {
        cy.get('.btn.btn-success.btn-number').eq(index).click()
    }
})
})

Cypress.Commands.add("getPriceOfIngredient", (productName) => {
    cy.get('.list-group-item').find('.descriptionContainer').each(($el) => {
        if($el.text().includes(productName))
        {   
               var price = parseFloat($el.find('.text-muted').text())
               cy.wrap(price).as('price')
        }
    })
    })