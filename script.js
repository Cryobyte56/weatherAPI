document.getElementById("getWeather").addEventListener("click", function () {
  const city = document.getElementById("city").value;
  const apiKey = "";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Get the Responses
      const temp = data.current.temp_c;
      const humidity = data.current.humidity;
      const windSpeed = data.current.wind_kph;
      const condition = data.current.condition.text;
      const location = `${data.location.name}, ${data.location.country}`;
      const latest = data.current.last_updated;

      //Format
      const date = new Date(latest);
      const options = { month: "short", day: "numeric", year: "numeric" };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      // Extract Time
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;

      // Combine
      const formattedDateTime = `${formattedDate}, ${formattedTime}`;

      // Display Results
      document.getElementById("location").textContent = location;
      document.getElementById(
        "latest"
      ).textContent = `${formattedDateTime}`;
      document.getElementById("temperature").textContent = `${temp}°C`;
      document.getElementById("humidity").textContent = `${humidity}%`;
      document.getElementById("windspeed").textContent = `${windSpeed} km/h`;
      document.getElementById("condition").textContent = `${condition}`;
    })
    .catch((error) => {
      document.getElementById("temperature").textContent = "?";
      document.getElementById("humidity").textContent = "?";
      document.getElementById("windspeed").textContent = "?";
      document.getElementById("condition").textContent = "?";
      console.error("Error:", error);
      alert("City Not Found, Try Again!");
    });
});
