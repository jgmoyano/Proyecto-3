export const cityWheater = async (city = 'santiago') => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=616629f9acdc3b22b8b09553e632e5da&units=metric`)
    const objData = await response.json()
    
    const cityWheaterTempArr = await [Math.floor(objData.main.temp)]
    const cityWheaterFeelsLikeArr = await [Math.floor(objData.main.feels_like)]
    const name = await [objData.name]
    
    return {
        cityWheaterTempArr,
        cityWheaterFeelsLikeArr,
        name
    }
}

