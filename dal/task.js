var mongoose = require('mongoose');

mongoose.connect(process.env, {useNewUrlParser: true} )

const testConnection = () => {
    var db = mongoose.connection;
    db.on ('error', console.error.bind (console, 'connection error:'));
    db.once('open', function(){
        console.log("Connection!")
    });

}
module.export = router;