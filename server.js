//  importing the modules to make this server app run

const   express     =   require('express');
const   path        =   require('path');
const   body_parser =   require('body-parser');
const   port        =   3000;
const   routes      =   require('./routes/server_routes');
const   cors        =   require('cors');
const fs = require('fs');

//Configuring middleware

var server_app  =   express();


//static directory

server_app.use(express.static(path.join(__dirname,'public')))

server_app.use(body_parser.json());

server_app.use(body_parser.urlencoded({extended:true}));

server_app.use(cors());



//search api route

server_app.use('/api',routes);





/****   app default route ****/
server_app.get('/',(req,res)=>
{
    res.setHeader('Content-type','text/html');
    res.end('<h1>The Server app is running:     Default Route working all good!</h1>');
});









contents=fs.readFileSync(path.dirname(require.main.filename)+"/public/abshtml2url.txt","utf-8");
console.log(contents.split("\n").length);

let docs = contents.split("\n");
let lendocs = docs.length;
let map2files={};
for(var i=0;i<lendocs;i++)
{
    line=String(docs[i]);
    line0 = line.split(",")[0];
    line1=   line.split(",")[1];
    map2files[line0]=line1;
}
//console.log(map2files);


//server_app.locals({mymap:map2files});
server_app.use(function (req, res, next) {
    res.locals.mymap=map2files;
    next();
 });


 //starting the app
server_app.listen(port,()=>
{
    console.log("Server app started successfully on port "+port);
})
module.exports.mymap=map2files;