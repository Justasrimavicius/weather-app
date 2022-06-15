const button=document.getElementById('place-input-btn');
const inputField=document.getElementById('place-input');
const h1=document.querySelector('h1');
const h2=document.querySelector('h2');
const h3=document.querySelector('h3');

let place='nothing';

const countryInfo={
    name:'',
    currentTemp:0,
    clouds:false
};

button.addEventListener('click',async()=>{
    if(place!=inputField.value){
    try{
        place=inputField.value;
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=c418d11f7fa8940b870542f1566abeff`);
        let responseJSON = await response.json();
        if(responseJSON.cod=='404'){
            throw {
                name: "bad",
                message: "very baaad",
            }
        }
        else{
            countryInfo.name=responseJSON.name;
            countryInfo.currentTemp=Math.round(responseJSON.main.temp-273.15) ;
            countryInfo.clouds=responseJSON.weather[0].description;
            console.log(countryInfo);

            h1.innerText=countryInfo.name;
            h2.innerText=countryInfo.currentTemp;
            h3.innerText=countryInfo.clouds;
        }
    } catch(e){
        h1.innerText='Not a real place';
        h2.innerText='Not a real place';
        h3.innerText='Not a real place';
        console.log(e);
    };
}else{
    return;
}
});
