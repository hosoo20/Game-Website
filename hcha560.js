const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');
 

  burger.addEventListener('click',()=>{
      nav.classList.toggle('nav-active');
      burger.classList.toggle('burger-active');
      if (nav.classList.contains("nav-active")) {
          nav.style.animation = `navSlidein 0.5s`;
        } else {
          nav.style.animation = `navSlideOut 0.5s`;
        }
      //animation
      navLinks.forEach((link, index)=>{
          if (link.style.animation) {
              link.style.animation = '';
          } else {
              link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.1}s`;
          }
      });
      burger.classList.toggle('toggle');
  });
}
navSlide();


function openTab(evt, tab) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tabLink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " active";

  //make nav slide back out once clicked on link
  const nav = document.querySelector('.nav-links');
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelectorAll('.nav-links li');
  //nav.classList.add('nav-links');

  if (nav.classList.contains("nav-active"))  {
    nav.style.animation = `navSlideOut 0.5s`;
    navLinks.forEach((link, index)=>{
      if (link.style.animation) {
          link.style.animation = '';
      } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.1}s`;
      }
  });
    nav.classList.remove("nav-active");
    burger.classList.remove('toggle');
  }

}
document.getElementById("defaultOpen").click();

//GETversion API
function versionFunction() {
  fetch('https://cws.auckland.ac.nz/gas/api/Version', {
      headers: {
          "Accept": "text/plain",
      }
  })
  .then((response) => response.text())
  .then((data) => {document.getElementById("version").innerText += " " + data; })
}
versionFunction();



//Login/Register
var x=document.getElementById('login');
var y=document.getElementById('register');
var z=document.getElementById('login-register-btn');

function register(){
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
}
function login(){
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
}

var form = document.getElementById('register');
form.addEventListener('submit', function(e){
    //auto submission of the form
    e.preventDefault();

    var unamer = document.getElementById('uname').value;
    var pswr = document.getElementById('psw').value;
    var emailr = document.getElementById('address').value;

    //fetch post request
    fetch('https://cws.auckland.ac.nz/gas/api/Register',{
        method: 'POST',
        body: JSON.stringify({
            username: unamer,
            password: pswr,
            address: emailr

        }),
        headers: {
            "Content-Type": "application/json",
            'Accept': 'text/plain'
        }
    })
    .then(function(response){
        return response.text();
    })
    .then(function(data){
        //console.log(data);
        alert(data);
    })
});

//Store Log-in Details
var username="";
var password ="";

var formLogin = document.getElementById('login');
formLogin.addEventListener('submit', function(e){
    e.preventDefault();
    var uname = document.getElementById('unamel').value;
    var psw = document.getElementById('pswl').value;


    fetch('https://cws.auckland.ac.nz/gas/api/VersionA',{
        headers: {
            'Authorization': 'Basic ' + btoa(`${uname}:${psw}`),
            'Accept': 'text/plain'
        }
    })
    .then(function(response){
        if (response.ok) {
            alert("Successfully logged in");
            username = uname;
            password = psw;
            var loginBtnValue = document.getElementById('login-nav-btn').value;
            //alert(loginBtnValue);
            if (loginBtnValue == "login"){
              document.getElementById('loginNavText').textContent = "Logout";
              document.getElementById('login-nav-btn').value = "logout";
              document.getElementById("defaultOpen").click();
            }
            return response.text();
        }
        else{
            alert("Incorrect credentials. Please try again");
        }        
    })
});

//Logout
var loginNav = document.getElementById('login-nav-btn');
loginNav.addEventListener('click', function(e){
  var loginBtnValue = document.getElementById('login-nav-btn').value;
  if (loginBtnValue == "logout"){
    window.location.reload();
  }
})





//Products//
fetch('https://cws.auckland.ac.nz/gas/api/AllItems').then((data)=>{
    //Check in console if response is 200:  succesful
    //console.log(data);  //json format

    return data.json(); //converted to object
}).then((objectData)=>{     
        //console.log(objectData[0].name);
        let tableData="";
        objectData.map((values)=>{
            tableData+=` <tr>
            <td data-label="Image" id="image-label"><img alt="Product Image" id="itemPhoto" src="https://cws.auckland.ac.nz/gas/api/ItemPhoto/${values.id}"></td>
            <td data-label="Description" id="descrip" class="description-p"><p><b>${values.name}</b></p>
                                  <p>${values.description}</p>
                                  <p>$${values.price}</p>
                                  <p><button onclick="buyProduct()" id="buy" value="${values.id}" class="btn">Buy Now</button></p></td>
            </tr>`;
        });
        document.getElementById("table_body").innerHTML = tableData;
})

var formSearch = document.getElementById("searchbar");
formSearch.addEventListener('input', function(e){
  e.preventDefault();
  var itemName = document.getElementById('searchitem').value;
  if  (itemName){
    fetch(`https://cws.auckland.ac.nz/gas/api/Items/${itemName}`).then((data)=>{
      //console.log(data);
      return data.json();
    }).then((objectData)=>{     
      //console.log(objectData[0].name);
      let tableData="";
      objectData.map((values)=>{
          tableData+=` <tr>
          <td data-label="Image" id="image-label"><img alt="Product Image" id="itemPhoto" src="https://cws.auckland.ac.nz/gas/api/ItemPhoto/${values.id}"></td>
          <td data-label="Description" id="descrip" class="description-p"><p><b>${values.name}</b></p>
                                <p>${values.description}</p>
                                <p>$${values.price}</p>
                                <p><button onclick="buyProduct()" id="buy" value="${values.id}" class="btn">Buy Now</button></p></td>
          </tr>`;
      });
      document.getElementById("table_body").innerHTML = tableData;
    })
  }
  else{
    fetch('https://cws.auckland.ac.nz/gas/api/AllItems').then((data)=>{
      return data.json(); //converted to object
    }).then((objectData)=>{     
            let tableData="";
            objectData.map((values)=>{
                tableData+=` <tr>
                <td data-label="Image" id="image-label"><img alt="Product Image" id="itemPhoto" src="https://cws.auckland.ac.nz/gas/api/ItemPhoto/${values.id}"></td>
                <td data-label="Description" id="descrip" class="description-p"><p><b>${values.name}</b></p>
                                      <p>${values.description}</p>
                                      <p>$${values.price}</p>
                                      <p><button onclick="buyProduct()" id="buy" value="${values.id}" class="btn">Buy Now</button></p></td>
                </tr>`;
            });
            document.getElementById("table_body").innerHTML = tableData;
    }) 
  }
})

//Buy
function buyProduct() {
      var buyId = document.getElementById("buy").value;
      //alert(buyId);
      //alert(username);
      if (username && password){
          fetch(`https://cws.auckland.ac.nz/gas/api/PurchaseItem/${buyId}`,{
              headers: {
                  'Authorization': 'Basic ' + btoa(`${username}:${password}`),
                  'Accept': 'text/plain'
              }
          })
          .then(function(response){
              if (response.ok) {
                  alert(`Successfully purchased product ID:${buyId}`);
              }
              else{
                  alert("Product does not exist.");
              }        
          })
      }
      else{
        alert("Please Log in to purchase.");
      }
}



//Comments Section
// async function UpdateCommentsFunction()  {
//       const response = await fetch('https://cws.auckland.ac.nz/gas/api/Comments');
//       //Check in console if response is 200:  succesful
//       //console.log(data);  //json format
//       const com = await response.text();
//       return com; 
// }
// var commentUpdate = document.getElementById('form-comment');
// commentUpdate.addEventListener("submit", async() =>{
//       let textData ="";
//       textData = await UpdateCommentsFunction();
//       document.getElementById("iframeComment").src = 'https://cws.auckland.ac.nz/gas/api/Comments';
// })
//UpdateCommentsFunction();
//setInterval(UpdateCommentsFunction, 1000);

const UpdateCommentsFunction = () => {
  fetch('https://cws.auckland.ac.nz/gas/api/Comments').then((data)=>{
      //Check in console if response is 200:  succesful
      //console.log(data);  //json format
      return data.text(); 
  }).then((textData)=>{     
          document.getElementById("iframeComment").src = 'https://cws.auckland.ac.nz/gas/api/Comments';
  })
}
setInterval(UpdateCommentsFunction, 1000);


var commentForm = document.getElementById('form-comment');
commentForm.addEventListener('submit', function(e){
    e.preventDefault();

    var nameSent = document.getElementById('commentName').value;
    var commentSent = document.getElementById('commentWrote').value;
    if(commentSent){
        //fetch post request
        fetch('https://cws.auckland.ac.nz/gas/api/Comment',{
          method: 'POST',
          body: JSON.stringify({
              comment: commentSent,
              name: nameSent
          }),
          headers: {
              "Content-Type": "application/json",
              'Accept': 'text/plain'
          }
      })
      .then((data)=>{
          return data.text();
      }).then((textData)=>{     
      var frameObj = document.getElementById('iframeComment');
      frameObj.innerHTML +=textData;
      
      //document.getElementById("comment-table_body").innerHTML += tableData;
      })
    }else{
      alert("Please enter something first!");
    }

});



//Game Section
function startGame() {
  //alert(buyId);
  //alert(username);
  if (username && password){
      fetch('https://cws.auckland.ac.nz/gas/api/PairMe',{
          headers: {
              'Authorization': 'Basic ' + btoa(`${username}:${password}`),
              'Accept': 'text/plain'
          }
      })
      .then((data)=>{
        return data.json();   
      }).then((objectData)=>{
        var gameoutput = document.getElementById('gameStartData');
        let textOutput ="";
        let opponent = objectData.player1;
        let opponentMove = objectData.lastMovePlayer1;
        if (objectData.player1 == username){
          opponent = objectData.player2;
          opponentMove = objectData.lastMovePlayer2;
        }
        if (objectData.state == "progress"){
           textOutput =`<p>You are in a game with user     <b>${opponent}</b></p>
                        <p>Last Move played by Opponent:   <b>${opponentMove}</b></p>`; 
            document.getElementById('quitBtn').style.display="inline-block"; 
            document.getElementById('quitBtn').value=`${objectData.gameId}`;        
        }
        else{
          textOutput =`<p>You have not been paired with an opponent.</p>
          <p>Click the Pair Me button to see your pairing state.</p>
          <br>
          <p><i>Note: Please do not spam the Pair Me button </i><p>`;   
        }
        gameoutput.innerHTML = textOutput;

      })
  }
  else{
    alert("Please Log in to start a Game.");
  }
}


function quitGame() {
  //alert(buyId);
  //alert(username);
  if (username && password){
      var btnValue = document.getElementById('quitBtn').value;
      fetch(`https://cws.auckland.ac.nz/gas/api/QuitGame?gameId=${btnValue}`,{
          headers: {
              'Authorization': 'Basic ' + btoa(`${username}:${password}`),
              'Accept': 'text/plain'
          }
      })
      .then((data)=>{
        return data.text();   
      }).then((textData)=>{
          var gameoutput = document.getElementById('gameStartData');      
          gameoutput.innerHTML = textData;
          document.getElementById('quitBtn').style.display="none";

      })
  }
  else{
    alert("Something went wrong. Please try again");
  }
}
