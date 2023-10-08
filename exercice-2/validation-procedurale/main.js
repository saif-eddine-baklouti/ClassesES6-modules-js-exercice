window.addEventListener('DOMContentLoaded', function() {

    // Récupère le formulaire
    let elForm = document.querySelector('[data-js-form]'),
        elBtn = elForm.querySelector('[data-js-btn]');
    
    // Définition des regex
    let courrielRegex = /(.+)@(.+){1,}\.(.+){1,}/,
        telRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;



    // Au clic du bouton 'Soumettre'
    elBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Lance la validation et place la fonction dans une variable (la fonction de validation retourne un booléen (true/false))
        let estValide = valideFormulaire(elForm);

        // Si valide
        //console.log(estValide);
        if (estValide) {
            elForm.classList.add('sent');
            elBtn.disabled = true;
            // Éventuellement, appel à la base de données via JS
        }
    });



    /**
     * Valide le formulaire passé en paramètre
     * @param {HTMLElement} elForm 
     * @returns 
     */
    function valideFormulaire(elForm) {

        // Initialise la variable booléenne à retourner (estValide) à true
        let estValide = true;


        /**
         * Contrôles required
         */

        let elRequireds = elForm.querySelectorAll('[required]');

        for (let i = 0, l = elRequireds.length; i < l; i++) {
            let value = elRequireds[i].value,
                elWrapper = elRequireds[i].closest('[data-js-control-wrapper]'),
                elErrorMsg = elWrapper.querySelector('[data-js-error]');
        
            if (value != '') {
                if (elWrapper.classList.contains('error')) {
                    supprimeErreur(elWrapper, elErrorMsg);
                }
            } else {
                let msg = 'Ce champ est obligatoire.';
                ajouteErreur(elWrapper, elErrorMsg, msg);
                estValide = false;
            }
        }


        /**
         * Champs de type email
         */

        let elEmailInputs = elForm.querySelectorAll('input[type="email"]');

        for (let i = 0, l = elEmailInputs.length; i < l; i++) {

            if (elEmailInputs[i].value != '') {

                let courriel = elEmailInputs[i].value,
                    elWrapper = elEmailInputs[i].closest('[data-js-control-wrapper]'),
                    elErrorMsg = elWrapper.querySelector('[data-js-error]');
            
                if (courrielRegex.test(courriel)) {
                    if (elWrapper.classList.contains('error')) {
                        supprimeErreur(elWrapper, elErrorMsg);
                    }
                } else {
                    let msg = 'L\'adresse courriel saisie n\'est pas valide.';
                    ajouteErreur(elWrapper, elErrorMsg, msg);
                    estValide = false;
                }
            }
        }


        /**
         * Champs de type tel
         */

        let elTelInputs = elForm.querySelectorAll('input[type="tel"]');

        for (let i = 0, l = elTelInputs.length; i < l; i++) {

            if (elTelInputs[i].value != '') {

                let telephone = elTelInputs[i].value,
                    elWrapper = elTelInputs[i].closest('[data-js-control-wrapper]'),
                    elErrorMsg = elWrapper.querySelector('[data-js-error]');
            
                if (telRegex.test(telephone)) {
                    if (elWrapper.classList.contains('error')) {
                        supprimeErreur(elWrapper, elErrorMsg);
                    }
                } else {
                    let msg = 'Le numéro de téléphone saisi n\'est pas valide.';
                    ajouteErreur(elWrapper, elErrorMsg, msg);
                    estValide = false;
                }
            }
        }


        /**
         * Champs de type url
         */

        let elUrlInputs = elForm.querySelectorAll('input[type="url"]');

        for (let i = 0, l = elUrlInputs.length; i < l; i++) {

            if (elUrlInputs[i].value != '') {

                let url = elUrlInputs[i].value,
                    elWrapper = elUrlInputs[i].closest('[data-js-control-wrapper]'),
                    elErrorMsg = elWrapper.querySelector('[data-js-error]');
            
                if (urlRegex.test(url)) {
                    if (elWrapper.classList.contains('error')) {
                        supprimeErreur(elWrapper, elErrorMsg);
                    }
                } else {
                    let msg = 'L\'URL saisi n\'est pas valide.';
                    ajouteErreur(elWrapper, elErrorMsg, msg);
                    estValide = false;
                }
            }
        }


        /**
         * Champs de types radio et checkbox
         */
        let elRequiredControlWrappers = elForm.querySelectorAll('[data-js-control-wrapper="required"]');

        for (let i = 0, l = elRequiredControlWrappers.length; i < l; i++) {

            // Récupère les éléments DOM à valider
            let elInputs = elRequiredControlWrappers[i].querySelectorAll('input'),
                elErrorMsg = elRequiredControlWrappers[i].querySelector('[data-js-error]'),
                estSelectionne = false;

                
            // Valide si un radio/checkbox a été coché
            for (let n = 0, m = elInputs.length; n < m; n++) {
                if (elInputs[n].checked) estSelectionne = true;
            }
            
            // Comportements si un radio/checkbox a été coché, ou pas
            if (estSelectionne) {
                if (elRequiredControlWrappers[i].classList.contains('error')) {
                    supprimeErreur(elRequiredControlWrappers[i], elErrorMsg);
                }
            } else {
                let msg = 'Ce champ est obligatoire.';
                ajouteErreur(elRequiredControlWrappers[i], elErrorMsg, msg);
                estValide = false;
            }
        }


        // Retourne un booléen
        return estValide;

    }



    /**
     * Gestion de l'interface en cas d'erreur
     * @param {HTMLElement} el 
     * @param {HTMLElement} elErrorMsg 
     * @param {String} msg 
     */
    function ajouteErreur(el, elErrorMsg, msg) {
        el.classList.add('error');
        elErrorMsg.textContent = msg;
    }



    /**
     * Gestion de l'interface où un champ précédemment fautif est valide
     * @param {HTMLElement} el 
     * @param {HTMLElement} elErrorMsg 
     */
    function supprimeErreur(el, elErrorMsg) {
        el.classList.remove('error');
        elErrorMsg.textContent = '';
    }

});