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

//loads top artist by term and then creates a div thats appended onto the main container
async function loadTopArtists(term){
    const artistData = await fetchSpotifyData(`https://api.spotify.com/v1/me/top/artists?time_range=${term}&limit=10`)
    const container = document.getElementById("top-artists")
    container.innerHTML=""
    artistData.items.forEach(artist => {
        const card=document.createElement("div")
        card.classList.add('card')
        card.innerHTML =
            `<img src="${artist.images[0]?.url}" alt="${artist.name}">
            <p>${artist.name}</p>`
        container.appendChild(card)
    })
}

//buttons on the side 
document.getElementById("home-button").addEventListener('click', () =>{
    const basePath = window.location.hostname.includes("github.io")
        ? "/SpotifyStats/html/profile.html"  // GitHub Pages absolute path
        : "../html/profile.html"; 
    window.location.href=basePath
})

document.getElementById("top-tracks-button").addEventListener('click', () =>{
    window.location.href="./tracks.html"
})

//these functions change the time frame the user selects
document.getElementById("4weeks").addEventListener('click', () =>{
    loadTopArtists("short_term")
    document.getElementsByClassName("filterActive")[0].classList.remove("filterActive")
    document.getElementById("4weeks").classList.add("filterActive")
    
})

document.getElementById("6months").addEventListener('click', () =>{
    loadTopArtists("medium_term")
    document.getElementsByClassName("filterActive")[0].classList.remove("filterActive")
    document.getElementById("6months").classList.add("filterActive")
})


document.getElementById("allTime").addEventListener('click', () =>{
    loadTopArtists("long_term")
    document.getElementsByClassName("filterActive")[0].classList.remove("filterActive")
    document.getElementById("allTime").classList.add("filterActive")
})

//logout button-redirects to login page and removes token
document.getElementById("logoutButton").addEventListener('click', () =>{
    localStorage.removeItem("access_token")
    window.location.href="/index.html"
})

loadTopArtists("medium_term")