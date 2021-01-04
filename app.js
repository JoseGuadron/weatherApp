window.addEventListener("load",()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            //console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //let visit darksky.net
            // let's get the dark sky API

            const proxy ="https://cors-anywhere.herokuapp.com/";
            const api= `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            //https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/37.8267,-122.4233
            fetch(api)
            .then(response =>{ return response.json();})
            .then (data =>{
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                //set DOM Elements from the API
                temperatureDegree.textContent = temperature.toFixed(1);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                var description = data.currently.summary.toLowerCase();
                if (description.toString().includes("thunder")){
                    document.getElementById("leftSide1").style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('img/thunder.png')"
                }
                if (description.toString().includes("rain")){
                    document.getElementById("leftSide1").style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('img/rain.jpg')"
                }
                if (description.toString().includes("snow") || description.toString().includes("sleet") ){
                    document.getElementById("leftSide1").style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5) ),url('img/snow.jpg')"
                }
                if (description.toString().includes("clouds") || description.toString().includes("cloudy")){
                    document.getElementById("leftSide1").style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('img/cloudy.jpg')"
                }
                if (description.toString().includes("drizzle")){
                    document.getElementById("leftSide1").style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('img/drizzle.jpg')"
                }
                if (description.toString().includes("clear")){
                    document.getElementById("leftSide1").style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('img/clear.jpg')"
                }

                let celcious = (temperature-32) * (5/9);
                //set icon
                setIcons(icon,document.querySelector('.icon'));

                // change temperature to celcious 
                temperatureSection.addEventListener("click",()=>{
                    if(temperatureSpan.textContent==="F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = (celcious).toFixed(1);
                    } else {
                        temperatureSpan.textContent="F";  
                        temperatureDegree.textContent = temperature;                 
                }
                });

                //to define the current weather or what is happenning in the icon 
                //lets go to darkskyapp.github.io/skycons
                //let's go to the GITHUB download it and copy the JS file
            });
         //to make it work lets visit cors-anywhere.herokuapp.com
        });
    }


    




    function setIcons(icon,iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);


    }

});