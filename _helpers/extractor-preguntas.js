const db = require("../_helpers/db");
const translate = require('translate-google')
const Categoria = db.Categorias;

// const Pregunta = db.Pregunta;

Categoria.find().then(categoriaMongo => {let categoriaID = {}
      for (categoriaLista of categoriaMongo) {
        categoriaID[categoriaLista.nombre.en]= categoriaLista._id
  } console.log(categoriaID )
  }       
)

const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));
fetch(
  "https://opentdb.com/api.php?amount=50"
)
  .then((response) => response.json())

  .then((data) =>
    data.results.map((res) => {

      let obtenerSolucion = Math.floor(Math.random() * 4)
      let obtenerOpciones = res.incorrect_answers.splice(obtenerSolucion, (res.incorrect_answers.length + 1), res.correct_answer)
      let todasOpciones = res.incorrect_answers.concat(obtenerOpciones)
//let idCategoria = ObtenerCategoriaID(res.category)


      translate({
        question: res.question,
        options: todasOpciones
      }, { to: 'es' }).then(traduccion => {
        let PreguntaTransformada = {
          pregunta: { es: traduccion.question, en: res.question },
          opciones: { es: traduccion.options, en: todasOpciones },
          categoria: res.category,
          solucion: obtenerSolucion
        }

        //console.log(PreguntaTransformada)

        /*         let PreguntaInsertar = new Pregunta(PreguntaTransformada)
                PreguntaInsertar.save() */
      }).catch(err => {
        console.error(err)
      })
    })
  )