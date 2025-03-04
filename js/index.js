const authEndPoint = 'https://accounts.spotify.com/authorize'
const clientId = '6ce2e3aa41b949cc9806d3b53a39def4'
const redirectUri = 'http://localhost:5500/html/callback.html'
const scope = 'user-read-private user-read-email user-top-read user-read-recently-played'

document.getElementById('loginButton').addEventListener('click', () =>{
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`
    window.location.href = authUrl
})