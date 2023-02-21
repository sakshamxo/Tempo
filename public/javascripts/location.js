
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'ea875e0a22msh2eb5c64cd5c4f3ap1c7153jsn650895c9cc5c',
// 		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
// 	}
// };

// const sec = document.querySelector('#location')
// const list = document.querySelector('#match-list')

// const searchCity = async searchc => {
// const res = await fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities',options);
// const cities = await res.json();

// let matches = cities.filter(cities => {
//     const regex = new RegExp(`^${searchc}`, 'gi');
//     return cities.name.match(regex) || cities.abbr.match(regex);
// });
// console.log(matches)
// };

// sec.addEventListener('input', () => searchCity(sec.value))

// https://wft-geo-db.p.rapidapi.com/v1

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'ea875e0a22msh2eb5c64cd5c4f3ap1c7153jsn650895c9cc5c',
// 		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
// 	}
// };

// fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
// getCity();

// let cityNames = [];

// async function getCity(){
//   const cityRes = await fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',options);
//   const data = await cityRes.json();

//   cityNames = data.map((cities) => {
//     return cities.name;
//   });
//   console.log(cityNames)
// }


// const sec = document.querySelector('#location')
// const list = document.querySelector('#match-list')

// const searchCity = async searchc => {
// const res = await fetch('../data/city.json');
// const cities = await res.json();

// // let matches = cities.filter(cities => {
// //     const regex = new RegExp(`^${searchc}`, 'gi');
// //     return cities.name.match(regex) || cities.abbr.match(regex);
// // });
// console.log(matches)
// };

// sec.addEventListener('input', () => searchCity(sec.value))

// document.querySelector('#location').addEventListener('input',function(){
//   var that = this
//   if(this.value.trim().length > 0){
//     axios.get(`/check/${this.value}`)
//     .then(function(cities){
//       console.log(cities.data.citt)
//     })
//   }
// })




//autocomplete


