// Peticiones con axios 
const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
  });
  api.defaults.headers.common['X-API-KEY'] = 'live_sQ4XomDixqsGepIOsX1rSHef15HXZpOwBCXmI58duBRmKo14LLfPqCtt6EdZlplP';
  
  // Autenticación de la api para mejorar el manejo de la interfaz Y noos permita ver por consola cuantas imagenes llegan a nuestro navegador.
  const APIKEY='api_key=live_sQ4XomDixqsGepIOsX1rSHef15HXZpOwBCXmI58duBRmKo14LLfPqCtt6EdZlplP';
  
  // Endpoints = api.thecatapi.com/v1/images y query parameters = /search?&limit=3
  const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?${APIKEY}&limit=3`;
  
  // ENDPOINTS para el POST
  const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';
  
  // ENDPOINTS para el DELETE
  const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?${APIKEY}`;
  
  const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';
  
  const spanError = document.getElementById('error');
  
  async function loadRandomMichis() {
    const res = await fetch(API_URL_RANDOM); //solicitud
    const data = await res.json(); //transforma a json
  console.log('RANDOM');
    console.log(data)
  
    //   Condicional
    if (res.status !== 200) {
    spanError.innerHTML = 'Hubo un error: ' + res.status;  
    } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    // Botones para sacar michis
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    
    img1.src = data[0].url; //src de la img que aya cargado la api
    img2.src = data[1].url;
    img3.src = data[2].url;
  
  // Botones Guarda los michi en favoritos / data de los datos, [0] del primer elemento y id de cada una de las imagenes
  // Si metemos la function que llamamos saveFavouriteMichi dentro de un arrow function evitamos que al recargar el navegador se dupliquen las imagenes al llamarlas, hacia michis favoritos.  
   btn1.onclick = () => saveFavouriteMichi(data[0].id);
   btn2.onclick = () => saveFavouriteMichi(data[1].id);
   btn3.onclick = () => saveFavouriteMichi(data[2].id);
  
    }
  }
  // GET: leyendo michis favoritos
  async function loadFavouritesMichis() {
    const res = await fetch(API_URL_FAVORITES, {
      method: 'GET',
      headers: {
      'X-API-KEY': 'live_sQ4XomDixqsGepIOsX1rSHef15HXZpOwBCXmI58duBRmKo14LLfPqCtt6EdZlplP',
      },
    });
    const data = await res.json();
    console.log('FAVORITES');
    console.log(data)
      //   Condicional
      if (res.status !== 200) {
          spanError.innerHTML = 'Hubo un error: ' + res.status + data.message;  
        } else {
          // limpiar nuestra <section>
        const section = document.getElementById('favoriteMichis')
        section.innerHTML = ""; //Borra todos los section
        // const h2 = document.createElement('h2');
        // const h2Text = document.createTextNode('Michis favoritos');
        // h2.appendChild(h2Text);
        // section.appendChild(h2);
  
         // Nodos de HTML
      data.forEach(michi => {
          const article = document.createElement('article');
          const img = document.createElement('img');
          const btn = document.createElement('button');
          //Crear texto para nuestro nodo de HTML 
          const btnText = document.createTextNode('Sacar al michi de favoritos');
          
          // LLamadas para meterle por dentro el texto 
          img.src = michi.image.url; //Array de api, imagen
          // img.width = 150;
          btn.appendChild(btnText);
          btn.onclick = () => deleteFavouriteMichi(michi.id); //Boton que elimina a michi de favoritos
          article.appendChild(img);
          article.appendChild(btn);
          section.appendChild(article)
      });    
    }
  }
  
  // El método HTTP POST se utiliza para enviar datos al servidor para que sean procesados.
  // Guarda los michi en favoritos
    async function saveFavouriteMichi(id) {
    // axios
    const { data, status } = await api.post('/favourites', {
      image_id: id,
    });
      // const res = await fetch(API_URL_FAVORITES, {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json', //lenguaje que se habla entre frontend y backend
      //      'X-API-KEY': 'live_sQ4XomDixqsGepIOsX1rSHef15HXZpOwBCXmI58duBRmKo14LLfPqCtt6EdZlplP',
      //       },
      //     body: JSON.stringify({ //convierte objeto json a una cadena string
      //         image_id: id
      //     }),
      // });
     
      // const data = res.json();
        
      console.log('SAVE');
      // console.log(res);
     
      if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status + data.message;  
      } else {
        console.log('Michi guardado en favoritos');
        loadFavouritesMichis();
      }
    }
  
    // DELETE
     async function deleteFavouriteMichi(id) {
       const res = await fetch(API_URL_FAVORITES_DELETE(id), {
       method: 'DELETE',
        });
        const data = res.json(); 
  
        if (res.status !== 200) {
          spanError.innerHTML = "Hubo un error: " + res.status + data.message; 
        } else {
          console.log('Michi Eliminado de favoritos');
          loadFavouritesMichis();
        }
       } 
  
      async function unploadMichiPhoto() {
         const form = document.getElementById('uploadingForm')
         const formData = new FormData(form);
  
         console.log(formData.get('file'));
  
         const res = await fetch(API_URL_UPLOAD, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'miltipart/form-data',
            'X-API-KEY': 'live_sQ4XomDixqsGepIOsX1rSHef15HXZpOwBCXmI58duBRmKo14LLfPqCtt6EdZlplP',   
           },
           body: formData,
         });
         const data = await res.json(); 
  
         if (res.status !== 201) {
           spanError.innerHTML = "Hubo un error: " + res.status + data.message; 
         } else {
           console.log('Foto de Michi subida :)');
           console.log({data});
           console.log(data.url);
           saveFavouriteMichi(data.id)
         }
      } 
    
  loadRandomMichis();
  loadFavouritesMichis();
  