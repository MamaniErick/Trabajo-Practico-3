$(document).ready(function () {
  
  //       HOME
  /*****************/

  //Ocultar elementos inicialmente
  $(".hero-title, .hero-subtitle, .btn-hero").hide();
  //Animaciones
  $(".hero-title, .hero-subtitle, .btn-hero").hide();
  $(".hero-title").fadeIn(1200);
  $(".hero-subtitle").delay(600).fadeIn(1200);
  $(".btn-hero").delay(1200).fadeIn(1200);
  //Funcion de Contadores
  function animarContador() {
    $(".numero").each(function () {
      let $this = $(this);
      let target = parseInt($this.attr("data-target"));

      $({ countNum: 0 }).animate(
        {
          countNum: target,
        },
        {
          duration: 3500,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(target + (target === 100 ? "%" : "+"));
          },
        },
      );
    });
  }
  //Simular cuando la pagina se carga
  animarContador();
  //Animacion Carrusel
  let index = 0;
  let total = $(".testimonio").length;
  function cambiarSlide() {
    index++;

    if (index >= total) {
      index = 0;
    }

    $(".carrusel-track").css("transform", "translateX(" + -index * 100 + "%)");
  }
  // Cada 10 segundos
  setInterval(cambiarSlide, 10000);
  //Validar formulario
  let email = $(this).val().trim();
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(email)) {
    $(this).removeClass("is-invalid").addClass("is-valid");
  } else {
    $(this).removeClass("is-valid").addClass("is-invalid");
  }

  //     DESTINOS
  /******************/
  $('input[name="categoria"]').on('change', function () {

      const categoria = $(this).attr('id');

      if (categoria === 'todos') {
          $('.destino-item').show();
      } else {
          $('.destino-item')
              .hide()
              .filter('.' + categoria)
              .show();
      }

  });
  $('.destino-item').hover(
    function () {
        $(this).find('img').stop().css('transform', 'scale(1.1)');
    },
    function () {
        $(this).find('img').stop().css('transform', 'scale(1)');
    }
  );


  //     AGENCIAS
  /******************/
  // Giro de la carta
  $(".tarjeta-flip").on("click", function () {
    $(this).find(".tarjeta-inner").toggleClass("girada");
  });
  // Lógica de estrellas
  $(".estrella").on("click", function (e) {
    e.stopPropagation(); // BLOQUEA el giro de la carta al calificar

    let valor = $(this).data("value");
    let contenedor = $(this).parent();

    // Quitamos el amarillo fijo anterior
    contenedor.find(".estrella").removeClass("activa");

    // Pintamos de amarillo fijo hasta la estrella clicqueada
    contenedor.find(".estrella").each(function () {
      if ($(this).data("value") <= valor) {
        $(this).addClass("activa");
      }
    });

    console.log("Votaste con: " + valor);
  });

  //       PRECIOS
  /**********************/
  $('[data-bs-toggle="tooltip"]').tooltip();
  

  //       CONTACTOS
  /**********************/
  //NICO SI QUERES PROBAR EL CODIFO PARA VALIDAR CORREO
  //QUE PUSE PARA EL FOOTER DEL HOMO, ESTA EN LA LINEA 52
  //DE MAIN.JS


  //       BLOG
  /**********************/


  //       PHISHING
  /**********************/
});
