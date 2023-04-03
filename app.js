const express = require("express");

const https = require("https");

const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, resp) {

  resp.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  var location = req.body.place;

  const url = ("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=a4f016ac4bf99f733b84e3e10e87698e&unit=metric")

  https.get(url, (resp) => {
    console.log(resp.statusCode);

    // A chunk of data has been received.
    resp.on('data', function(data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const description = weatherData.weather[0].description

      const imgUrl = ("http://openweathermap.org/img/wn/"+icon+"@2x.png")

      res.send("<body style=""background-color:#050505;""><h2>Thanks for the info heres UR WEATHER </h2><br><img src="+imgUrl+ "><h1>The temperature in " + location + " is " + temp + " degrees celcious</h1><br><h2>the weather currently " + description+", Have a nice day!!!</h2></body>");

    })

  })


});





//http://openweathermap.org/img/wn/10d@2x.png




// app.get("/",function(req,res){
//
//   const url = ("https://api.openweathermap.org/data/2.5/weather?q=london&appid=a4f016ac4bf99f733b84e3e10e87698e&unit=metric")
//
//

//
//
//
// });




app.listen(process.env.PORT ||3000, function() {

  console.log("runingg");

});
//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
