/**
 * Constructeur
 * Récupérer les champs à valider :
 *      - Champs required
 *      - Champs courriel
 *      - Champs radio required
 * Déclaration des regex
 * Initiatialiser #_estValide à true
 * 
 * Validation
 * Faire la poutine de validation et la gestion d'affichage des cas erreurs
 * 
 * Getter estValide qui retourne le booléen #_estValide
 */

export default class Validation {

    #_elForm;
    #_elsRequireds;
    #_elEmailInputs;
    #_elRequiredControlWrappers;
    #_courrielRegex;
    #_estValide;

    constructor(elForm) {
        this.#_elForm                    = elForm;
        this.#_elsRequireds              = this.#_elForm.querySelectorAll('[required]');
        this.#_elEmailInputs             = this.#_elForm.querySelectorAll('input[type="email"]');
        this.#_elRequiredControlWrappers = this.#_elForm.querySelectorAll('[data-js-radio="required"]');
        
        this.#_courrielRegex = /(.+)@(.+){1,}\.(.+){1,}/,
        this.#_estValide = true

        this.valideFormulaire();

    } 
    /**
     * Valide le formulaire passé en paramètre
     * @returns 
     */
    valideFormulaire() {
        // Initialise la variable booléenne à retourner (estValide) à true
        
        /**
         * Contrôles required
         */

        for (let i = 0, l = this.#_elsRequireds.length; i < l; i++) {
            let value       = this.#_elsRequireds[i].value,
                champNom    = this.#_elsRequireds[i].name,
                elWrapper   = this.#_elsRequireds[i].closest('[data-js-control-wrapper]'),
                elErrorMsg  = elWrapper.querySelector('[data-js-error]');
        
            if (value != '') {
                if (elWrapper.classList.contains('error')) {
                    this.#supprimeErreur(elWrapper, elErrorMsg);
                }
            } else {
                let msg     = `Le champ ${champNom} est obligatoire.`;
                this.#ajouteErreur(elWrapper, elErrorMsg, msg);
                this.#_estValide   = false;
                
            }
        }

        /**
         * Champs de type email
         */

        for (let i = 0, l = this.#_elEmailInputs.length; i < l; i++) {

            if (this.#_elEmailInputs[i].value != '') {

                let courriel    = this.#_elEmailInputs[i].value,
                    elWrapper   = this.#_elEmailInputs[i].closest('[data-js-control-wrapper]'),
                    elErrorMsg  = elWrapper.querySelector('[data-js-error]');
            
                if (this.#_courrielRegex.test(courriel)) {
                    if (elWrapper.classList.contains('error')) {
                        this.#supprimeErreur(elWrapper, elErrorMsg);
                    }
                } else {
                    let msg     = 'L\'adresse courriel saisie n\'est pas valide.';
                    this.#ajouteErreur(elWrapper, elErrorMsg, msg);
                    this.#_estValide   = false;
                }
            }
        }

        /**
         * Champs de types radio et checkbox
         */

        for (let i = 0, l = this.#_elRequiredControlWrappers.length; i < l; i++) {

            // Récupère les éléments DOM à valider
            let elInputs        = this.#_elRequiredControlWrappers[i].querySelectorAll('input'),
                elErrorMsg      = this.#_elRequiredControlWrappers[i].querySelector('[data-js-error]'),
                estSelectionne  = false;

                
            // Valide si un radio/checkbox a été coché
            for (let n = 0, m = elInputs.length; n < m; n++) {
                if (elInputs[n].checked) estSelectionne = true;
            }
            
            // Comportements si un radio/checkbox a été coché, ou pas
            if (estSelectionne) {
                if (this.#_elRequiredControlWrappers[i].classList.contains('error')) {
                    this.#supprimeErreur(this.#_elRequiredControlWrappers[i], elErrorMsg);
                }
            } else {
                let msg = 'Une option âge doit être sélectionnée';
                this.#ajouteErreur(this.#_elRequiredControlWrappers[i], elErrorMsg, msg);
                this.#_estValide = false;
            }
            
        }
        // Retourne un booléen
        return this.#_estValide;

    }

    /**
     * Gestion de l'interface en cas d'erreur
     * @param {HTMLElement} el 
     * @param {HTMLElement} elErrorMsg 
     * @param {String} msg 
     */
        #ajouteErreur(el, elErrorMsg, msg) {
            el.classList.add('error');
            elErrorMsg.textContent = msg;
        }
    
    /**
     * Gestion de l'interface où un champ précédemment fautif est valide
     * @param {HTMLElement} el 
     * @param {HTMLElement} elErrorMsg 
     */
        #supprimeErreur(el, elErrorMsg) {
            el.classList.remove('error');
            elErrorMsg.textContent = '';
        }
}


