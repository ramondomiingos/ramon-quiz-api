const mongoose = require('mongoose')

const QuestionScheema = new mongoose.Schema({
    description:String,
    quiz:  { type: mongoose.Schema.Types.ObjectId, ref : 'Quiz'},
    correct:Number,
    alternatives:Array
})
module.exports = mongoose.model('Question', QuestionScheema)
/**{
      "description":"Sobre os mamíferos, marque a alternativa incorreta:",
      "alternatives":[
        "Pelos, glândulas, dentes diferenciados e a presença de diafragma caracterizam os mamíferos.",
        "Mamíferos excretam ureia.",
        "Todas as fêmeas de mamíferos possuem mamas.",
        "A maioria dos mamíferos pertence ao grupo dos eutérios, tendo como principal característica a presença de placenta bem desenvolvida e duradoura."
      ],
      "correct":2
    }
     */