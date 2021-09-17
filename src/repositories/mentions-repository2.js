// Duas opções para resolver o set do nome da coleção 
/* const mongoose = require('mongoose'); */
const universal = require("./eita");


exports.login = async (login, senha, coll) => {
  console.log(1)
  const Login = universal.setCollName(coll)
  console.log(Login)
  const res = await Login.findOne({
    login: login,
    senha: senha}, '-_id');
  console.log(res)
  return res;
  };

exports.teste = async(login, collName) => {
  const Login = universal.setCollName(collName) 
  /* const Set = eita.setCollName(collName);  */
  /* const Set = mongoose.model('Login', collName); */
  /* const Login = mongoose.model('Login'); */
  console.log(1)
  const query = Login.find();
  /* console.log(query) */
  query.setOptions({ lean: true });
  /* query.mongooseCollection.collectionName = collName
  query.mongooseCollection.name = collName
  query.collection.NodeCollection.collectionName = collName */
  console.log(query)

  const a = await query.where('login').gte(login)
  console.log(a)
  return a


  /* return await Set.exists({login}) */
}