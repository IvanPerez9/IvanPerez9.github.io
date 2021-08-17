import Translator from "./translator.js";

/*======= Translator =======*/
var translator = new Translator({
    persist: false,
    languages: ["en", "es"],
    defaultLanguage: "es",
    detectLanguage: true,
    filesLocation: "/i18n"
  });
  
translator.load();

document.querySelector("form").addEventListener("click", function(evt) {
    if (evt.target.tagName === "INPUT") {
      translator.load(evt.target.alt);
      window.location.reload();
    }
  });

/*======= Transition =======*/
$('body').hide();

$(document).ready(function() {
    $('body').fadeIn(1200, function() {
        $('a[href], button[href]').click(function(event) {
            var url = $(this).attr('href');
            if (url.indexOf('#') == 0 || url.indexOf('javascript:') == 0) return;
            event.preventDefault();
            $('body').fadeOut(1200, function() {
                window.location = url;
            });
        });
    });
});

/*======== Toggle =========== */

/*
var bool = true;
function getTheme() {
    function changeTheme(theme){
        let a = document.getElementById('style');
        a.href = theme;
    }
    bool = !bool;
    let prueba = localStorage.getItem('data-theme');
    console.log(prueba)
    var theme = bool ? 'assets/css/index.css' : 'assets/css/toggleDarkLight.css';
    changeTheme()
}
*/