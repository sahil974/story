const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    fNAME: fName,
                    lNAME: lName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/ed0b3eb0e6";

    const options = {
        method: "POST",
        auth: "Sahil:bdb9b75a38d1e7786584ad087d4cd5ef-us17",
    };
    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200)
            res.sendFile(__dirname + "/sucess.html");
        else
            res.sendFile(__dirname + "/failure.html");

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    })



    request.write(jsonData);
    request.end();

    // console.log(fName, lName, email);
})

app.listen(process.env.PORT || 3000, function () {
    console.log("the server is live at 3000");
})

// api key
// bdb9b75a38d1e7786584ad087d4cd5ef-us17

// Audience Id
// ed0b3eb0e6