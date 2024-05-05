class ChosenItem extends HTMLElement {
    constructor() {
        super();
        this.name;
        this.price;
        this.originalPrice;
        this.quantity;
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

        this.innerHTML = `<div> <br><p>${this.name}</p>
        <button class="increase">+</button>
        <p>${this.quantity}</p>
        <button class="decrease">-</button>
    <p>${this.price} €</p>
    </div>`;
        const increaseButton = this.querySelector('.increase');
        const decreaseButton = this.querySelector('.decrease');

        increaseButton.addEventListener("click", this.onIncrementButtonClick);
        decreaseButton.addEventListener("click", this.onDecreaseButtonClick);

    }

    onIncrementButtonClick = () => {
        this.quantity++;
        this.price = this.originalPrice * this.quantity
        this.connectedCallback();

    }

    onDecreaseButtonClick = () => {
        if (this.quantity > 1) {
            this.quantity--;
            this.price = this.originalPrice * this.quantity
            this.connectedCallback();
        }

    }

}
window.customElements.define("chosen-item", ChosenItem);