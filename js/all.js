/**
 * 計時器
 * 1.可以開始
 * 2.可以暫停, 暫停後再重啟不會歸零
 * 3.可以重設
 * 4.外圍的邊框會隨著時間削減, 歸零時邊框也會消失
 * 5.使用者可以點擊輸入框設定時間
 * 6.class based
 */

const inputMin= document.querySelector('#durationMin');
const inputSec= document.querySelector('#durationSec');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const resetBtn = document.querySelector('#reset');

const circle = document.querySelector('circle');
//取得circle的r(半徑)
const perimeter = circle.getAttribute('r')*2*Math.PI;
//設定邊框
circle.setAttribute('stroke-dasharray', perimeter);


/**
* 1.先取得設定的時間
*/


let duration;
let timer = new Timer(inputMin, inputSec, startBtn, pauseBtn, resetBtn,{
    onStart(totalDuration){
       duration = totalDuration;
    },
    onTick(timeLeft){
        circle.setAttribute('stroke-dashoffset',(perimeter*timeLeft/duration - perimeter));
    },
    onComplete(){   
        resetCircle();
    },
    onReset(){
        resetCircle();
    }
    
});

function resetCircle(){
   circle.removeAttribute('stroke-dashoffset');
}