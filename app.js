const http = require('http');
const fs = require('fs');

let modulo = require ("./modulo");

// Servidor
http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	
	// Route System
	switch (req.url) {
		// Home
		case '/':
			//   home lista de peliculas

			let titulo =	modulo.movies.map(function(listaTitulos){
				return (" <br>" + listaTitulos.title )
			})

			let contain = `
			
			<div align='center'>Bienvenidos a DH Movies el mejor sitio para encontrar las mejores películas, incluso mucho mejor que Netflix, Cuevana y PopCorn. </div>
			<br>
			<br>
			         <div align='center'>Total de peliculas: ${modulo.movies.length} .</div>
			<br>
			<br>
			         <div align='center'>Listado de peliculas:</div> 
			<br>
			        <div align='center'> 
			        ${titulo}</div> 
			<br>
			<br>
			<br>
			<br>
			<hr>
			         <div align='center'>
			Recordá que podés visitar las secciones: 
			<a href=/en-cartelera >Cartelera</a> 
			<a href=/mas-votadas >Mas Votados</a>
			<a href="/sucursales" >Sucursales</a>
			<a href="/contacto" >Contacto</a>
			<a href="/preguntas-frecuentes" >Preguntas Frecuentes</a>
			</div>
			`
			res.end(contain);
			break;
		// En cartelera
		case '/en-cartelera':

            //    cartelera lista de titulos y reseñas
			let resena = " "
			for (i = 0; i <= 19; i++){     
			 resena += ("-" + modulo.movies[i].title + " :" + "<br>" + modulo.movies[i].overview ) + "<br>"; }
		   
		  let containCartelera = 
		     ` <a href=/ > Home </a>  <div align='center'>  En cartelera </div>
		     <br>
		     <br>
		     <div align='center'>Total de peliculas: ${modulo.movies.length}.
		     </div>
		     <br>
		     <br>
		     <div align='center'>Listado de peliculas en cartelera: </div>
		     <br>
		     <br>
		     <div align='center'> ${resena} 
		     </div>

		     <div align='center'>
		     </div>

		     `
			res.end( containCartelera);
			break;


		case '/mas-votadas':

			let listaPromedioSiete = " "
			for (i = 0; i <= 19; i++){     
				if ( modulo.movies[i].vote_average >= 7){ 
					listaPromedioSiete = 
					listaPromedioSiete + ("<br>" + modulo.movies[i].title + "<br>"+ modulo.movies[i].vote_average + modulo.movies[i].overview + "<br>");
				    }}

			let containVotadas = `<a href=/ > Home </a>  <div align='center'> Más Votadas  </div>
			<br>
			<br>
			<div align='center'>Total de películas : ${ modulo.votosMas}</div>
			<br>
			<br>
			<br>
			<div align='center'>Rating promedio de los mas votados: ${ modulo.promedioVotos().toFixed(2)} </div>
			<br>
			<br>
			<br>
			<div align='center'> 
			Listados de películas con puntaje mayor a 7: 
			<br>
			${listaPromedioSiete}
			</div>
		
			` 
		 
			res.end ( containVotadas);
			break;
		case '/sucursales':

	// listado nombre y descripcion
	            let descripcionDeSala = " "
	            for (i = 0; i <= 3; i++){     
			   descripcionDeSala = descripcionDeSala + (modulo.theaters[i].name + "<br>" + modulo.theaters[i].address + modulo.theaters[i].description + "<br>");
                      }
			let sucursal = `<a href=/ > Home </a> <div align='center'>   Nuestras Salas </div>
			<br>
			<br>
			<br>
			<br>
			<div align='center'>Total de Salas: ${modulo.theaters.length}.
			</div>
			<br>
			<br>
			<div align='center'>
			Listados de salas: <br>
			 ${descripcionDeSala}
			 </div>
			
			` 
			res.end(sucursal);
			break;

		case '/contacto':
			let containContacto = `<a href=/ > Home </a>  <div align='center'> Contacto </div>
			
                  <div align='center'> ¿Tenés algo para contarnos? Nos encanta escuchar a nuestros
                  clientes. Si deseas contactarnos podés escribirnos al siguiente email:
                  dhmovies@digitalhouse.com o en las redes sociales. Envianos tu consulta,
                  sugerencia o reclamo y será respondido a la brevedad posible. Recordá que
                  también podes consultar la sección de Preguntas Frecuentes para obtener
                  respuestas inmediatas a los problemas más comunes.</div>
			
			
			`
			res.end
			(containContacto);
			break;
		case '/preguntas-frecuentes':

		     let listadoPreguntas = " "
		     for (i = 0 ; i <= 4; i++){
                     listadoPreguntas = listadoPreguntas + ("<br >" + modulo.faqs[i].faq_title + "<br>" + modulo.faqs[i].faq_answer + "<br>")
		     }

			let containPreguntas = `<a href=/ > Home </a>  <div align='center'>    Preguntas Frecuentes </div> <br>
			<div align='center'> Total de preguntas : ${modulo.faqs.length} </div>
			<br> 
		  <div align='center'> Preguntas y respuestas: <br> ${listadoPreguntas} </div>
			`
			res.end(containPreguntas);
			break;
		default:
			res.end('404 not found')
	}
}).listen(3030, 'localhost', () => console.log('Server running in 3030 port'));