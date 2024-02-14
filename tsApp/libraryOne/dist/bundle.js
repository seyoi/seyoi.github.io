'use strict';

function sayHello() {
    console.log("Hello");
}
function addClickListener(element) {
    element.addEventListener("click", () => {
        sayHello();
    });
}

exports.addClickListener = addClickListener;
exports.sayHello = sayHello;
