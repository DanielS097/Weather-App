$(document).ready(function () {
    const apiKey = 'dc0d1c23c45188950589eececf63d619';

    function fetchWeather(city) {
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=metric';
        const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey + '&units=metric';