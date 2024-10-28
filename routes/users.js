var express = require('express');
var router = express.Router();
const db = require('../Models/mysqlProvider')

// ------------------------------------------------------------------


router.get('/getUsers', async (req, res) => {
  try {
    console.log('Buscando usuários...');
    const users = await db.getAllUsers();
    res.send(users);
  } catch (e) {
    console.error('Erro ao buscar usuários:', e);
    res.send({ error: 'Erro ao buscar usuários' });
  }
});



// ------------------------------------------------------------------

// router.post('/addUser', async (req, res) => {
//   try {
//     const { user } = req.body;
//     if (!user) return res.send({ error: 'Dados inválidos' });
//     const userAdded = await db.addUser(user);
//     res.send(userAdded);
//   } catch (e) {
//     res.send({ error: 'Erro ao adicionar usuário', e });
//   }
// });




// ------------------------------------------------------------------

module.exports = router;