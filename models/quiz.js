const mongoose = require('mongoose')

const QuizScheema = new mongoose.Schema({
    createdAt:Date,
    available:Boolean,
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref : 'User'},
    questions:[
        {type: mongoose.Schema.Types.ObjectId,ref:'Question'}
    ]
})
module.exports = mongoose.model('Quiz', QuizScheema)
/*
{
  "id":"5e208c18d598b806c869ca37",
  "created_id": 1623276887,
  "available":false,
  "questions":[
    {
      "description":"Sobre os mamíferos, marque a alternativa incorreta:",
      "alternatives":[
        "Pelos, glândulas, dentes diferenciados e a presença de diafragma caracterizam os mamíferos.",
        "Mamíferos excretam ureia.",
        "Todas as fêmeas de mamíferos possuem mamas.",
        "A maioria dos mamíferos pertence ao grupo dos eutérios, tendo como principal característica a presença de placenta bem desenvolvida e duradoura."
      ],
      "correct":2
    },
     {
      "description":"(UFPI) Na Classe Mammalia, quando nos referimos aos cetáceos, quirópteros, carnívoros, roedores e edentados, estamos falando dos seguintes animais:",
      "alternatives":[
        "Baleia, morcego, tigre, rato e tatu.",
        "Peixe-boi, canguru, tigre, coelho e zebra.",
        "Peixe-boi, morcego, rato, porco e tatu.",
        "Baleia, canguru, tigre, rato e zebra.",
        "Peixe-boi, morcego, tigre, porco e zebra."
      ],
      "correct":0
    }
    ]
}
*/ 