
function getData() {
   
  const cityName= document.getElementById('city').value; 
  var vacios=0;
    
    if(cityName==""){
      vacios++;
    } 
    
    if (vacios>0){
      alertify.error("Insert a valid city");
    } else {


    let locationTimezone2 = document.querySelector('.location-timezone2');
    let temperatureDescription2 = document.querySelector('.temperature-description2');
    let temperatureDegree2 = document.querySelector('.temperature-degree2');
    let temperatureSection2 = document.querySelector('.temperature2');
    let temperatureSpan2 = document.querySelector('.temperature2 span');

    document.querySelector('.temperature2').style.visibility = visible;
    
    const apiKey= "21a18c10a5136797605ef72124d89028";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    

    fetch(url)
    .then(response => response.json())
    .then(data => {
    console.log(data)
    const cityGot = data.name;
    const countryGot= data.sys.country;
    const tempGot = data.main.temp;
    const descripGot = data.weather[0].description;
    const lat= data.coord.lat;
    const lon= data.coord.lon;    
    const tempFar = ((tempGot-273.15)*9/5+32).toFixed(1);
    const tempCel = (tempGot - 273.15).toFixed(1);
   document.getElementById('visible').style.visibility = "visible";
   document.getElementById('visible2').style.visibility = "visible";
   document.getElementById('visible3').style.visibility = "visible";
    locationTimezone2.textContent= cityGot + ", " + countryGot;
    if(temperatureSpan2.textContent==="C"){
      temperatureSpan2.textContent = "F";}
    temperatureDegree2.textContent= tempFar;
    temperatureDescription2.textContent = descripGot;
    

    temperatureSection2.addEventListener("click",()=>{
      if(temperatureSpan2.textContent==="F"){
          temperatureSpan2.textContent = "C";
          temperatureDegree2.textContent = tempCel;
      } else {
          temperatureSpan2.textContent="F";  
          temperatureDegree2.textContent = tempFar;  
                         
  }

  });


  const proxy ="https://cors-anywhere.herokuapp.com/";
  const iconsUrl= `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${lon}`;

  fetch(iconsUrl)
    .then(response => response.json())
    .then(data => {
      
    const icon= data.currently.icon;
    setIcons(icon,document.querySelector('.icon2'));
    function setIcons(icon,iconID){
    const skycons = new Skycons({color:"white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();

  //Change background image
  


    return skycons.set(iconID, Skycons[currentIcon]);
}


var result_desc = document.getElementById("noSe");
  if (result_desc.innerHTML.includes("thunder")){
    document.getElementById("rightSide1").style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('img/thunder.png')"
  }
  if (result_desc.innerHTML.includes("rain")){
    document.getElementById("rightSide1").style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('img/rain.jpg')"
  }
  if (result_desc.innerHTML.includes("snow") || result_desc.innerHTML.includes("sleet") ){
    document.getElementById("rightSide1").style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5) ),url('img/snow.jpg')"
  }
  if (result_desc.innerHTML.includes("clouds")){
    document.getElementById("rightSide1").style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('img/cloudy.jpg')"
  }
  if (result_desc.innerHTML.includes("drizzle")){
    document.getElementById("rightSide1").style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('img/drizzle.jpg')"
  }
  if (result_desc.innerHTML.includes("clear")){
    document.getElementById("rightSide1").style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('img/clear.jpg')"
  }
  
  });

  })
  .catch(() => {
    alertify.error("City not found");
  });

    }

}


  
