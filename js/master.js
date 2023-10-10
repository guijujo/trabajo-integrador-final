let dataslide = -1;
let slide = 0;

let productosHTML = document.querySelector(".productos");
let productosIndicador = document.querySelector(".productosIndicador");
let descripcionProducto = document.querySelector(".descripcionProducto");

fetch("./datos/productos.json")
  .then((Respuesta) => Respuesta.json())
  .then((productos) => {
    productos.forEach((producto, index) => {
      let activo = "";
      if (index == 0) {
        activo = "active";
      }
      console.log(producto);
      productosIndicador.innerHTML += `
        <button type="button" data-bs-target="#carruselCelulares" data-bs-slide-to="${(dataslide += 1)}" class="${activo}" aria-current="${producto.ariaCurrent
        }" aria-label="Slide ${(slide += 1)}"></button>
        `;
      productosHTML.innerHTML += `
        
                        <div class="carousel-item ${activo}">
                        <img src="${producto.imagen[0]
        }" class="d-block w-100 img-fluid" alt="${producto.nombre
        }">
                        <div class="carousel-caption d-block d-md-block">
                        <div class="descripcion my-5 fs-6">
                        <h5>${producto.nombre}</h5>
                            </div>
                                <a   id='${JSON.stringify(
          producto
        )}' href= '#' class='btn btn-outline-primary d-block botonDetalle'>Ver detalle</a>
                            </div>
                        </div>
                        </div>

        `;
    });
    let botonDetalle = document.querySelectorAll(".botonDetalle");

    let arrayMiListaDeProductos;

    let miObjeto;

    let codigo;

    botonDetalle.forEach((productoSeleccion) => {
      productoSeleccion.addEventListener("click", function (e) {
        e.preventDefault();

        let miListaDeProductos = localStorage.getItem("detallesProducto");
        if (miListaDeProductos == null) {
          arrayMiListaDeProductos = [];
        } else {
          arrayMiListaDeProductos = JSON.parse(miListaDeProductos);
        }

        arrayMiListaDeProductos.push(this.id);

        miObjeto = JSON.parse(arrayMiListaDeProductos[0]);

        codigo = miObjeto.codigo;

        localStorage.setItem(
          "detallesProducto",
          JSON.stringify(arrayMiListaDeProductos)
        );

        location.href = `detalle.html?codigo=${codigo}`;
      });
    });
  })

  .catch((error) => {
    console.log("Ha ocurrido en error " + error);
  });

  let saludo = document.querySelector(".saludo");
  saludo.addEventListener("click", function () {
    Swal.fire({
      title: '¡Saludo especial!',
      text: 'Quiero dedicar unas lineas al profesor Ángel Daniel Fuentes por habernos enseñado un montón con mucha dedicación, le deseo una muy pronta recuperación y siga compartiendo todo ese gran conocimiento que tiene con sus alumnos y colegas. Que tenga buen código y siga fachero con ese buen master.css y tan funcional como el master.js',
      imageUrl: 'https://www.helpargentina.org/images/default/ong/untref_logos_01_sinmarcas.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  })
