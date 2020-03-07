class Timer{
    constructor(inputMin,inputSec, startBtn, pauseBtn, resetBtn, callbacks){
        this.inputMin =inputMin;
        this.inputSec =inputSec;  
        this.totalDuration = 0;
        this.timeLeft = 0;
        this.resetNum = 0;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;
        this.resetBtn = resetBtn;
        this.disabledStatus = false;
        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
            this.onReset = callbacks.onReset;
        }
        this.startBtn.addEventListener('click', this.start);
        this.pauseBtn.addEventListener('click', this.pause);
        this.resetBtn.addEventListener('click', this.reset);
        this.inputMin.addEventListener('change', this.setTotal);
        this.inputSec.addEventListener('change', this.setTotal);
        this.reset();
    }
    
    setTotal = () =>{
        let second;
        let minute;
        
        if(this.inputMin.value.length===0){
            this.inputMin.value = 0;
        }
        if(this.inputSec.value.length===0){
            this.inputSec.value = 0;
        }
        if(parseInt(this.inputMin.value) < 0){
            this.inputMin.value = 0;
        }
        if(parseInt(this.inputSec.value) < 0){
            this.inputSec.value = 0;
        }

        if(parseInt(this.inputSec.value)>=60){
            this.inputSec.value = 60;
            second = parseInt(this.inputSec.value);
        }else {
            second = parseInt(this.inputSec.value);
        }

        minute = parseInt(this.inputMin.value);

        this.totalDuration = minute*60 + second;
        this.timeLeft = this.totalDuration;
    };
    start = ()=>{
        this.disabledStatus = true;
        if(this.disabledStatus){
            this.startBtn.setAttribute('disabled', 'disabled');
            this.inputMin.setAttribute('disabled', 'disabled');
            this.inputSec.setAttribute('disabled', 'disabled');
            this.resetBtn.setAttribute('disabled','disabled');
        }
        if(this.onStart){
            this.onStart(this.totalDuration);
        }  
        this.intervalID = setInterval(this.tick, 50);  
    };
    tick = ()=>{
        
        if(this.timeLeft <=0){
            this.pause();
            this.reset();
        }else{ 
            this.timeLeft = this.timeLeft -0.05;
            if(this.timeLeft <0){
                this.timeLeft = 0;
            }
            this.inputMin.value = parseInt(this.timeLeft/60);
            this.inputSec.value = parseInt(this.timeLeft%60);
            if(this.onTick){
                this.onTick(this.timeLeft);
            }
        }
       
    }
    pause = ()=>{
        clearInterval(this.intervalID);
        this.disabledStatus = false;
        if(this.disabledStatus === false){
            this.startBtn.removeAttribute('disabled');
            this.inputMin.removeAttribute('disabled');
            this.inputSec.removeAttribute('disabled');
            this.resetBtn.removeAttribute('disabled');
        };
        
    };
    reset = ()=>{
        this.inputMin.value = this.resetNum;
        this.inputSec.value = this.resetNum;
        this.totalDuration = 0;
        this.timeLeft = 0;
        if(this.onReset){
            this.onReset();
        }
    };

 };