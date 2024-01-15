$(document).ready(function () {
    const apiKey = 'dc0d1c23c45188950589eececf63d619';

    function fetchWeather(city) {
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=metric';
        const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey + '&units=metric';


        // current weather
        fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                updateWeatherInfo(data);
                saveToLocalStorage(city);
            })
            .catch(function () {
                displayError('Error fetching current weather data');
            });


        // 5-day forecast
        fetch(forecastApiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayForecast(data.list);
            })
            .catch(function () {
                console.error('Error fetching forecast data');
            });
    }

    function updateWeatherInfo(data) {
        const currentDate = dayjs().format('dddd, DD/MM/YYYY');
        $('#city').html(`${data.name} - ${currentDate}`);
        $('#temperature').text('Temperature: ' + Math.round(data.main.temp) + '°C');
        $('#description').text('Description: ' + data.weather[0].description);
        $('#humidity').text('Humidity: ' + data.main.humidity + '%');
        $('#wind-speed').text('Wind Speed: ' + convertToKMH(data.wind.speed) + ' KM/H');
        $('#icon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
        $('#error-message').text('');
    }

    //function to convert wind speed from m/s to km/h
    function convertToKMH(speed) {
        return Math.round(speed * 3.6);
    }

    function displayForecast(forecastList) {
        const forecastContainer = $('#forecast-container');
        forecastContainer.empty();

        for (let i = 0; i < forecastList.length; i += 8) {
            const forecastDate = dayjs.unix(forecastList[i].dt).format('DD/MM/YYYY');
            const forecastTemp = Math.round(forecastList[i].main.temp);
            const forecastHumidity = forecastList[i].main.humidity;
            const forecastWindSpeed = convertToKMH(forecastList[i].wind.speed);

            const forecastItem = $('<div class="forecast-item"></div>').html(
                `<p>Date: ${forecastDate}</p>` +
                `<p>Temperature: ${forecastTemp}°C</p>` +
                `<p>Humidity: ${forecastHumidity}%</p>` +
                `<p>Wind Speed: ${forecastWindSpeed} KM/H</p>`
            );

            forecastContainer.append(forecastItem);
        }
    }

    function displayError(message) {
        $('#error-message').text(message);
        resetWeatherInfo();
    }

