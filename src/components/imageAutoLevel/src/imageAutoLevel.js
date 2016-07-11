const AutoLevel = require('./classes/autoLevel.js');
const template = document._currentScript.ownerDocument.querySelector('template');
const rivets = require('rivets');

const imageAutoLevel = Object.create(HTMLElement.prototype);

let inputElement;
let preview;
let autoLevel;
let imagePreview;
let colorForm;
let colorFilter = {red:0,green:0,blue:0};

// Lifecycle callbacks
imageAutoLevel.createdCallback = function() {
    // initialize, render templates, etc.
    var t = this;
    var clone = document.importNode(template.content, true);
    
    t.createShadowRoot().appendChild(clone);
    
    preview = t.shadowRoot.querySelector('#preview');
    previewImage = t.shadowRoot.querySelector('#previewImage');
    console.log(previewImage);
    inputElement = t.shadowRoot.querySelector('input[type=file]');
    colorForm = t.shadowRoot.querySelector('#color');

    autoLevel = new AutoLevel(preview, previewImage, inputElement, colorForm);
    inputElement.parent = autoLevel; preview.parent = autoLevel; colorForm.parent = autoLevel;//add reference to input so we have access in call

};
imageAutoLevel.attachedCallback = function() {
    // called when element is inserted into the DOM
    // good place to add event listeners
    autoLevel.input.domElement.addEventListener("change", autoLevel.updateInput, false);
	autoLevel.preview.domElement.addEventListener("click", autoLevel.pickColor, false);
    colorForm.addEventListener('change', autoLevel.updateImageFromElement, false)

    rivets.bind(
        colorForm, // bind to the element with id "candy-shop"
        {
            color: autoLevel.data.filter // add the data object so we can reference it in our template
        }
    );

    
};
imageAutoLevel.detachedCallback = function() {
    // called when element is removed from the DOM
    // good place to remove event listeners
};
imageAutoLevel.attributeChangedCallback = function(name, oldVal, newVal) {
    // make changes based on attribute changes
};

// Add a public method
imageAutoLevel.doSomething = function() {

};

document.registerElement('image-auto-level', {prototype: imageAutoLevel});