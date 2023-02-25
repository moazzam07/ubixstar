const express = require("express"); 
const DataSchema = require('./model/DataSchema')

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
        const createNewData = new DataSchema({
            buttonName: buttonName,
            buttonRadius: buttonRadius,
            textBox: textBox,
        })
        const data = await createNewData.save();
        var button = false;
        var textbox = false;
        if(buttonName || buttonRadius) button = true
        if(textBox) textbox = true
        
        var result;

        if(button && textbox){
            console.log(button)
            console.log(textbox)
            result = {
                "button" : {
                    "widget" : "button",
                    "text": buttonName,
                    "buttonRadius": buttonRadius
                },
                "textBox" : {
                    "widget" : "Text Box",
                    "text": textBox
                }
                
            }
        }
        else if(button){
            console.log(button)
            result = {
                "widget" : "button",
                "text": buttonName,
                "buttonRadius": buttonRadius
            }
        }
        else if(textbox){
            
            console.log(textbox)
            result = {
                "widget" : "Text Box",
                "text": textBox
            }
        }

        res.status(200).send({ status: 200, message: result })
        return;
    } catch (error) {
        next(error)
    }
})


app.get("/test", (req, res) => {
  res.send("Working!");
});

app.listen(process.env.PORT, () => console.log("server running on port 8000"));