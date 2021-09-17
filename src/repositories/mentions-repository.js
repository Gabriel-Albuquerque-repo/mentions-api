const mongoose = require('mongoose');
const Mentions = mongoose.model('Mention');  

//da prioridade ao name
//torna possível alterar a consulta em uma collection diferente

/* Mentions.collection.name = 'mentions'; */

/* Mentions.collection.collectionName = 'queirozs' */
/* console.log(Mentions.collecti  on) */

exports.listMentions = async () => {
  return await Mentions.find({}, '-_id -__v');
  /* const res = await Mentions.findOne({
    _id: "60c552257e99dc27dc0a1f72",
    friend: "faskldsfalç"}, 'friend -_id'); */
  /* return res; */
};

exports.createMention = async data => {
  const mention = new Mentions(data);
  await mention.save();
};

exports.updateMention = async (id, data) => {
  await Mentions.findByIdAndUpdate(id, {
    $set: data
  });
};  