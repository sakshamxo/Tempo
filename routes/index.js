
var express = require('express');
var router = express.Router();
// var request = require('request-promise');
var axios = require('axios');
const { response } = require('express');
const userModel = require('./users')
const apikey = 'da19f80424156810364b51deb390fee0'

var cityname;
var icityname;
var weatherData;
var weatherDataimperial;
var fiveDayweather;
var fiveDayweatherimperial;
var lon;
var lat;
var ilon;
var ilat;


// var pune = new userModel({cityname : 'pune'})
// pune.save()
// var indore = new userModel({cityname : 'indore'})
// var thailand = new userModel({cityname : 'thailand'})
// indore.save()
// thailand.save()
// var bhopal = new userModel({cityname : 'bhopal'})
// bhopal.save()
// async function weathernow(cities){

//   var weatherData = [];

//   for(var cityObj of cities){
//     var city = cityObj.cityname;

//      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
//     var ressbody = await request(url)
//     var weatherJson = JSON.parse(ressbody);
//     var weather = {
//       city : city,
//       temperature : Math.round(weatherJson.main.temp),
//       description : weatherJson.weather[0].description,
//       icon : weatherJson.weather[0].icon
//     };
//     weatherData.push(weather)
//   }
//   return weatherData;
// }

// router.get('/',  (req,res)=>{
//   userModel.find({},(err, cities)=>{
   
//     weathernow(cities)
//     .then((result)=>{
      
//       var weatherData = {weatherData:result}

//       res.render('index',weatherData)
//     })
//   })
//   // let city = 'bhopal';
 
//   //  request(url,(error,response,body)=>{
//     // weatherJson = JSON.parse(body)
//     // console.log(weatherJson)   

//     // var weatherData = {weather : weather};
   
//   // })
// })

// router.post('/', (req,res)=>{


//     var newcity = new userModel({cityname : req.body.cityname});


//      newcity.save();
   

//   res.redirect('/')
// })



router.get('/', function(req,res){
  res.render('index')
})

// router.get('/prediction',function(req,res){
//   res.render('nextp')
// })

// router.post('/weather',async function(req,res){
//   console.log(req.body.cityname)
//  const useData = await userModel.findOne({cityname : req.body.cityname})
//  if(useData !== req.body.cityname){

//    await userModel.create({cityname : req.body.cityname})
//  }

  
//   var city = req.body.cityname
//   // console.log(city)
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
//   var ressbody = await request(url)
//   var weatherJson = JSON.parse(ressbody);
//   console.log(weatherJson)
//       var weather = await {
//       city : city,
//       country : weatherJson.sys.country,
//       temperature : Math.round(weatherJson.main.temp),
//       description : weatherJson.weather[0].description,
//       icon : weatherJson.weather[0].icon
//     };
//     res.render('weather',{weather})
// })


router.post('/weather', async function(req,res){
 
  cityname = req.body.name;
  icityname = cityname;
await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apikey}`)
.then(response =>{
  weatherData = response.data
  if(weatherData.coord === undefined){
    res.send('invalid parameters given please try again')
    setTimeout(() => {
      res.redirect('/')
    }, '2000');
  }
  else{
    console.log(weatherData)
    lon = weatherData.coord.lon;
    lat = weatherData.coord.lat
  }

})
await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
.then(response =>{
  fiveDayweather = response.data
})
.catch(err =>{
  res.redirect('/')
},'2000')
res.redirect('/weather')
})



router.get('/weather', async function(req,res){
  
  if(weatherData === undefined){
    res.redirect('/');
  }
  else{
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${icityname}&units=metric&appid=${apikey}`)
    .then(response =>{
      weatherData = response.data
      // console.log(weatherData)
      lon = weatherData.coord.lon;
      lat = weatherData.coord.lat;
    })
    await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
    .then(response =>{
      fiveDayweather = response.data
      // console.log(fiveDayweather)
    })
    res.render('weather',{weatherData,fiveDayweather})
  }
})

router.get('/check/:name',async function(req,res){
  // console.log(req.params.name)
  

  cityname = await userModel.find({name :{ $regex : "^" + req.params.name , $options: 'i'}}).limit(15).sort({ id: -1 })
  // console.log(cityname)
  res.json({cityname})

})

router.post('/weather/imperial', async function(req,res){
  cityname : req.body.name,
  icityname = cityname
  await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${icityname}&units=imperial&appid=${apikey}`)
  .then(response=>{
    weatherDataimperial = response.data
    ilat = weatherDataimperial.coord.lat
    ilon = weatherDataimperial.coord.lon
    console.log( weatherDataimperial)
  })

  await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`)
  .then(response =>{
    fiveDayweatherimperial = response.data
  })

  res.redirect('/weather')
})

router.get('/weather/imperial',async function(req,res){
 
 
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${icityname}&units=imperial&appid=${apikey}`)
    .then(response =>{
      weatherDataimperial = response.data
      console.log(weatherDataimperial)
      lon = weatherDataimperial.coord.lon;
      lat = weatherDataimperial.coord.lat;
    })
    await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`)
    .then(response =>{
      fiveDayweatherimperial = response.data
      // console.log(fiveDayweatherimperial)
    })
    res.json({weatherDataimperial,fiveDayweatherimperial})
 
})

router.get('/weatherchart',async function(req,res){
 
 
  await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${icityname}&units=metric&appid=${apikey}`)
  .then(response =>{
    weatherData = response.data
    console.log(weatherData)
    lon = weatherData.coord.lon;
    lat = weatherData.coord.lat;
  })
  await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
  .then(response =>{
    fiveDayweather = response.data
    // console.log(fiveDayweatherimperial)
  })
  res.json({weatherData,fiveDayweather})

})

router.get('/prediction', async function(req,res){
  
  if(weatherData === undefined){
    res.redirect('/');
  }
  else{
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${icityname}&units=metric&appid=${apikey}`)
    .then(response =>{
      weatherData = response.data
      // console.log(weatherData)
      lon = weatherData.coord.lon;
      lat = weatherData.coord.lat;
    })
    await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
    .then(response =>{
      fiveDayweather = response.data
      // console.log(fiveDayweather)
    })
    res.render('nextp',{weatherData,fiveDayweather})
  }
})

module.exports = router;
//   weather.setAPPID(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=da19f80424156810364b51deb390fee0`)
