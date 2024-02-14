

export function sayHello() {
    console.log("Hello");
}

export function addClickListener(element: HTMLElement) {
    element.addEventListener("click", () => {
        sayHello();
    });
}
