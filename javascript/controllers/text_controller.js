import Text from "../models/text_model.js"
import DomElement from "../models/dom_element_model.js"
import CharController from "./char_controller.js";

class TextController {
  constructor() {

    this.domElement = new DomElement({tag: "body"})
    this.charController = null
    this.charCount = 0
    this.text = new Text("Hello World");  //Créer une fonction dans textModel qui calcule le texte déjà rendu et l'envoie à this.renderedText
    this.textObjects = []

    // this.#createTextObjects()
  }

  textLoop = async () => {
    if (this.charCount >= this.text.initialText.split("").length) return;
    
    this.text.setRenderedTextAndNextLetter({counter: this.charCount})

    this.charController = new CharController(this.domElement)
    await this.charController.randomLetterLoop({renderedText: this.text.renderedText, nextLetter: this.text.nextLetter})
    this.charCount++
    return this.textLoop()
  }
}

export default TextController
