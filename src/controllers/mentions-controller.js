const mongoose = require('mongoose');
const {validationResult} = require('express-validator');
const repository = require('../repositories/mentions-repository');
const repository2 = require('../repositories/mentions-repository2')
const testes = require('../repositories/testes-repository');
const testes2 = require('../repositories/testes2');


const Story = mongoose.model('Story');
const Person = mongoose.model('Person');

//create
exports.createMention = async (req, res) => {
  const {errors} = validationResult(req);
  
  if (errors.length > 0){
    return res.status(400).send({message: errors})
  }

  try{
    await repository.createMention({
      friend: req.body.friend,
      mention: req.body.mention,
      vara: req.body.vara
    });
    return res.status(201).send({message: 'Menção cadastrada com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao cadastrar a menção.'});
  }
}

// list
exports.listMentions = async (req, res) => {
  try {
    const data = await repository.listMentions();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as menções!'});
  }
};

exports.updateMention = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  }

  try {
    await repository.updateMention(req.params.id, req.body);
    return res.status(200).send({
      message: 'Menção atualizada com sucesso!'
    });
  } catch (e) {
    return res.status(500).send({message: 'Falha ao atualizar a menção.'});
  }
};

exports.login = async(req, res) =>{
    //const {errors} = validationResult(req);
    try{
      const data = await repository2.login(
        req.body.login,
        req.body.senha,
        req.body.coll
        );

      return res.status(200).send(data);
    } catch (e) {
      res.status(500).send({message: 'Deu merda'})
    }
};

/* exports.login = async(req, res) =>{
  try{
    const data = await repository2.teste(
      req.body.login, 'queirozs'
      );
    return res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Deu merda'})
  }
}; */

exports.testes = async(req, res) => {
  try{
    const data = new Date(mongoose.now()).toLocaleString();
    /* console.log(data)
    console.log(req.body.login) */
    const up = await testes.updateLogin(
      {
        senha: req.body.oldLogin,
        login : req.body.login  // ISSO AQUI NAO FAZ ALTERAR A SENHA!
                                // SO PARA FAZER TESTES DENTRO DO REPOSITORY!
                                // TESTES DE CONSOLE.LOG KKKK 
      },
      {
        senha: req.body.newLogin,
        date: data
      }, 'queirozs'
    );
    // Tem que colocar if aqui, pq ele diz q deu bom mesmo qd up = null
    /* console.log(up);   */
    res.status(200).send({ message: " DEU BOM no teste de update! "});
  } catch(error) {
    console.log(error instanceof TypeError);
    console.log(error.toString())
    /* console.log(error.name, ':', error.message); */
    res.status(500).send({ message: "Deu ERRO no teste de update! "});
  }
}

exports.testes2 = async(req, res) => {
  const fan1 = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'Gabriel de Albuquerque',
    age: 22
  });

  const fan2 = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'Clara Castanho',
    age: 19
  });
  
  const author = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'Iam Fleming',
    age: 50
  })

  const cass = new Story({ title: 'Cassino Claro' });

  // SALVANDO E POPULANDO 2 DOCS NÃO GRAVADOS NO BD
  /* await author2.save(async function (err) {
    if (err) return handleError(err);
  
    const story1 = new Story({
      title: 'Cassino Claro',
      author: author2._id 
    });
  
    await story1.save(function (err) {
      if (err) return handleError(err);
      
    });
  }); */


  // #######################################
  /* await cass.save();
  await Story.findOne({ title: 'Cassino Claro' }, async function(error, story) {
    if (error) {
      return handleError(error);
    }
    // SALVANDO E POPULANDO 2 FANS E 1 AUTOR
    await author.save()
    await fan1.save()
    await fan2.save()
    console.log(typeof(story.fans))
    console.log(Array.isArray(story.fans))
    story.fans.push(fan1._id, fan2._id);
    
    // Tanto faz os dois!
    story.author = author._id;
    //story.author = author;
    story.save(function(err) {
      if(err) return handleError(err);
      
    });
  }); */

  /* ACHO QUE NÃO FUNCIONA DIA 10/09!
    const data3 = Story.findOne({ title: 'Cassino Claro' })
    .populate({
      path: 'fans',
      match: {name: 'Clara Castanho'}
    }).exec((err, story) => {
      if(err) return handleError(err);
      story.fans.remove()
      console.log(typeof(story.fans))
    }); */
    
  /* const data = await Story.findOne({ title: 'Cassino Claro' })
    .populate({
      path: 'fans',
      match: {name: 'Clara Castanho'},
      select: 'fans'
    }).select('fans -_id').exec((error, doc) => {
      const ident = doc.fans[0].id
      console.log(ident)
      console.log(doc)
      console.log(Array.isArray(doc.fans))
      doc.fans.pull(ident)
      doc.save()
      if(error) return handleError(error)
    }) */

    // DELETANDO UM PATH DE ARRAY CONTIDO EM UM DOC
    const data3 = await Story.findOneAndUpdate(
      { title: 'Cassino Claro' },
      { $pull: { fans : "613c01c9bf1450340cef61f9" } },
      (error) => {
        if (error) throw Error(error)
      }
    ).exec(error => {
      if(error) return handleError(error)
    })
    
    /* DELETANDO UM PATH SINGLE CONTIDO EM UM DOC
     const data4 = await Story.findOneAndUpdate(
      { title: 'Cassino Claro'}
    ).exec((e, story) => {
      if(e) return handleError(e);
      story.author = undefined;
      story.save()
    }); */

  // consulta para pegar somente o author
  const data2 = await Story.findOne({ title: 'Cassino Claro' }).populate('author fans')
  console.log(data3)
  res.status(200).send(data2);
}
