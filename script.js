// fetch data
const username=document.querySelector("[firstname]");
const details=document.querySelector("[details]");
const profileimage=document.querySelector("[profileimage]");
const iconmode=document.querySelector("[iconmode");
const darkligth=document.querySelector("[darkligth]")
const root=document.documentElement.style;
//display
const namedisplay=document.querySelector("[namedisplay]");
const biodisplay=document.querySelector("[biodisplay]");
const linkdisplay=document.querySelector("[linkdisplay]");
const joindatedisplay=document.querySelector("[joindatedisplay]");
const reposdisplay=document.querySelector("[reposdisplay]");
const followersdisplay=document.querySelector("[followersdisplay]");
const followingdisplay=document.querySelector("[followingdisplay]");
const locationdiaplay=document.querySelector("[locationdiaplay]");
const githublink=document.querySelector("[githublink]");
const twiterlink=document.querySelector("[twiterlink]");
const companydisply=document.querySelector("[companydisply]");
const url= "https://api.github.com/users/";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let darkMode=false;
darkligth.innerHTML="Dark";

async function ApiCall(link)
{
 console.log("userprofile");
 const response=await fetch(link)
 const data=await response.json();
 return data;
}

function render(data)
{
profileimage.src=data.avatar_url;
 namedisplay.innerHTML=data.name;
 linkdisplay.innerHTML=data.login;
 biodisplay.innerHTML=data.bio;
 const datesegments = data.created_at.split("T").shift().split("-");
 joindatedisplay.innerHTML=`Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;;
 reposdisplay.innerHTML=data.public_repos;
 followersdisplay.innerHTML=data.followers;
 followingdisplay.innerHTML=data.following;
 locationdiaplay.innerHTML=data.location!=null?data.location:"not available";
 locationdiaplay.href=data.location!=null?data.location:"#";
 githublink.innerHTML=data.html_url!=null?data.html_url:"not available";
 githublink.href=data.html_url!=null?data.html_url:"#";
 twiterlink.innerHTML=data.twitter_username!=null?data.twitter_username:"not available";
 twiterlink.href=data.twitter_username!=null?data.twitter_username:"#";
 companydisply.innerHTML=data.company!=null?data.company:"not available";
 companydisply.href=data.company!=null?data.company:"#";
}

ApiCall(url+'rathorvijay').then((data)=>{
    console.log(data);
    render(data);
}).catch((error)=>{
    alert("pls check the internet connection");
})

 details.addEventListener("submit",(e)=>{
     e.preventDefault();
     const link=url+username.value;
     ApiCall(link).then((data)=>{
         console.log(data);
         if(data.message!="Not Found")
         render(data);
         else{
            throw new Error(error);
         }
     }).catch((error)=>{
         console.log(error);
         alert(`${username.value} is not found`);
     })
 });

 function changemode(){
    if(darkMode)
    {
        root.setProperty("--lm-bg", "#F6F8FF");
        root.setProperty("--lm-bg-content", "#FEFEFE");
        root.setProperty("--lm-text", "#4B6A9B");
        root.setProperty("--lm-text-alt", "#2B3442");
        root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
        root.setProperty("--icon","black");
        root.setProperty("--placeholder","black");
        root.setProperty("--inputcolor","white");
        root.setProperty("--lm-text", "black");
        root.setProperty("--inputnav","#fefefe");
        iconmode.src="moon-icon.svg";
        root.setProperty("--textcolor","black");
        // modetext.innerText = "DARK";
        // modeicon.src = "./assets/images/moon-icon.svg";
        root.setProperty("--lm-icon-bg", "brightness(100%)");
        darkligth.innerHTML="Dark";
        root.setProperty("--tag","blue");
        darkMode = false;
    }
    else{
        root.setProperty("--lm-bg", "#141D2F");
        root.setProperty("--lm-bg-content", "#1E2A47");
        root.setProperty("--lm-text", "white");
        root.setProperty("--inputnav","black");
        root.setProperty("--lm-text-alt", "white");
        root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
        root.setProperty("--icon","white");
        root.setProperty("--placeholder","white");
        root.setProperty("--inputcolor","black");
        iconmode.src="sun-icon.svg";
        root.setProperty("--textcolor","white");
        root.setProperty("--tag","white");
        // modetext.innerText = "LIGHT";
        // modeicon.src = "./assets/images/sun-icon.svg";
        root.setProperty("--lm-icon-bg", "brightness(1000%)");
        darkligth.innerHTML="Light"
        darkMode = true;
    }
 }

// change mode
iconmode.addEventListener("click",()=>{
    changemode();
})