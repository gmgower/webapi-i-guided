// s1 yarn  install dependenices 
// s2 create index.js file
// s4 npm run server/ yarn server 
// s5 install express yarn add express


// s6
const  express = require('express');

// ? s14 
const db = require('./data/hubs-model.js')

// s7
const server = express();

// s8
server.listen(4000, () => {
    console.log('=== server listening on port 4000 ===');
});
// s9 yarn server look for localhost:4000


// ? s21  create middlewear
server.use(express.json());

// s10 
server.get('/', (req, res) => {
    console.log('you asked for it..')
    // s11 test browser
    // s12 
    res.send('hello world...')
})

// ? s13 create another get handler
// ? CRUD - Create, Read, Update, Delete
// ?        POST,   GET,  PUT,    DELETE
// ? this is the Read method for hubs 
server.get('/hubs', (req, res) => {
    // ? s15 using find fn in hubs-model.js
    db.find()
        .then(hubs => {
            // ? s16 set status of 200 
            res.status(200).json(hubs);
        })
        // ? s17
        .catch(err => {
            res.status(500).json({
                message: err,
                success: false
            })
        })
})

// ? s18 create a hub using postman
server.post('/hubs', (req, res) => {
    // ? s19
    const hubInfo = req.body;
    console.log('body', hubInfo);

    db.add(hubInfo)
        .then(hub => {
            res.status(201).json({success: true, hub})
        })
        .catch((err) => {
            res.status(500).json({success: false, err});
        })
})

// ? s22 delete
server.delete('/hubs/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
        .then(deletedHub => {
            if(deletedHub){
                res.status(204).end();
            } else {
                res.status(404).json({message: `i could not find id=${id}`});
            }
        })
        .catch(err => {
            res.status(500).json({success: false, err})
        })
});

// ? s23 update
server.put('/hubs/:id', (req, res) => {
    const {id} = req.params.id;
    const hubInfo = req.body;

    db.update(id, hubInfo)
        .then(hub => {
            if(hub) {
                res.status(200).json({success: true, hub});
            } else {
                res.status(404).json({success: false, message: `id ${id} does not exist`})
            }
        })
        .catch(err => {
            res.status(500).json({success: false, err})
        })
})

// ? s24 
server.get('/hubs/:id', (req, res) => {
    // do your thing here
})

// ? s3 test
// console.log('hello world');