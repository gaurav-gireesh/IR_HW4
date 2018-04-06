const fs = require('fs');
const path = require('path');
const lineReader = require('line-reader');
readline = require('readline');

module.exports.getURL=function(htmlpath) 
{
    // console.log("The directory is "+ path.dirname(require.main.filename));
    // fs.readFile(path.dirname(require.main.filename)+"/public/abshtml2url.txt",(err,data) => {
    //     if(err) throw err;
    //     else{
    //         //console.log("data"+data);
    //         console.log(data.length);
    //         callback(data);
    //     }

    // })

  
    

var rd = readline.createInterface({
    input: fs.createReadStream(path.dirname(require.main.filename)+"/public/abshtml2url.txt"),
   // output: process.stdout,
    console: false
});

rd.on('line', function(line) {
    // console.log(line);
    if(line.includes(htmlpath))
            {
                line1=line.split(',')[1];
               console.log(line1);
                return line1;
            }

});

    // lineReader.open(path.dirname(require.main.filename)+"/public/abshtml2url.txt", function(reader) {
    //     if (reader.hasNextLine()) {
    //       reader.nextLine(function(line) {
    //         // console.log(line);
    //         if(line.includes(htmlpath))
    //         {
    //             line1=line.split(',')[1];
    //             callback(line1)
    //             return;
    //         }
    //       });
    //     }
    //   });
};
