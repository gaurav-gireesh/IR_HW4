/***********IMPORTING the Necessary Modules ***************** */
const express   = require('express');
const router    = express.Router();
const solr =   require('solr-client');
const helper = require('../helpers/getWebUrl');
const fs = require('fs');
const path = require('path');
const map2files = require('../server');
/************  APACHE SOLR Configuration   **********/

const solr_host     = '127.0.0.1';
const solr_port     = 8983;
const solr_core     ='newsday_6874110701';
const solr_protocol = 'http://';


var client = solr.createClient(
    {
        core:solr_core,
        host:solr_host,
        port:solr_port
    });

// var Client = require('node-rest-client').Client;
 
// var rest_client = new Client();


 




/********** This comes in from the client  ***********/


//test solr url here...
//              http://localhost:8983/solr/newsday_6874110701/select?q=_text_:french


/***********    Default Route for the Search API on the Server side  ************/

router.get('/',(req,res)=>
{
    res.setHeader('Content-type','text/html');
    res.send("<h2><i>Search APIs working...</i></h2>");
});





/****  The search route that invokes Apache Solr API */
router.get('/search/:keyword',(req,res)=>
{
   
    let q_term = req.params.keyword;
    let solr_query = 'q='+'_text_:'+q_term;


    var query = client.createQuery().q({
        '_text_': q_term
      })
    client.search( query, function(err, obj){
	if(err){
		console.log(err);
	}else{
        
        //res.json(obj);
        
        numDocsReturned=obj['response']['docs'].length;
        console.log("Number returned"+numDocsReturned);
       
        docsReturned = obj['response']['docs'];
      //  console.log(docsReturned[0]['id']);
        var i = 0;
        
        for(i=0;i<numDocsReturned;i++)
        {  
            abspath = docsReturned[i]['id'];
            console.log(abspath);
            console.log(map2files.mymap[abspath]);
            //console.log(map2files[abspath]+"\n");
            
           line1=map2files.mymap[abspath];
             newObj=obj['response']['docs'][i];
             newObj['algorithm']=line1;
             obj['response']['docs'][i]=newObj;
            
        }
        res.json(obj);
        }
       

	}
);
});

//  

//sample route to test if mapping works

router.get( '/getweburl',(req,res)=>
{
    let st1 = "/home/gaurav/solr-7.2.1/crawl_data/d8e079a914ac8b60e471cc88fa03e31f.html";
    helper.getURL(st1,(data)=>{ 
        console.log("I got it! he url is ");
        console.log(data);
        res.send(data);
    
    })

});





/****   Exporting the Routes in here*****/
module.exports  =   router;