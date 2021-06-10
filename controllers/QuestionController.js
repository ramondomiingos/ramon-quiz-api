var shortid = require('shortid');
const { check, validationResult } = require('express-validator');

const Quiz = require('../models/quiz')
const Questions =  require('../models/question')
module.exports = {
    async create(req,res,next){
        if(req.typeUser !== '1'){
            return res.status(422).json({ message: 'Only teachers can create quiz.' });
        }
        questionsList = req.body.questions
        await check('questions.*.description').exists().run(req);
        await check('questions.*.correct').exists().run(req);
        await check('questions.*.alternatives').exists().run(req);
        await check('questions.*').custom(async function (value) {
           let QuantAlter = value.alternatives.length -1
          if(   value.correct > QuantAlter ){   
            throw new Error('The correct alternative must be one of the informed options');
          }
          if( !Array.isArray(value.alternatives) ){
            throw new Error('Alternatives must be an array');
        }
         }).withMessage('The correct alternative must be one of the informed options').run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        Quiz.create({
            createdAt: Date(),
            available:false,
            createdBy:req.userId,
          }).then(quiz =>{
               let idQuiz = quiz._id
                let questions = []
               for (var ind in questionsList){
                questions.push(
                   { 
                        description: questionsList[ind].description,
                        quiz: idQuiz,
                        correct: questionsList[ind].correct,
                        alternatives: questionsList[ind].alternatives
                   }
                )
               }

               Questions.create(questions)
               .then(ques => res.status(200).send({'message':'Quiz cadastrado com sucesso!', _id:ques._id} ))
               .catch(err=> res.status(400).send(err ))
    
               
            });
       
    },   
    async find(req, res){
       let quiz =  await Quiz.findOne({_id:req.params.id}).populate('questions')   
        .catch(err=>  res.status(400).send({erro:err}))
       let question = await Questions.find({quiz:req.params.id})
        .catch(err=>  res.status(400).send({erro:err}))
       quiz['questions'] =  question
       res.status(200).send(quiz);
        
    }
}