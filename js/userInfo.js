async function fetchSpotifyData(endpoint){
    const token =localStorage.getItem("access_token")
    if(!token){
        window.location.href="/index.html"
        return
    }
    const response = await fetch(endpoint,{
        headers: {Authorization: `Bearer ${token}`}
    })
    return response.json()
}

async function loadProfile(){
    const userData = await fetchSpotifyData("https://api.spotify.com/v1/me")
    document.getElementById("profile").innerHTML=
    `<h2>Welcome, ${userData.display_name}</h2>
    <img src="${userData.images[0]?.url || ''}" width=200px>`
}

async function loadTopArtists(){
    const artistData = await fetchSpotifyData("https://api.spotify.com/v1/me/top/artists?limit=10")
    const conatiner = document.getElementById("top-artists")
    conatiner.innerHTML = artistData.items.map(artist => 
        `<div class="card">
            <img src="${artist.images[0]?.url}" alt="${artist.name}">
            <p>${artist.name}</p>
        <div>`).join("")
}

document.getElementById("top-artists-button").addEventListener('click', () =>{
    window.location.href="./artists.html"
})
document.getElementById("top-tracks-button").addEventListener('click', () =>{
    window.location.href="./tracks.html"
})

document.getElementById("logoutButton").addEventListener('click', () =>{
    localStorage.removeItem("access_token")
    const redirectPath = window.location.hostname.includes("github.io")
    ? "/SpotifyStats/index.html" : "/index.html";
    window.location.href = redirectPath;
})

loadProfile()