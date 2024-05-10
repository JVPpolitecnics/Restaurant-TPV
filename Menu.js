class Menu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.name;
        this.bill;
        this.priceData = null;
        this.data = null;
    }


    handleEvent(event) {
        if (event.type === "user:data-message") {
            this.data = event.detail;
            console.log("recieved data:" + this.data)
            this.render();
        }
        if (event.type === "user:pice-update") {
            this.priceData = event.detail;
            console.log("recieved price:" + this.priceData)
            this.renderPrice();
        }
    }
    

    connectedCallback() {
        const shadow =  this.shadowRoot;
       shadow.innerHTML =  '<h1 id="price">Totall bill: 0 €</h1>';
        
        document.addEventListener("user:data-message", this);
        document.addEventListener("user:pice-update", this);
        this.render();
        
            //this.updateChosenItems();
        
    }





    hasMessages() {
        return /* html */`<chosen-item class="chosen" name="${this.data.name}" price="${this.data.price}" quantity="1"></chosen-item>`;
    }
    noMessages() {
        return /* html */`<div>No messages</div>`;
    }
  
    renderPrice() {
        const priceElement = this.shadowRoot.querySelector('#price');
        if (priceElement) {
            console.log()
            priceElement.textContent = this.priceData.price; // Update price content
        }
    }

    render() {
      
        // Check if this.data is available
        if (this.data) {
            // Convert HTML string to DOM nodes
            const messages = document.createElement('div');
            messages.innerHTML = this.hasMessages();

            // Append the created node to the shadow root
            this.shadowRoot.appendChild(messages);
        } else {
            // If no data is available, display a message
           
        }


    }

}

window.customElements.define("menu-carta", Menu);
