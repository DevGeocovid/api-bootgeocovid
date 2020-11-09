# Api RESTFULL - CardápioRU Ufes (Alegre) 

Baseado na necessidade que identifiquei, de que houvesse uma maneira de fácil/rápido acesso aos dados contidos no website da universidade referente ao cardápio diário do restaurante, resolvi reunir essas informações a fim de posteriormente criar um aplicativo que consumirá esta api, e exibirá os dados de uma forma mais harmônica e simples, buscando proporcionar um maior bem estar para a comunidade academica.

## Por onde iniciar

Listarei abaixo informações necessárias para que se faça o consumo dos dados da api

### Pré-requisitos

Nodejs, e conhecimento em métodos de api no padrão Rest

## Guia de uso


**POST: /menu**

  **input:**
  ```
  {
    "idCardapio": "20200129-almoco-alegre",
    "title": "Almoço (Alegre)",
    "date": "02/06/2020",
    "menuJoin": "Entrada\nRepolho\nCenoura Cozida\nPrato Proteico\nFrango ao Molho Curry\nOpção\nOvos Mexidos \nAcompanhamento\nArroz e Feijão\nGuarnição\nGravatinha ao Molho de Tomate\nSobremesa\nBanana Prata"
  }
  ```


**GET: /menu**

  **result:**
  ```
  [
    {
      "_id": "5e5b17aa5e13853581bf712c",
      "idCardapio": "07022020-almoco(alegre)",
      "title": "Almoço (Alegre)",
      "date": "07/02/2020",
      "link": "http://www.ru.alegre.ufes.br/conteudo/almoco-alegre-67",
      "menuJoin": "Entrada\nTomate\nBerinjela ao Vinagrete\nPrato Proteico\nBife de Frango Empanado\nOpção\nOvo Frito\nAcompanhamento\nArroz e Feijão\nGuarnição\nPurê de Batata\nSobremesa\nMelão\n* O cardápio poderá sofrer alterações sem comunicação prévia, de acordo com as necessidades da Seção.",
      "createdAt": "2020-03-01T02:02:18.859Z",
      "updatedAt": "2020-03-01T02:02:18.859Z",
      "__v": 0
    },
    {
      "_id": "5e5b17aa5e13853581bf712d",
      "idCardapio": "07022020-almoco(jeronimomonteiro)",
      "title": "Almoço (Jerônimo Monteiro)",
      "date": "07/02/2020",
      "link": "http://www.ru.alegre.ufes.br/conteudo/almoco-jeronimo-monteiro-62",
      "menuJoin": " \nEntrada\nRepolho\nCenoura Cozida\nPrato Proteico\nFrango ao Molho Curry\nOpção\nOvos Mexidos \nAcompanhamento\nArroz e Feijão\nGuarnição\nGravatinha ao Molho de Tomate\nSobremesa\nBanana Prata\n* O cardápio poderá sofrer alterações sem comunicação prévia, de acordo com as necessidades da Seção.",
      "createdAt": "2020-03-01T02:02:18.870Z",
      "updatedAt": "2020-03-01T02:02:18.870Z",
      "__v": 0
    },
    .
    .
    .
  ]
  ```


  **GET: /menu/:idCardapio** ->  *ex:"idCardapio": "07022020-almoco(alegre)"*

  **result:**
  ```
  {
    "_id": "5e5b17aa5e13853581bf712c",
    "idCardapio": "07022020-almoco(alegre)",
    "title": "Almoço (Alegre)",
    "date": "07/02/2020",
    "link": "http://www.ru.alegre.ufes.br/conteudo/almoco-alegre-67",
    "menuJoin": "Entrada\nTomate\nBerinjela ao Vinagrete\nPrato Proteico\nBife de Frango Empanado\nOpção\nOvo Frito\nAcompanhamento\nArroz e Feijão\nGuarnição\nPurê de Batata\nSobremesa\nMelão\n* O cardápio poderá sofrer alterações sem comunicação prévia, de acordo com as necessidades da Seção.",
    "createdAt": "2020-03-01T02:02:18.859Z",
    "updatedAt": "2020-03-01T02:02:18.859Z",
    "__v": 0
  }
  ```

## Authors

* **Matheus Rocha** - [Linkedin](https://www.linkedin.com/in/matheuzsr/)

