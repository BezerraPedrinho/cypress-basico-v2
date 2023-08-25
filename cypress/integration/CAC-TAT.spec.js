///<reference types="Cypress" />
describe('Central de Atendimento ao Cliente TAT', ()=>{
  beforeEach(()=>{
    cy.visit('./src/index.html')
  })
  it("verifaca o titulo da aplicação", ()=>{          
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it("Fill required inputs and make subit of this form", ()=>{
    const longText = 'test, test, test, test, test, test, test, test, test, test';
    cy.get('#firstName').type('pipa')
    cy.get('#lastName').type('lipa')
    cy.get('#email').type('email@exemplo.com')
    cy.get('#open-text-area').type(longText,{delay:0})
    cy.get('img').click({multiple: true })
    cy.get(`button[type="submit"]`).click()
    cy.get('.success').should('be.visible')
  })

  it('show error mensseger in form submit whit text erros',()=>{
    const longText = 'test, test, test, test, test, test, test, test, test, test';
    cy.get('#firstName').type('pipa')
    cy.get('#lastName').type('lipa')
    cy.get('#email').type('email@exemplo,com')
    cy.get('#open-text-area').type(longText,{delay:0})
    cy.get('img').click({multiple: true })
    cy.get(`button[type="submit"]`).click()
    cy.get('.error').should('be.visible') 
  })
  it(`input phone whit fill no number char`,()=>{
    cy.get('#phone')
      .type('abcdeédsfioudhf',{delay:500})
      .should('have.value', '')
  })
  it(`Show error mensseger when phone input is mandatory and no fill before submit`,()=>{
    cy.get('#firstName').type('pipa')
    cy.get('#lastName').type('lipa')
    cy.get('#email').type('email@exemplo.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('text')
    cy.get('img').click({multiple: true })
    cy.get(`button[type="submit"]`).click()
    cy.get('.error').should('be.visible') 
  })
  it(`fill and delete inputs ( name,main name , email and phone) whit type and clear function`,()=>{
    cy.get('#firstName').type('pipa').should('have.value','pipa').clear().should('have.value','')
    
    cy.get('#lastName').type('lipa').should('have.value','lipa')
    cy.get('#email').type('email@exemplo.com').should('have.value','email@exemplo.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('text').should('have.value','text')

    cy.get('#firstName').clear().should('have.value','')
    cy.get('#lastName').clear().should('have.value','')
    cy.get('#email').clear().should('have.value','')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').clear().should('have.value','')
    

  })
  it.only(`show error mensseger whir no filled inputs`,()=>{
    cy.get(`button[type="submit"]`).click()
    cy.get('.error').should('be.visible')
  })

  
})