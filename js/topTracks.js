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

async function loadTopTracks(term){
    const trackData = await fetchSpotifyData(`https://api.spotify.com/v1/me/top/tracks?time_range=${term}&limit=10`)
    const container = document.getElementById("top-tracks")
    container.innerHTML=""
    trackData.items.forEach(track => {
        const card=document.createElement("div")
        card.classList.add('card')
        card.innerHTML =
        `<img src="${track.album.images[0]?.url || ''}" alt="${track.name}">
            <p>${track.name} - ${track.artists.map(a => a.name).join(", ")}</p>`
        container.appendChild(card)
    })
}

document.getElementById("home-button").addEventListener('click', () =>{
    window.location.href="./profile.html"
})

document.getElementById("top-artists-button").addEventListener('click', () =>{
    window.location.href="./artists.html"
})

//these functions change the time frame the user selects
document.getElementById("4weeks").addEventListener('click', () =>{
    loadTopTracks("short_term")
    document.getElementsByClassName("filterActive")[0].classList.remove("filterActive")
    document.getElementById("4weeks").classList.add("filterActive")
    
})

document.getElementById("6months").addEventListener('click', () =>{
    loadTopTracks("medium_term")
    document.getElementsByClassName("filterActive")[0].classList.remove("filterActive")
    document.getElementById("6months").classList.add("filterActive")
})


document.getElementById("allTime").addEventListener('click', () =>{
    loadTopTracks("long_term")
    document.getElementsByClassName("filterActive")[0].classList.remove("filterActive")
    document.getElementById("allTime").classList.add("filterActive")
})

//logout button-redirects to login page and removes token
document.getElementById("logoutButton").addEventListener('click', () =>{
    localStorage.removeItem("access_token")
    window.location.href="/index.html"
})


loadTopTracks("medium_term")