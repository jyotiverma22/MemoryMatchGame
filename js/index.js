var arr=[];
var moves=0;
var score=0;
var final=0;
var time=40;
var ckeckInterval;


function InitializeValues()
{
  document.getElementById("moveCount").innerHTML=moves;
  document.getElementById("timeLeft").innerHTML=time;
  document.getElementById("scoreCount").innerHTML=score;
  document.getElementById("matchedFound").innerHTML=final;

}


function loadFunction()
{
  InitializeValues();
  document.getElementById("startBtn").style.display='block';
  document.getElementById("restartBtn").style.display='none';
  
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

   
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

   
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function startShuffle()
{
  clearInterval(ckeckInterval);
   InitializeValues();

  disableClick();
  document.getElementById("thinkImg").style.display='block';
  document.getElementById("startBtn").style.display='none';
  document.getElementById("restartBtn").style.display='block';
  document.getElementById("fireImg").style.display='none';
  arr=[];
  moves=0;
  final=0;
  score=0;
  time=40;
 InitializeValues();
  var images=["url('..//images/animals/1.jpg')",
              "url('..//images/animals/2.jpg')",
              "url('..//images/animals/3.jpg')",
              "url('..//images/animals/4.jpg')",
              "url('..//images/animals/5.jpg')",
              "url('..//images/animals/6.jpg')",
              "url('..//images/animals/7.jpg')",
              "url('..//images/animals/8.jpg')",
              "url('..//images/animals/1.jpg')",
              "url('..//images/animals/2.jpg')",
              "url('..//images/animals/3.jpg')",
              "url('..//images/animals/4.jpg')",
              "url('..//images/animals/5.jpg')",
              "url('..//images/animals/6.jpg')",
              "url('..//images/animals/7.jpg')",
              "url('..//images/animals/8.jpg')"];

  images= shuffle(images);

  for(var i=1;i<=images.length;i++)
  {
      document.getElementById("div"+i).style.backgroundImage=images[i-1];
      document.getElementById("div"+i).style.display='block';      
  }


  setTimeout(displayCardNone,2000);

 ckeckInterval= setInterval(checkTime,1000);

}


function displayCardNone()
{
 for(var i=1;i<=16;i++)
  {
      document.getElementById("div"+i).style.display='none';            
  }

  enableClick();

}


function displayCardBlock(ctrl)
{

  document.getElementById("fireImg").style.display='none';
 
  document.getElementById("moveCount").innerHTML=moves;
  
  var nodes = ctrl.getElementsByTagName("div");
  var i= nodes[0].id;
  document.getElementById(i).style.display='block';

    if(arr.length===0)
  {
     moves+=1;
    arr.push(i);
     document.getElementById("moveCount").innerHTML=moves;
  }

  else if(arr.length===1)
  {
    if(i===arr[0])
    {
      console.log("Already selected");
    }
    else{
       moves+=1;
      arr.push(i);
       document.getElementById("moveCount").innerHTML=moves;
    }
  }



  if(arr.length===2)
  {
    disableClick();
    setTimeout(match,400);
  }

}


function match()
{


  
  var img = document.getElementById(arr[0]),
  style1 = img.currentStyle || window.getComputedStyle(img, false),
  bi = style1.backgroundImage.slice(4, -1).replace(/"/g, "");
  
  var img2 = document.getElementById(arr[1]),
  style2 = img2.currentStyle || window.getComputedStyle(img2, false),
  bi2 = style2.backgroundImage.slice(4, -1).replace(/"/g, "");



  if(bi===bi2)
  {
    score+=50;

     var a= document.getElementById(arr[0]).parentElement;
     a.attributes.onclick.nodeValue="";   
     document.getElementById(arr[1]).parentElement.attributes.onclick.nodeValue="";
     final+=1;
     arr=[];
     document.getElementById("fireImg").style.display='block';
     document.getElementById("scoreCount").innerHTML=score;
     document.getElementById("matchedFound").innerHTML=final;
     
  }

  else{
    document.getElementById(arr[0]).style.display='none'
    document.getElementById(arr[1]).style.display='none';
    console.log(arr[0]);
    arr=[]; 
  }
  enableClick();

}


function endFunction()
{

  document.getElementById("fireImg").style.display='none'; 
  document.getElementById("thinkImg").style.display='none';
  document.getElementById("endBtn").style.display='none';
  document.getElementById("restartBtn").style.display='none';
  document.getElementById("startBtn").style.display='none';
  document.getElementById("PlayArea").style.display='none';
  document.getElementById("resultArea").style.display='block';
   document.getElementById("fireImg").style.display='none';

  document.getElementById("ResultTime").innerHTML=(40-time)+" ";

  document.getElementById("ResultMove").innerHTML=moves;
  
  document.getElementById("ResultScore").innerHTML=score;
  
  document.getElementById("ResultMatch").innerHTML=final;
  
  

  
  
}


function startGamePanel()
{
   document.getElementById("resultArea").style.display='none';
  document.getElementById("PlayArea").style.display='block';
  document.getElementById("endBtn").style.display='block';
   document.getElementById("startBtn").style.display='block';
  document.getElementById("restartBtn").style.display='none';
   document.getElementById("fireImg").style.display='none';
  moves=0;
  score=0;
  final=0;
  time=40;
  clearInterval(ckeckInterval);
  displayCardNone();
  InitializeValues();
  disableClick();
 
}



function checkTime()
{
  time-=1;
  document.getElementById("timeLeft").innerHTML=time;
  if(time===0)
  {
     clearInterval(ckeckInterval);
     
    endFunction();
    document.getElementById("resultHead").innerHTML="OOPS! Time OUT";


  }
  else  if(final===8)
    {
        clearInterval(ckeckInterval);
       
       endFunction();
       document.getElementById("resultHead").innerHTML="Congratulation! You Won";

    }
  

}

function endGame(){
        clearInterval(ckeckInterval);
      endFunction();
  document.getElementById("resultHead").innerHTML="Alas! Try Again";
}


function disableClick()
{
    var list=  document.getElementsByClassName("bgcard");
  console.log(list);

  for(var i=0;i<list.length;i++)
  {
    list[i].attributes.onclick.nodeValue="";
  }

}

function enableClick()
{
  var list=  document.getElementsByClassName("bgcard");
  console.log(list);

  for(var i=0;i<list.length;i++)
  {
    list[i].attributes.onclick.nodeValue="displayCardBlock(this)";
  }


}