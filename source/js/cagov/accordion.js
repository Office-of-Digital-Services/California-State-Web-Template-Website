/* -----------------------------------------
   ACCORDION - /source/js/cagov/accordion.js
----------------------------------------- */

  // This is accordion plus icon
  class PlusIcon extends window.HTMLElement {
    connectedCallback () {
      const { classPrefix, classList } = this.dataset;
      this.innerHTML = `<div class="accordion-icon" aria-hidden="true"><?xml version="1.0" encoding="utf-8"?>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
      <path class="fill-orange" d="M5.7,12.8h5.5v5.5c0,0.4,0.4,0.8,0.8,0.8s0.8-0.4,0.8-0.8v-5.5h5.5c0.4,0,0.8-0.4,0.8-0.8s-0.4-0.8-0.8-0.8
        h-5.5V5.7c0-0.4-0.4-0.8-0.8-0.8s-0.8,0.4-0.8,0.8v5.5H5.7c-0.4,0-0.8,0.4-0.8,0.8S5.2,12.8,5.7,12.8z"/>
      </svg></div>`;
    }
  }
  window.customElements.define('cagov-plus', PlusIcon);


// This is accordion minus icon
class MinusIcon extends window.HTMLElement {
    connectedCallback () {
      const { classPrefix, classList } = this.dataset;
      this.innerHTML = `<div class="accordion-icon" aria-hidden="true"><?xml version="1.0" encoding="utf-8"?>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
      <path class="fill-orange" d="M5.7,12.8h12.7c0.4,0,0.8-0.4,0.8-0.8s-0.4-0.8-0.8-0.8H5.7c-0.4,0-0.8,0.4-0.8,0.8S5.2,12.8,5.7,12.8z"/>
      </svg></div>`;
    }
  }
  window.customElements.define('cagov-minus', MinusIcon);


export class CaGovAccordion extends window.HTMLElement {
    connectedCallback() {
      this.classList.add('prog-enhanced');
      this.expandTarget = this.querySelector('.card-container');
      this.expandButton = this.querySelector('.card-header');
      this.expandButton.addEventListener('click', this.listen.bind(this));
      this.activateButton = this.querySelector('.card-header');
      this.eventType = this.dataset.eventType ? this.dataset.eventType : 'click';
      this.addStyle(this); // Add local styles
  
      // Detect if accordion should open by default
      let expanded = this.activateButton.getAttribute('aria-expanded');
      if (expanded === "true") {
        this.triggerAccordionClick(); // Open the accordion.
        let allLinks = this.querySelectorAll(".card-container a");
        let allbuttons = this.querySelectorAll(".card-container button");
        for (var i = 0; i < allLinks.length; i++) {
          allLinks[i].removeAttribute("tabindex"); // remove tabindex from all the links
        }
        for (var i = 0; i < allbuttons.length; i++) {
          allbuttons[i].removeAttribute("tabindex"); // remove tabindex from all the buttons
        }
      }
      // making sure that all links inside of the accordion container are having tabindex -1
      else {
        let allLinks = this.querySelectorAll(".card-container a");
        let allbuttons = this.querySelectorAll(".card-container button");
        for (var i = 0; i < allLinks.length; i++) {
          allLinks[i].setAttribute('tabindex', '-1');
        }
    
        for (var i = 0; i < allbuttons.length; i++) {
          allbuttons[i].setAttribute('tabindex', '-1');
        }
      }
    }
  
    listen() {
      if (!this.cardBodyHeight) {
        this.cardBodyHeight = this.querySelector('.card-body').clientHeight;
      }
      if (this.expandTarget.clientHeight > 0) {
        this.expandAccordion();
      } else {
        this.closeAccordion();
      }
    }
  
    triggerAccordionClick() {
      const event = new MouseEvent(this.eventType, {
        view: window,
        bubbles: true,
        cancelable: true
      });
      this.expandButton.dispatchEvent(event);
    }
  
    expandAccordion() {
      this.expandTarget.style.height = '0px';
      this.expandTarget.setAttribute('aria-hidden', 'true');
      this.querySelector('.card-header').classList.remove('accordion-alpha-open');
      this.activateButton.setAttribute('aria-expanded', 'false');
      let allLinks = this.querySelectorAll(".card-container a");
      let allbuttons = this.querySelectorAll(".card-container button");
      for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].setAttribute('tabindex', '-1'); // tabindex to all links
      }
      for (var i = 0; i < allbuttons.length; i++) {
        allbuttons[i].setAttribute('tabindex', '-1'); // tabindex to all buttons
      }
    }
  
    closeAccordion() {
      this.expandTarget.style.height = this.cardBodyHeight + 'px';
      this.expandTarget.setAttribute('aria-hidden', 'false');
      this.querySelector('.card-header').classList.add('accordion-alpha-open');
      this.querySelector('.card-container').classList.remove('collapsed');
      this.activateButton.setAttribute('aria-expanded', 'true');
      let allLinks = this.querySelectorAll(".card-container a");
      let allbuttons = this.querySelectorAll(".card-container button");
      for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].removeAttribute("tabindex"); // remove tabindex from all the links
      }
      for (var i = 0; i < allbuttons.length; i++) {
        allbuttons[i].removeAttribute("tabindex"); // remove tabindex from all the buttons
      }
    }
  
  
    // Add accordion styles here
    addStyle(element) {
      const style = document.createElement("style");
      style.textContent = `
  cagov-accordion .card{border-radius:0!important;border:none;margin-bottom:0;position:relative;display:flex;flex-direction:column;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box}cagov-accordion .card-container{display:block;overflow:hidden}cagov-accordion .card-container[aria-hidden=false]{border-bottom:1px solid #1f2574}cagov-accordion.prog-enhanced .card-container{height:0;transition:height .3s ease}cagov-accordion .collapsed{display:block;overflow:hidden;visibility:hidden}.card-header .button{color:#000}.accordion{margin-bottom:20px}.accordion-title{text-align:left;margin-bottom:0;color:#1f2574;margin-right:auto;width:90%;padding:0 .5rem 0 0!important}.accordion-title h2,.accordion-title h3,.accordion-title h4{padding:0!important;margin-top:0!important;margin-bottom:0!important;font-family:Roboto,sans-serif;font-size:1.2rem!important;font-weight:700;color:#1f2574;text-align:left!important}button.card-header{display:flex;justify-content:left;align-items:center;padding:1rem .75rem;background-clip:border-box;background-color:#fff;border:none;border-bottom:1px solid #1f2574;border-top:1px solid #1f2574;border-radius:0!important;margin-top:-1px}button.card-header:hover{background-color:#f2f5fc}button.card-header:focus{outline:2px solid #ffcf44;outline-offset:-2px}.prog-enhanced .accordion-alpha .plus-munus{width:2.125rem;height:2.125rem;border:2px solid #ff8000;border-radius:50%;padding:0;overflow:hidden;transition:all .3s ease;margin-left:1rem;color:#ff8000;align-self:flex-start}.prog-enhanced .accordion-alpha .plus-munus agov-plus .accordion-icon{display:block}.prog-enhanced .accordion-alpha .plus-munus cagov-minus .accordion-icon{display:none}.prog-enhanced .accordion-alpha-open{border-bottom-color:#fff!important}.prog-enhanced .accordion-alpha-open cagov-plus .accordion-icon{display:none}.prog-enhanced .accordion-alpha-open cagov-minus .accordion-icon{display:block!important}.dark-accordion-bg>.container.dark-accordion-first{padding-top:3rem;margin-top:3rem;padding-bottom:0;margin-bottom:0}.dark-accordion-bg>.container{padding-top:3rem;margin-top:3rem;padding-bottom:3rem;margin-bottom:3rem}.dark-accordion-sibling>.container{padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0}.dark-accordion-sibling+.dark-accordion-bg>.container{padding-top:0;margin-top:0;padding-bottom:3rem;margin-bottom:3rem}.dark-accordion-bg .card{background-color:#1f2574}.dark-accordion-bg .card .accordion-alpha{background-color:#1f2574;border-bottom:1px solid #4c5190;border-top:1px solid #4c5190}.dark-accordion-bg .card .accordion-alpha.accordion-alpha-open{border-bottom-color:#1f2574!important}.dark-accordion-bg .card .accordion-alpha:focus,.dark-accordion-bg .card .accordion-alpha:hover{background-color:#003d9d}.dark-accordion-bg .card .accordion-alpha .accordion-title{color:#fff}.dark-accordion-bg .card .accordion-alpha .accordion-title h2,.dark-accordion-bg .card .accordion-alpha .accordion-title h3,.dark-accordion-bg .card .accordion-alpha .accordion-title h4{color:#fff}.dark-accordion-bg .card .card-container{color:#fff}.dark-accordion-bg .card .card-container[aria-hidden=false]{border-bottom:1px solid #4c5190}.dark-accordion-bg .card .card-container h2,.dark-accordion-bg .card .card-container h3,.dark-accordion-bg .card .card-container h4,.dark-accordion-bg .card .card-container h5{color:#fff}.bg-darkblue .dark-accordion-bg>.container.dark-accordion-first{padding-top:1rem;margin-top:0;padding-bottom:0;margin-bottom:0}.fill-orange{fill:#ff8000!important}.card-body{padding:.55rem .45rem .55rem .75rem;color:#000;line-height:1.5}.card-body p{font-family:Roboto,sans-serif;font-weight:300}
      `;
      element.appendChild(style);
    }
  
  }
  window.customElements.define('cagov-accordion', CaGovAccordion);


