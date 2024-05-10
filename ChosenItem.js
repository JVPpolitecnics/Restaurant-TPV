class ChosenItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.name;
        this.price;
        this.originalPrice;
        this.quantity;
        this.calculatedPriceDifference;
    }
    static get observedAttributes() {
        return ['name', "price", "quantity"];
    }

    attributeChangedCallback(nameAtr, oldVakye, newValue) {
        switch (nameAtr) {
            case "name":
                this.name = newValue;
                break;
            case "price":
                this.price = newValue;
                this.originalPrice = newValue;
                break;
            case "quantity":
                this.quantity = newValue;
                break;
        }
    }
    connectedCallback() {
        const shadow = this.shadowRoot;
        shadow.innerHTML = `<div> <br><p>${this.name}</p>
        <button class="increase">+</button>
        <p>${this.quantity}</p>
        <button class="decrease">-</button>
    <p>${this.price} €</p>
    </div>`;
        const increaseButton = shadow.querySelector('.increase');
        const decreaseButton = shadow.querySelector('.decrease');

        increaseButton.addEventListener("click", this.onIncrementButtonClick);
        decreaseButton.addEventListener("click", this.onDecreaseButtonClick);

    }

    onIncrementButtonClick = () => {
        this.quantity++;
        this.price = this.originalPrice * this.quantity
        this.calculatedPriceDifference = ((this.originalPrice * this.quantity)-(this.originalPrice * (this.quantity - 1)))
        this.connectedCallback();

        const messageEvent = new CustomEvent("user:pice-update", {
            detail: { price: this.calculatedPriceDifference},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(messageEvent);

    }

    onDecreaseButtonClick = () => {
        if (this.quantity > 1) {
            this.quantity--;
            this.price = this.originalPrice * this.quantity
            this.calculatedPriceDifference = ((this.originalPrice * (this.quantity+1))-(this.originalPrice * this.quantity))
            this.connectedCallback();
            const messageEvent = new CustomEvent("user:pice-update", {
                detail: { price: (-this.calculatedPriceDifference)},
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(messageEvent);
        }
        

    }

}
window.customElements.define("chosen-item", ChosenItem);