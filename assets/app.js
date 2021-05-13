/*Ejercicios Basicos JS Nivel 9
27. Programa una clase llamada Pelicula.

La clase recibirá un objeto al momento de instanciarse con los siguentes datos: id de la película en IMDB, titulo, director, año de estreno, país o países de origen, géneros y calificación en IMBD.
  - Todos los datos del objeto son obligatorios.
  - Valida que el id IMDB tenga 9 caracteres, los primeros 2 sean letras y los 
     7 restantes números.
  - Valida que el título no rebase los 100 caracteres.
  - Valida que el director no rebase los 50 caracteres.
  - Valida que el año de estreno sea un número entero de 4 dígitos.
  - Valida que el país o paises sea introducidos en forma de arreglo.
  - Valida que los géneros sean introducidos en forma de arreglo.
  - Valida que los géneros introducidos esten dentro de los géneros 
     aceptados*.
  - Crea un método estático que devuelva los géneros aceptados*.
  - Valida que la calificación sea un número entre 0 y 10 pudiendo ser 
    decimal de una posición.
  - Crea un método que devuelva toda la ficha técnica de la película.
  - Apartir de un arreglo con la información de 3 películas genera 3 
    instancias de la clase de forma automatizada e imprime la ficha técnica 
    de cada película.

* Géneros Aceptados: Action, Adult, Adventure, Animation, Biography, Comedy, Crime, Documentary ,Drama, Family, Fantasy, Film Noir, Game-Show, History, Horror, Musical, Music, Mystery, News, Reality-TV, Romance, Sci-Fi, Short, Sport, Talk-Show, Thriller, War, Western.
    */

//Soluciones:

//--------------------------------------------------------------------------------------------

//E27.Solucion 
console.log("-----------------------------------------------------------------------------------")
console.log("Ejercicio 27:")

//["Action","Adult", "Adventure", "Animation", "Biography","Comedy", "Crime", "Documentary" ,"Drama", "Family", "Fantasy", "Film Noir", "Game-Show", "History", "Horror", "Musical", "Music", "Mystery", "News", "Reality-TV", "Romance", "Sci-Fi", "Short", "Sport", "Talk-Show", "Thriller", "War", "Western"]

class Pelicula {
    constructor({id,titulo,director,estreno,pais,generos,calificacion}) {
        this.id = id;
        this.titulo = titulo;
        this.director =director;
        this.estreno = estreno;
        this.pais = pais;
        this.generos = generos;
        this.calificacion = calificacion;

        this.validarIMDB(id);
        this.validarTitulo(titulo);
        this.validarDirector(director);
        this.validarEstreno(estreno);
        this.validarPais(pais);
        this.validarGeneros(generos);
        this.validarCalificacion(calificacion)

    }
    //validaciones

    static get listaGeneros() {
        return ["Action","Adult", "Adventure", "Animation", "Biography","Comedy", "Crime", "Documentary" ,"Drama", "Family", "Fantasy", "Film Noir", "Game-Show", "History", "Horror", "Musical", "Music", "Mystery", "News", "Reality-TV", "Romance", "Sci-Fi", "Short", "Sport", "Talk-Show", "Thriller", "War", "Western"];
    }

    static generosAceptados(){
        return console.info(`Los generos aceptados son: ${Pelicula.listaGeneros.join(", ")}`);
    }

    validarCadena(propiedad,valor){
        if (!valor) return console.warn(`${propiedad} "${valor}" esta vacío.`);
        if (typeof valor !== "string") return console.error(`${propiedad} "${valor}" ingresado, NO es una cadena de texto.`);
        
        return true;
    }

    validarNumero(propiedad,valor){
        if(!valor) return console.warn(`${propiedad} "${valor}" esta vacio.`);
        if (typeof valor !== "number") return console.error(`${propiedad} "${valor}" ingresado, NO es una número.`);

        return true
    }

    validarLongitudCadena(propiedad,valor,longitud) {
        if (valor.length > longitud) return console.error(`${propiedad} "${valor}" excede el número de caracteres permitidos (${longitud}).`);

        return true;
    }

    validarArreglo(propiedad, valor) {
        if(!valor) return console.warn(`${propiedad} "${valor}" esta vacio.`);
        if (!(valor instanceof Array)) return console.error('El valor que ingresaste no es un arreglo')
        if (valor.length===0) return console.error(`${propiedad} "${valor}" no tiene datos.`)
        for (let cadena of valor) {
            if(typeof cadena !== "string") return console.error(`El valor "${cadena}" ingresado, NO es una cadena de texto.`)
        }
        return true;
    }

    validarIMDB (id) {
        if (this.validarCadena("IMBD id",id))
            if (!(/^([a-z]){2}([0-9]){7}$/.test(id)))
                return console.error(`IMDB id "${id}" no es válido, debe tener 9 caracteres, los 2 primeros letras minúsculas, los 7 restantes números.`)
    }

    validarTitulo (titulo) {
        if (this.validarCadena("Título",titulo))
            this.validarLongitudCadena("Título",titulo,100);
    }

    validarDirector (director) {
        if (this.validarCadena("Director",director))
            this.validarLongitudCadena("Director",director,50);
    }

    validarEstreno (estreno) {
        if (this.validarNumero("Año de Estreno",estreno))
            if (!(/^([0-9]){4}$/.test(estreno)))
                return console.error(`Año de Estreno "${estreno}" no es válido, debe ser un número de 4 digitos.`)
    }

    validarPais(pais) {
        this.validarArreglo("Pais",pais)
    }

    validarGeneros(generos) {
        if (this.validarArreglo("Generos",generos)){
            for (let genero of generos) {
                /* console.log(genero, Pelicula.listaGeneros.includes(genero)) */
                if(!Pelicula.listaGeneros.includes(genero)){
                    console.error(`Generos no validos "${generos.join(", ")}"`);
                    Pelicula.generosAceptados();
                }
            }
        }
    }

    validarCalificacion (calificacion) {
        if (this.validarNumero("Calificacion",calificacion))
            return (calificacion <0 || calificacion >10)
            ?console.error(`la calificacion debe estar entre 0 y 10`)
            :this.calificacion = calificacion.toFixed(1);
    }

    fichaTecnica(){
        console.info(`Ficha Técnica:\nTitulo:"${this.titulo}"\nDirector:"${this.director}"\nAño:"${this.estreno}"\nPaís:"${this.pais.join("-")}"\nGéneros:"${this.generos.join(", ")}"\nCalificación:"${this.calificaccion}"\nIMDB Id:"${this.id}"`)
    }
}

/* Pelicula.generosAceptados(); */

/* const peli = new Pelicula({
    id:"tt0088763",
    titulo:"Back to the Future",
    director:"Robert Zemeckis",
    estreno:1985,
    pais:["USA"],
    generos:["Comedy","Western"],
    calificacion: 10
}); 

peli.fichaTecnica();
*/

const misPelis = [
    {
        id:"tt0088763",
        titulo:"Back to the Future",
        director:"Robert Zemeckis",
        estreno:1985,
        pais:["USA"],
        generos:["Comedy","Adventure","Sci-Fi"],
        calificacion: 8.5
    },
    {
        id:"tt0120737",
        titulo:"The Lord of the Rings: The Fellowship of the Ring",
        director:"Peter Jackson",
        estreno:2001,
        pais:["USA"],
        generos:["Action","Adventure","Drama"],
        calificacion: 8.8
    },
    {
        id:"tt0133093",
        titulo:"The Matrix",
        director:"Lana Wachowski",
        estreno:1999,
        pais:["USA"],
        generos:["Action","Sci-Fi"],
        calificacion: 8.7
    }
];

misPelis.forEach(el=> new Pelicula(el).fichaTecnica());

