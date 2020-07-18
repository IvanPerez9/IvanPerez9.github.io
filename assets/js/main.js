import Translator from "./translator.js";

/* Translator */
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
      translator.load(evt.target.alt);
    }
  });

/* Transition */
$('html, body').hide();

$(document).ready(function() {
    $('html, body').fadeIn(600, function() {
        $('a[href], button[href]').click(function(event) {
            var url = $(this).attr('href');
            if (url.indexOf('#') == 0 || url.indexOf('javascript:') == 0) return;
            event.preventDefault();
            $('html, body').fadeOut(600, function() {
                window.location = url;
            });
        });
    });
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