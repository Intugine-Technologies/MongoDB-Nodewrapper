const mongo = require('../index.js');
const config = {
    DB_URI: process.env.DB__URI,
    DB_NAME: "furlenco"
};

let db = null;

mongo(process.env.INTUGINE_DB_URI, "mongo_test", {
        auth: {
            username: process.env.INTUGINE_DB_USER,
            password: process.env.INTUGINE_DB_PASS,
        },
    })
    .then((DB) => {
        db = DB;
        return db.read('devices', {}, 'all');
        console.log(db.is_connected());
        // return db.close();
    })
    .then((r) => {
        console.log(r);
        console.log(db.is_connected());
        // console.log(db);
        return db.close();
        // setInterval(() => {
        // }, 10);
    })
    .then((r) => {
        console.log(r);
    })
    .catch((e) => {
        console.error(e);
    });