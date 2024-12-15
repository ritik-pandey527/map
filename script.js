function getLocation() {
    if (navigator.geolocation) {
      console.log("Geolocation API is supported.");
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    // Display map with OpenStreetMap
    const mapDiv = document.getElementById("map");
    mapDiv.innerHTML = `<iframe 
      src="https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.1}%2C${latitude - 0.1}%2C${longitude + 0.1}%2C${latitude + 0.1}&marker=${latitude}%2C${longitude}" 
      width="100%" 
      height="100%" 
      style="border:1px solid black;">
    </iframe>`;
  
    // Redirect button
    const redirectButton = document.createElement("button");
    redirectButton.textContent = "Go to My Location";
    redirectButton.style.marginTop = "10px";
    redirectButton.onclick = () => {
      window.location.href = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=14`;
    };
    document.body.appendChild(redirectButton);
  }
  
  function showError(error) {
    const mapDiv = document.getElementById("map");
    switch (error.code) {
      case error.PERMISSION_DENIED:
        mapDiv.innerHTML = `<p style="color: red;">Location access denied. Please allow location permissions or manually enter your location below.</p>`;
        alert(
          "Location permissions are denied. Check your browser settings to allow location access for this site."
        );
        document.getElementById("manual-location").style.display = "block";
        break;
      case error.POSITION_UNAVAILABLE:
        mapDiv.innerHTML = `<p style="color: red;">Location information is unavailable. Try again later or manually enter your location below.</p>`;
        document.getElementById("manual-location").style.display = "block";
        break;
      case error.TIMEOUT:
        mapDiv.innerHTML = `<p style="color: red;">Request timed out. Please try again.</p>`;
        document.getElementById("manual-location").style.display = "block";
        break;
      case error.UNKNOWN_ERROR:
        mapDiv.innerHTML = `<p style="color: red;">An unknown error occurred. Please refresh the page or manually enter your location below.</p>`;
        document.getElementById("manual-location").style.display = "block";
        break;
    }
  }
  
  function redirectToMap() {
    const locationInput = document.getElementById("location-input").value;
    if (locationInput) {
      window.location.href = `https://www.openstreetmap.org/search?query=${encodeURIComponent(locationInput)}`;
    } else {
      alert("Please enter a valid location.");
    }
  }
  