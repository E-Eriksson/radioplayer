// Fetch channels data from Sveriges Radio API
async function fetchChannels() {
  try {
    const response = await fetch(
      "https://api.sr.se/api/v2/channels?format=json&size=10"
    );
    const data = await response.json();
    displayChannels(data.channels);
  } catch (error) {
    console.error("Error fetching channels:", error);
  }
}

function displayChannels(channels) {
  const container = document.getElementById("radio-channels");

  channels.forEach((channel) => {
    const card = document.createElement("div");
    card.className = "channel-card";
    card.style.backgroundColor = channel.color;

    const img = document.createElement("img");
    img.src = channel.image || "placeholder.jpg"; // Fallback if no image is provided
    img.alt = channel.name;
    img.className = "channel-image";
    card.appendChild(img);

    const details = document.createElement("div");
    details.className = "channel-details";

    const name = document.createElement("h2");
    name.textContent = channel.name;
    details.appendChild(name);

    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = channel.liveaudio.url;
    audio.className = "audio-player";
    details.appendChild(audio);

    card.appendChild(details);
    container.appendChild(card);
  });
}

fetchChannels();
