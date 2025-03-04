window.onload= function(){
    const hash =window.location.hash.substring(1)
    const params= new URLSearchParams(hash)
    const accessToken = params.get("access_token")

    if(accessToken){
        localStorage.setItem("access_token", accessToken)
        window.location.href="./profile.html"
    }
    else{
        window.location.href="/index.html"
    }
}