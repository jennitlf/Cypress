import { name, type, phone, coordinates } from "../support/utils";

describe('crud contact book ', () => {
  beforeEach(() => {
    cy.visit("/");
  });

  let contactName

  it('create contact', () => {
    cy.get('div.New-contact button').click();
    contactName = name()
    cy.get('input[name="name"]').type(contactName);
    cy.get('input[name="type"]').type(type());
    cy.get('input[name="phone"]').type(phone());

    // Obter coordenadas usando a função coordinates
    const result = coordinates();

    // Usar uma pequena variação nas coordenadas
    const randomLatitude = result[0] + (Math.random() - 0.5) * 0.01; // variação em latitude
    const randomLongitude = result[1] + (Math.random() - 0.5) * 0.01; // variação em longitude

    // Mova o marcador para a nova posição (ajuste se necessário)
    cy.get('div.leaflet-container').then(($container) => {
      const rect = $container[0].getBoundingClientRect();
      
      // Converta as coordenadas de lat/lng para pixels
      const x = rect.left + rect.width * (randomLongitude + 180) / 360; 
      const y = rect.top + rect.height * (randomLatitude + 90) / 180;

      // Simula o arraste do mouse
      cy.wrap($container)
        .trigger('mousedown', { which: 1, clientX: x, clientY: y })
        .trigger('mousemove', { clientX: x + 10, clientY: y + 10 }) // Arraste um pouco
        .trigger('mouseup');
    });

    
    cy.wait(3000); 
    
    cy.get('button.save').click();
    cy.wait(500); 

    cy.on('window:alert', (text) => {
      expect(text).to.contains("Contato salvo com sucesso!"); 
    });
    
    // Clicar no botão OK do popup
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert'); // Para capturar o alerta
    });
    
    cy.get('@alert').then(() => {
      cy.get('@alert').invoke('call', window); // Simula o clique no botão OK
    });
    cy.wait(1000)

    // Verifique se redirecionou para a lista
    cy.url().should('include', '/'); // Ajuste conforme necessário

    
  });

  it("reading", ()=>{
    cy.get('input[type="text"]').type(contactName);
    cy.get('div.content').contains(contactName);
    cy.wait(1000)
  })

  it("edit contact", ()=>{
    cy.get('button.details').eq(2).click();
    cy.get('a').eq(1).click()
    cy.get('input[name="name"]').clear().type(name());
    cy.wait(2000)
    cy.get('input[name="type"]').clear().type(type());
    cy.wait(2000)
    cy.get('input[name="phone"]').clear().type(phone());

    const result = coordinates();

    
    const randomLatitude = result[0] + (Math.random() - 0.5) * 0.01; 
    const randomLongitude = result[1] + (Math.random() - 0.5) * 0.01; 

   
    cy.get('div.leaflet-container').then(($container) => {
      const rect = $container[0].getBoundingClientRect();
      
   
      const x = rect.left + rect.width * (randomLongitude + 180) / 360; 
      const y = rect.top + rect.height * (randomLatitude + 90) / 180;

      
      cy.wrap($container)
        .trigger('mousedown', { which: 1, clientX: x, clientY: y })
        .trigger('mousemove', { clientX: x + 10, clientY: y + 10 }) 
        .trigger('mouseup');
    });

    cy.wait(3000); 
    

    cy.get('button.save').click();

    cy.wait(500); 

    cy.on('window:alert', (text) => {
      expect(text).to.contains("Contato alterado com sucesso!"); 
    });
    
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert'); 
    });
    
    cy.get('@alert').then(() => {
      cy.get('@alert').invoke('call', window); 
    });

    
    cy.url().should('include', '/'); 
  })

  it("delete contact", ()=>{
    cy.get('button.details').eq(1).click();
   
    cy.wait(500); 

    cy.on('window:alert', (text) => {
      expect(text).to.contains("Contato excluído com sucesso!"); 
    });
    
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert'); 
    });
    
    cy.get('@alert').then(() => {
      cy.get('@alert').invoke('call', window); 
    });

    
    cy.url().should('include', '/'); 
  })
});