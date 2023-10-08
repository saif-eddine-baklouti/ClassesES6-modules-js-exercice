/**
 * Instanciation de Formulaire pour chaque élément identifié par l'attribut data-js-form (ici un)
 */
    import Formulaire from "./Formulaire.js";
    

(function() {
    
    let elForm = document.querySelectorAll('[data-js-form]')

    for (let i = 0; i < elForm.length; i++) {
        
        new Formulaire(elForm[i]);
        
    }

})();


