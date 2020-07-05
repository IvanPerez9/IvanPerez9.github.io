import Translator from "./translator.js";

var translator = new Translator({
    persist: false,
    languages: ["en", "es"],
    defaultLanguage: "en",
    detectLanguage: true,
    filesLocation: "/i18n"
  });
  
translator.load();

document.querySelector("form").addEventListener("click", function(evt) {
    if (evt.target.tagName === "INPUT") {
      translator.load(evt.target.value);
    }
  });

jQuery(document).ready(function($) {
    /*======= Skillset *=======*/
    $('.level-bar-inner').css('width', '0');
    
    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {
        
            var itemWidth = $(this).data('level');
            
            $(this).animate({
                width: itemWidth
            }, 800);
            
        });

    });
   
    

});