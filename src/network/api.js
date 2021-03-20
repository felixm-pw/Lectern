// External
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const AWS = require('aws-sdk')
// Internal
const netcfg = require('./local-config.js')

const app = express();

// ONLY FOR DEVELOPMENT
app.use(cors({ credentials: true, origin: '*' }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
AWS.config.loadFromPath(__dirname + '/aws-config.json')
var dynamo = new AWS.DynamoDB.DocumentClient()

//Api Endpoints

// Pull Module titles
app.get('/api/listMod', (req, res) => {
    var params = {
        TableName: "Lectern",
        ProjectionExpression: "ModuleName"
    }
    dynamo.scan(params, function(err, data) {
        if (err) {
          console.log("listMod", err)
        } else {
          res.status(200).send(data.Items)
        }
    })
})

// Pull Module information
app.post('/api/callMod', (req, res) => {
      var params = {
        TableName: "Lectern",
        Key:{
            "ModuleName": req.body.modName
        }
    }
    dynamo.get(params, function(err, data) {
        if (err) {
            console.error("callMod error: ", err)
        } else {
            res.status(200).send(data.Item)
        }
    })
})

app.listen(process.env.PORT || netcfg.port);
