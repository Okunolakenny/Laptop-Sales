const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");
const request = require("request");
const url = "https://randomuser.me/api/?gender=female";
// const { hasSubscribers } = require("node:diagnostics_channel");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get('/', function (request, response) {
    response.sendFile(__dirname + "/index.html");
});
app.post('/', function (req, response) {
    var uname = req.body.username;
    var tel = req.body.tel;
    var email = req.body.email;
    response.send(uname + tel + email);
    var data = {
        members: [
            {
                status: "subscribed",
                email_address: email,
                merge_fields: {
                    FNAME: uname,
                    PHONE: tel
                }

            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/2ecaf7a665"
    const options = {
        method: "post",
        auth: "kenny:6f402c43bcaf9904157e9bbcfc615c28-us9"
    }
    const request = https.request(url, options, function (res) {

        console.log(res.statusCode);
        if (res.statusCode === 200) {
            response.sendFile(__dirname + "/sucess.html")

        }
        else {
            response.sendFile(__dirname + "/terminal.html")

        }
        res.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    console.log(jsonData);
    request.write(jsonData);
    request.end();


});
  




app.use(express.static(__dirname));

app.get('/sucess', function (request, response) {
    response.sendFile(__dirname + "/sucess.html");
});

app.use(express.static(__dirname));

app.get('/terminal', function (request, response) {
    response.sendFile(__dirname + "/terminal.html");
});

app.use(express.static(__dirname));

app.get('/product', function (request, response) {
    response.sendFile(__dirname + "/product.html");
});


app.get('/proform', function (request, response) {
    response.sendFile(__dirname + "/proform.html");
});
app.post('/proform', function (req, response) {

    const details = {
        firstname: req.body.fname,
        lastname: req.body.lname,
        telephone: req.body.tel,
        email: req.body.email,
        quantity: req.body.quantity,
    }
    response.send(details);

    console.log(details);
    const paystackDetails = JSON.stringify(
        {
            email: details.email,
            amount: details.quantity * 300000,
            metadata: {
                firstname: details.firstname,
                lastname: details.lastname,
                
            },
            callback_url: 'http://localhost:7000/sucess',


            
        })
        
        console.log(paystackDetails)
        
        const options = {
            
            hostname: 'api.paystack.co',

        port: 443,
        
        path: '/transaction/initialize',

        method: 'POST',
        
        headers: {
            
            Authorization: 'Bearer sk_test_32b0a9ab68d85591e5eb2e650205dd6c48d25c26',
            
            'Content-Type': 'application/json'
            
        }

    }

    const apiRequest = https.request(options, function (res) {
        let data = ''
        res.on('data', (chunk) => {
            
            data += chunk
            
        });
        
        
        res.on('end', () => {
            
            var result = JSON.parse(data);
            var redirectUrl = result.data.authorization_url;
            response.redirect(redirectUrl);
            
        });

    });

    
    
    apiRequest.write(paystackDetails)
    
    apiRequest.end()
});
    
  
app.listen(7000);
app.listen(7000, "localhost", function () {
    console.log("server is working perfectly on port 7000.")
});
