$(document).ready(function () {
    // HOME
    // Ocultar elementos inicialmente
    $(".hero-title, .hero-subtitle, .btn-hero").hide();

    // Animaciones
    $(".hero-title, .hero-subtitle, .btn-hero").hide();

    $(".hero-title").fadeIn(1200);

    $(".hero-subtitle").delay(600).fadeIn(1200);

    $(".btn-hero").delay(1200).fadeIn(1200);

    //FUNCION DE AMIMACION DE CONTADORES
    function animarContador() {
        $(".numero").each(function () {

            let $this = $(this);
            let target = parseInt($this.attr("data-target"));

            $({ countNum: 0 }).animate({
                countNum: target
            }, {
                duration: 3500,
                easing: "swing",
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(target + (target === 100 ? "%" : "+"));
                }
            });
        });
    }

    // SIMULAR CUANDO CARGA LA PAGINA
    animarContador();

    //ANIMACION DE CARRUSEL
    let index = 0;
    let total = $(".testimonio").length;

    function cambiarSlide() {
        index++;

        if (index >= total) {
            index = 0;
        }

        $(".carrusel-track").css(
            "transform",
            "translateX(" + (-index * 100) + "%)"
        );
    }

    // Cada 10 segundos
    setInterval(cambiarSlide, 10000);


    // DESTINOS
    // AGENCIAS
    // CONTACTO
    // PRECIOS
    // BLOG
    // PHISHING
});