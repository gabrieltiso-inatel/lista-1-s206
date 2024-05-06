const url = "https://coffee-cart.app/"

describe("Test Coffe Shop", () => {
    it("Should add an Espresso to the cart", () => {
        cy.visit(url);
        cy.get('[data-cy="Espresso"]').click();
        cy.get(':nth-child(2) > a').click();
        cy.get('ul[data-v-8965af83=""] > .list-item > :nth-child(1)').should("have.text", "Espresso");
    });

    it("Should add 3 Cappuccinos to the cart and deny promo offer", () => {
        cy.visit(url);
        cy.get('[data-cy="Cappuccino"]').click();
        cy.get('[data-cy="Cappuccino"]').click();
        cy.get('[data-cy="Cappuccino"]').click();
        cy.get('.promo > span').should("have.text", "It's your lucky day! Get an extra cup of Mocha for $4.");
        cy.get('.buttons > :nth-child(2)').click();
        cy.get(':nth-child(2) > a').click();
        cy.get('ul[data-v-8965af83=""] > .list-item > :nth-child(1)').should("have.text", "Cappuccino");
    });

    it("Should add 3 Cappuccinos to the cart and accept promo offer", () => {
        cy.visit(url);
        cy.get('[data-cy="Cappuccino"]').click();
        cy.get('[data-cy="Cappuccino"]').click();
        cy.get('[data-cy="Cappuccino"]').click();
        cy.get('.promo > span').should("have.text", "It's your lucky day! Get an extra cup of Mocha for $4.");
        cy.get('.yes').click();
        cy.get(':nth-child(2) > a').click();
        cy.get('ul[data-v-8965af83=""] > :nth-child(2) > :nth-child(1)').should("have.text", "(Discounted) Mocha");
    });

    it("Should be able to remove a Mocha order from the cart", () => {
        cy.visit(url);
        cy.get('[data-cy="Mocha"]').click();
        cy.get(':nth-child(2) > a').click();
        cy.get('.delete').click();
        cy.get('p').should("have.text", "No coffee, go add some."); 
    });

    it("Should add two Espresso Macchiatos and verify total element", () => {
        cy.visit(url);
        cy.get('[data-cy="Espresso-Macchiato"]').click();
        cy.get('[data-cy="Espresso-Macchiato"]').click();
        cy.get('[data-test="checkout"]').should("contain.text", "$24.00");
    });

    it("Should deny sending payment link for invalid email", () => {
        cy.visit(url);
        cy.get('[data-test="checkout"]').click();
        cy.get('#name').type("Gabriel");
        cy.get('#email').type("invalid-email");
        cy.get('#submit-payment').click();
        cy.get('h1').should("contain.text", "Payment details");
    });
})

