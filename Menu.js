class Menu extends HTMLElement {
    constructor(){
        super();
        this.name;
        this.finalPrice = 0;
        this.observer = new MutationObserver(this.onDomChange.bind(this));
    }
    static get observedAttributes(){
        return [];
    }

    attributeChangedCallback(nameAtr, oldVakye, newValue){
     
    }

    connectedCallback(){
        this.observeDomChanges();
        this.updateChosenItems();

        //this.innerHTML = `<h1>${this.finalPrice}</h1>`
        
    }

    observeDomChanges() {
        this.observer.observe(document, { subtree: true, childList: true });
    }

    onDomChange(mutationsList) {
        mutationsList.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                this.updateChosenItems();
            }
        });
    }

    updateChosenItems() {
        const chosenItems = document.getElementsByTagName('chosen-item');
        console.log("my chosen items" + chosenItems.length)
       
        for (var i = 0; i < chosenItems.length -1; i++) {
            var element = chosenItems[i];
            console.log("boss" + element.toString())
            // Do something with each element
            const price = element.getAttribute('price');
            this.finalPrice += parseFloat(price);
            console.log("boss price" + this.finalPrice);
        }
        //this.innerHTML = `<h1>${this.finalPrice}</h1>`
        
       
    }
}

window.customElements.define("menu-carta", Menu);
