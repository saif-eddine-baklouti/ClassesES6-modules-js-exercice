/**
 * Récupérer le formulaire, le bouton et le bloc HTML pour l'affichage du message 'Merci !'
 * Gestion du clic du bouton
 * Suite au click, instanciation de la classe Validation avec le formulaire à valider en argument
 * Si valide, gestion du message 'Merci !'
 */

import Validation from "./Validation.js";

export default class Formulaire {
    constructor(elForm){

        this._elForm        = elForm;
        this._elChampForm   = this._elForm.querySelector('form');
        this._elBtn         = this._elForm.querySelector('[data-js-btn]');
        this._blocMerci     = this._elForm.querySelector('[data-js-thank]'); 

        this.init();

    }

    init() {
            // Au clic du bouton 'Soumettre'
        this._elBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Lance la validation et place la fonction dans une variable (la fonction de validation retourne un booléen (true/false))
            let objValide = new Validation(this._elForm)

            // Si valide
            if (objValide.valideFormulaire()) {
                this._blocMerci.classList.remove('thank--hidden');
                this._elChampForm.classList.add('hidden');
                this._elBtn.disabled = true;
                
            };
        }.bind(this));
        
    };
};

