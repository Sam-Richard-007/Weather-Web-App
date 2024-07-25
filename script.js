document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '0a0d8c248eb56a7fe3ca044154365b68';
    const getWeatherButton = document.getElementById('get-weather');
    const cityInput = document.getElementById('city');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const iconElement = document.getElementById('icon');
    const errorMessageElement = document.getElementById('error-message');
    const weatherInfoContainer = document.getElementById('weather-info');

    getWeatherButton.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) {
            errorMessageElement.textContent = 'Please enter a city name.';
            return;
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error('City not found.');
            }

            const weatherData = await response.json();
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

            temperatureElement.textContent = temperature;
            descriptionElement.textContent = description;
            iconElement.src = icon;
            iconElement.alt = description;
            weatherInfoContainer.style.display = 'block';
            errorMessageElement.textContent = '';
        } catch (error) {
            errorMessageElement.textContent = error.message;
            weatherInfoContainer.style.display = 'none';
        }
    });
});
