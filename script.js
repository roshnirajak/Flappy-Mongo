
let turn= "X";

//function to change turns
const changeTurn= ()=>{
    return turn=== "X"? "0" : "X";
}

//function to check winner
const checkWin= ()=>{

}

//game logic
let boxes= document.getElementsByClassName("box");
Array.from(boxes).forEach(element=>{
    let boxtext= element.querySelector('.text');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText===""){
            boxtext.innerText= turn;
            changeTurn();
            document.getElementsByClassName("info")[0].innerText= turn;
        }
    })
})
console.log("hello")