class Section {
    constructor({ items, renderer, containerSelector }) {
        this.items = items;
        this.renderer = renderer;
        this.container = document.querySelector(containerSelector);
    }

    addItem(item) {
        const element = this.renderer(item);
        this.container.append(element);
    }

    renderItems() {
        this.items.forEach((item) => {
            const element = this.renderer(item);
            this.container.prepend(element);
        });
    }
}

export default Section;