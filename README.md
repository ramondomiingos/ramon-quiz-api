# ramon-quiz-api
RESTApi usando node-Express + MongoDb para aplicação de questionários.
[https://ramon-quiz.herokuapp.com/](https://ramon-quiz.herokuapp.com/)
# Instruções Inicials
É necessario um criar configurações
de ambiente, com as seguintes informações:

´´´
SECRET_JWT= XX
MONGOUSER=XXX
MONGOPASS=XXXX
PORT=XXxx
´´´
 
 ### para fins didático, estou utlizando o MongoDb Atlas .mongodb.net

 ## POST /new-user
body
```json

{
	"password":"123456",
	"confirmpassword":"123456",
	"name":"joao",
	"username": "joazinho",
    "typeUser":1
}
```
## POST /auth
body
```json

{
	"password":"123456",
	"username": "joazinho"
}
```
## GET /profile
headers['authorization'] = 'Bearer <token>'
```json


	{
        "_id": "5ec050b7463996267471f9dc",
        "username": "joazinho",
        "name": "joao",
        "created_at": "2020-05-16T20:44:39.000Z",
        "typeUser":1,
        "__v": 0
    }
```
## POST /question
```json
{
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
```
## GET /profile:id
```json
{
  "questions": [
    {
      "alternatives": [
        "Pelos, glândulas, dentes diferenciados e a presença de diafragma caracterizam os mamíferos.",
        "Mamíferos excretam ureia.",
        "Todas as fêmeas de mamíferos possuem mamas.",
        "A maioria dos mamíferos pertence ao grupo dos eutérios, tendo como principal característica a presença de placenta bem desenvolvida e duradoura."
      ],
      "_id": "60c171a974eaf73060a26542",
      "description": "Sobre os mamíferos, marque a alternativa incorreta:",
      "quiz": "60c171a974eaf73060a26541",
      "correct": 2,
      "__v": 0
    },
    {
      "alternatives": [
        "Baleia, morcego, tigre, rato e tatu.",
        "Peixe-boi, canguru, tigre, coelho e zebra.",
        "Peixe-boi, morcego, rato, porco e tatu.",
        "Baleia, canguru, tigre, rato e zebra.",
        "Peixe-boi, morcego, tigre, porco e zebra."
      ],
      "_id": "60c171a974eaf73060a26543",
      "description": "(UFPI) Na Classe Mammalia, quando nos referimos aos cetáceos, quirópteros, carnívoros, roedores e edentados, estamos falando dos seguintes animais:",
      "quiz": "60c171a974eaf73060a26541",
      "correct": 0,
      "__v": 0
    }
  ],
  "_id": "60c171a974eaf73060a26541",
  "createdAt": "2021-06-10T01:58:01.000Z",
  "available": false,
  "createdBy": "60c14dec4b4d501af44bc3fd",
  "__v": 0
}
```
