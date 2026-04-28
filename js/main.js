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
  $('input[name="categoria"]').on("change", function () {
    const categoria = $(this).attr("id");

    if (categoria === "todos") {
      $(".destino-item").show();
    } else {
      $(".destino-item")
        .hide()
        .filter("." + categoria)
        .show();
    }
  });
  $(".destino-item").hover(
    function () {
      $(this).find("img").stop().css("transform", "scale(1.1)");
    },
    function () {
      $(this).find("img").stop().css("transform", "scale(1)");
    },
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
  $(document).ready(function () {
    // 1. FUNCIÓN DE VALIDACIÓN (Incluye tu Regex de correo)
    function validarCampo(campo) {
      let valor = $(campo).val().trim();
      let id = $(campo).attr("id");
      let esValido = false;

      // --- TU VALIDACIÓN DE CORREO ---
      if (id === "email") {
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        esValido = regex.test(valor);
      }
      // --- VALIDACIÓN DE TELÉFONO (Exactamente 10 números) ---
      else if (id === "telefono") {
        let regexTel = /^[0-9]{10}$/;
        esValido = regexTel.test(valor);
      }
      // --- VALIDACIÓN DE DESTINO (Select) ---
      else if (id === "destino") {
        esValido = valor !== "";
      }
      // --- VALIDACIÓN GENERAL (Nombre y Mensaje) ---
      else {
        esValido = valor.length >= 3;
      }

      // Aplicamos clases visuales (is-valid de Bootstrap + tus clases de borde)
      if (esValido) {
        $(campo)
          .removeClass("is-invalid error-input")
          .addClass("is-valid valido-input");
      } else {
        $(campo)
          .removeClass("is-valid valido-input")
          .addClass("is-invalid error-input");
      }

      return esValido;
    }

    // 2. VALIDACIÓN EN TIEMPO REAL (.on('input'))
    // Esto hace que los bordes cambien mientras el usuario escribe
    $(".formulario input, .formulario textarea, .formulario select").on(
      "input change blur",
      function () {
        validarCampo($(this));
      },
    );

    // 3. EVENTO DE ENVÍO (SUBMIT)
    $(".formulario").on("submit", function (e) {
      e.preventDefault(); // Detiene el envío real para mostrar la animación

      let todoValido = true;

      // Verificamos todos los campos una última vez
      $(".formulario input, .formulario textarea, .formulario select").each(
        function () {
          if (!validarCampo($(this))) {
            todoValido = false;
          }
        },
      );

      if (todoValido) {
        const $btn = $(".btn-enviar");
        const $spinner = $(".spinner");

        // --- ESTADO DE CARGA ---
        $btn.prop("disabled", true).addClass("cargando");
        $spinner.show(); // Muestra el <span class="spinner"></span>

        // Cambiamos el texto del botón sin borrar el span
        const textoOriginal = $btn.contents().first().text();
        $btn.contents().first()[0].textContent = "Enviando... ";

        // --- RETRASO SIMULADO (2 SEGUNDOS) ---
        setTimeout(function () {
          // Restauramos el botón
          $spinner.hide();
          $btn.prop("disabled", false).removeClass("cargando");
          $btn.contents().first()[0].textContent = textoOriginal;

          // --- MOSTRAR MODAL DE CONFIRMACIÓN ---
          $("#modal-confirmacion").css("display", "flex").hide().fadeIn();

          // Limpiamos el formulario y los bordes de colores
          $(".formulario")[0].reset();
          $(
            ".formulario input, .formulario textarea, .formulario select",
          ).removeClass("is-valid valido-input");
        }, 2000);
      } else {
        // Opcional: un aviso si intentan enviar con errores
        console.log("Formulario inválido");
      }
    });

    // 4. LÓGICA PARA CERRAR EL MODAL
    $(".btn-cerrar").on("click", function (e) {
      e.preventDefault();
      $("#modal-confirmacion").fadeOut();
    });

    // Cerrar si hacen clic fuera del cuadro blanco
    $(window).on("click", function (e) {
      if ($(e.target).is("#modal-confirmacion")) {
        $("#modal-confirmacion").fadeOut();
      }
    });
  });
  
  //       BLOG
  /**********************/

  $(document).ready(function () {
    // --- 1. FILTRO POR CATEGORÍAS ---
    $('input[name="categoria-blog"]').on("change", function () {
      let categoria = $(this).attr("id");

      if (categoria === "todos") {
        $(".blog-card").fadeIn(400);
      } else {
        $(".blog-card").hide(); // Oculta todas
        $("." + categoria).fadeIn(400); // Muestra solo la elegida
      }
    });

    // --- 2. ANIMACIÓN AL HACER SCROLL ---
    function mostrarScroll() {
      $(".reveal").each(function () {
        let imagenTop = $(this).offset().top;
        let ventanaTop = $(window).scrollTop();
        let alturaVentana = $(window).height();

        // Si el elemento entra en la zona visible
        if (
          imagenTop < ventanaTop + alturaVentana - 100 &&
          imagenTop + $(this).height() > ventanaTop
        ) {
          $(this).addClass("active");
        }
        // CAMBIO AQUÍ: Si el elemento sale de la vista, le quitamos la clase
        else {
          $(this).removeClass("active");
        }
      });
    }

    // Se mantiene igual: ejecutar al scroll y al cargar
    $(window).on("scroll", mostrarScroll);
    mostrarScroll();
  });

  //       PHISHING
  /**********************/

  //     MODO OSCURO  
  /**********************/
  const body = document.body;
  const modeToggle = document.getElementById('modeToggle');
  const icono = modeToggle.querySelector('i');

  //Cargar tema guardado
  const modoGuardado = localStorage.getItem('mode');

  if (modoGuardado === 'dark') {
      body.classList.add('dark-mode');
      icono.className = 'bi bi-sun-fill';
  } else {
      icono.className = 'bi bi-moon-fill';
  }

  //Cambiar tema al hacer clic
  modeToggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark-mode');

      localStorage.setItem('mode', isDark ? 'dark' : 'light');

      icono.className = isDark
          ? 'bi bi-sun-fill'
          : 'bi bi-moon-fill';
  });

});
