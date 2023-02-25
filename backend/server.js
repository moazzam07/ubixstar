const express = require("express"); 
var fs = require('fs')
var url = "mongodb://localhost:27017/";
var MongoClient = require('mongodb').MongoClient, format = require('util').format;

require("dotenv").config();
require("./config");
var cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*", //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/result', async (req, res, next) => {
    try {
        const { buttonName, buttonRadius, textBox } = req.body.data
        console.log(buttonName)
        console.log(buttonRadius)
        console.log(textBox)
        if(!buttonName && !buttonRadius && !textBox){
            res.status(200).send({ status: 400, message: "Not Saved" });
            return;            
        }

        var button = false;
        var textbox = false;

        if(buttonName || buttonRadius) button = true;
        if(textBox) textbox = true;
        
        let result;
        if(button && textbox){
            result = {
                button : {
                    widget : "button",
                    text: buttonName,
                    buttonRadius: buttonRadius
                },
                textBox : {
                    widget : "Text Box",
                    text: textBox
                }
            }
        }
        else if(button){
            result = {
                widget : "button",
                text: buttonName,
                buttonRadius: buttonRadius
            }
        }
        else if(textbox){
            
            console.log(textbox)
            result = {
                widget : "Text Box",
                text: textBox
            }
        }

        console.log("result", result);
        fs.writeFile("./object.json", JSON.stringify(result, null, 4), (err) => {
            if (err) {  console.error(err);  return; };
                console.log("File has been created");
            });
            
            MongoClient.connect('mongodb://127.0.0.1:27017/', function(err,client) {

            if (err) throw err;
            console.log("Connected to Database");
            var db = client.db('test');
        
            // insert record
            db.collection('data').insert(result, function(err, records) {
                if (err) throw err;
                console.log("Record Saved");
            });
        });


        res.status(200).send({ status: 200, message: "saved" })
        return;
    } catch (error) {
        next(error)
    }
})


app.get("/test", (req, res) => {
  res.send("Working!");
});

app.listen(process.env.PORT, () => console.log("server running on port 8000"));