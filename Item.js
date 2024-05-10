class Item extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.name = '';
        this.type = '';
        this.price = '';
        this.allergenList = [];
        this.allergen1 = '';
        this.allergenSVGList = [];
        this.allergen3 = '';
        this.newElement = '';
    }

    static get observedAttributes() {
        return ['name', 'type', 'price', 'allergen-list', 'allergen2', 'allergen3'];
    }

    attributeChangedCallback(nameAttr, oldValue, newValue) {
        switch (nameAttr) {
            case 'name':
                this.name = newValue;
                break;
            case 'type':
                this.type = newValue;
                break;
            case 'price':
                this.price = newValue;
                break;
            case 'allergen-list':
                this.allergenList = JSON.parse(newValue);
                this.renderAllergens();
                console.log("za")
                break;
        }
    }

    renderAllergens() {
        if (this.allergenList.includes('seafood')) {
            this.allergen1 = `<object type="image/svg+xml" data="images/svg/seafood.svg"></object>`;
            this.allergenSVGList.push("seafood.svg");
        }
        if (this.allergenList.includes("shelfish")) {
            this.allergenSVGList.push("shelfish.svg");
        }
        if (this.allergenList.includes("grains")) {
            this.allergenSVGList.push("grains.svg");
        }
        if (this.allergenList.includes("beans")) {
            this.allergenSVGList.push("beans.svg");
        }
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
       const lowerCaseType = this.type.toLocaleLowerCase();
       console.log("this lower type:" +lowerCaseType);
        const selectedItemsDiv = document.querySelector(`#selectedItems #${lowerCaseType}`)
        const imageName = this.name.replace(/\s+/g, '_');
        const allergenSVGs = this.allergenSVGList.map(svg => `<object type="image/svg+xml" data="images/svg/${svg}"></object>`).join('');
        shadow.innerHTML = `<h1>${this.name}</h1>
        <p>${this.type}</p>
        <img src="images/${imageName}.png" alt="${this.name}" width="75" height="80">
        <h1>${this.price} €  </h1>
        <div>
       
        ${allergenSVGs}
        
        </div>`;
        
        this.addEventListener('click', () => {
            console.log('Item clicked!');
            console.log('Name:', this.name);
            console.log('Type:', this.type);
            console.log('Price:', this.price);
            this.newElement = `<chosen-item name="${this.name}" price="${this.price}" quantity="1"></chosen-item>`;
            const messageEvent = new CustomEvent("user:data-message", {
                detail: { from: "Manz", name: this.name, price: this.price },
                bubbles: true,
                composed: true
              });
              this.dispatchEvent(messageEvent);
              console.log("THE" + messageEvent)
              console.log("HELP")
            console.log("selected item div:" + selectedItemsDiv)
            this.style.border = '6px solid green';

            // Restore default border style after 1 second
            setTimeout(() => {
                this.style.border = ''; // Restore default border style
            }, 1000);
        });
    }
}

window.customElements.define('item-food', Item);
