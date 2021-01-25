const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2C2C2C"
const CANVAS_SIZE = 700;
/*이렇게 변수 만드는 경우: 코딩하다가 중간에 '반복'이 되는 경우 거의 무조건 변수 만듦(정해진건 X)*/

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
/*맨 처음 배경 이미지가 투명이 아닌 흰색이 되도록 */
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
/*마우스는 항상 움직임. 마우스로 선을 그으면 첫 포인트와 엔딩포인트는 당연히 다르게 됨. 
Path는 선, Stroke는 획을 긋는 것*/ 

let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

        if(!painting){
            ctx.beginPath();
            ctx.moveTo(x, y);
            console.log("creating line in ", x, y);
        }else{
            ctx.lineTo(x, y);
            ctx.stroke();   
            console.log("creating line in ", x, y);
            }
    }

    function handleColorClick(event){
        const color = event.target.style.backgroundColor;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

    }

function handleRangeChange(event){
        const size = event.target.value;
        ctx.lineWidth = size;
}

function handModeClick(){
        if (filling==true){
            filling = false;
            mode.innerText = "Fill";
        }else{
            filling = true;
            mode.innerText="Paint";
        /*ctx.fillStyle = ctx.strokeStyle;*/ 
        }
}

function handleCanvasClick(){
        if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }    
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    
const image = canvas.toDataURL("image/jpeg");
const link = document.createElement("a");
link.href = image;
link.download = "PaintJS";
link.click();


}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick));


if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
mode.addEventListener("click", handModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}
