// Initialize the map
const map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Default markers
const defaultMarkers = [
  { lat: 28.7041, lng: 77.1025, title: "Delhi" },
  { lat: 19.076, lng: 72.8777, title: "Mumbai" },
  { lat: 13.0827, lng: 80.2707, title: "Chennai" },
  { lat: 22.5726, lng: 88.3639, title: "Kolkata" }
];

// Add default markers to the map
defaultMarkers.forEach(marker => {
  L.marker([marker.lat, marker.lng]).addTo(map)
    .bindPopup(`<b>${marker.title}</b>`)
    .openPopup();
});

// Handle Geolocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Show the user's location on the map
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Add a marker for the user's location
  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup("<b>Your Location</b>")
    .openPopup();

  // Center the map on the user's location
  map.setView([latitude, longitude], 13);
}

// Handle geolocation errors
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert(
        "Location permissions are denied. Check your browser settings to allow location access for this site."
      );
      document.getElementById("manual-location").style.display = "block";
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable. Try again later.");
      break;
    case error.TIMEOUT:
      alert("The request to get your location timed out. Please try again.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred. Please refresh the page and try again.");
      break;
  }
}

// Redirect to OpenStreetMap search for manual location input
function redirectToMap() {
  const locationInput = document.getElementById("location-input").value;
  if (locationInput) {
    window.location.href = `https://www.openstreetmap.org/search?query=${encodeURIComponent(locationInput)}`;
  } else {
    alert("Please enter a valid location.");
  }
}
