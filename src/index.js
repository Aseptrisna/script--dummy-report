const model = require("./model/model_service");
const list_layanan = require("./data/list_layanan.json");
const name =require("./data/list_nama.json");
const image =require("./data/image.json");
let centerLatitude =-5.398455;
let centerLongitude =105.1250541;
let radiusInMeters = 100; 
const NodeGeocoder = require('node-geocoder');

const worker = async (data) => {
  try {
    // console.log(list_layanan);
    // 
    // console.log(name.length);
   

  let service = 500
  console.log(image.length)
  console.log(list_layanan.length)
  for (let i = 0; i < service; i++) {
    const coordinates = await generateCoordinates(centerLatitude, centerLongitude, radiusInMeters);
    console.log("Latitude: " + coordinates.latitude);
    console.log("Longitude: " + coordinates.longitude);
    data.LONG=coordinates.longitude;
    data.LAT=coordinates.latitude;
    data.TIMESTAMP=Math.round(new Date().getTime() / 1000).toString();
    data.NAME=name[i].name;
    data.REPORT_TYPE.NAME=list_layanan[i].NAME;
    data.IMAGE="data/kehadiran/image/"+image[i]+".jpg";
    data.DESCRIPTION=list_layanan[i].NAME;
    // await get_address(coordinates.latitude, coordinates.longitude,data);
    save_data(data);
  }
   
  } catch (error) {
    console.log(error);
  }
};

module.exports = { worker };

const save_data =async (data) => {
  try {
   
    let centerLatitude =data.LAT; 
    let centerLongitude = data.LONG;
    console.log(data);
    // await model.deleteMany({COMPANY:data.COMPANY})
    // console.log(address);
   const service= await model.create(data);
   if(service){
    console.log("Berhasil");
   }
  } catch (error) {
    console.log(error);
  }
}

const get_address =async (LAT,LONG,data) => {
  let address ="";
  const geocoder = NodeGeocoder({
    provider: 'google' // You can choose other providers like Google Maps or MapQuest
  });
  const res = await geocoder.reverse({ lat: 45.767, lon: 4.833 });
  console.log(res);
  // geocoder.reverse({ lat: LAT, lon: LONG })
  // .then(function(res) {
  //   // console.log(res[0].formattedAddress);
  //   address =res[0].formattedAddress;
  //   data.ADDRESS=address;
  //   save_data(data);
  // })
  // .catch(function(err) {
  //   console.log(err);
  // });
  // return address;
}
// generateCoordinates
const generateCoordinates =async (centerLatitude, centerLongitude, radiusInMeters)=>{
  var radiusInDegrees = radiusInMeters / 111300; // Approximately 111300 meters per degree

  // Generate a random angle in radians
  var randomAngle = Math.random() * Math.PI * 2;

  // Calculate the new latitude and longitude
  var latitude = centerLatitude + (radiusInDegrees * Math.cos(randomAngle));
  var longitude = centerLongitude + (radiusInDegrees * Math.sin(randomAngle));

  return {
    latitude: latitude,
    longitude: longitude
  };

}