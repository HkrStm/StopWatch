const timeElement = document.getElementById('time');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

let elapsed = 0;

let intervalId = null;

function updateTime() {
    const ms = elapsed % 1000;
    const s = Math.floor(elapsed / 1000) % 60;
    const m = Math.floor(elapsed / (1000*60)) % 60;
    const h = Math.floor(elapsed / (1000*60*60));
    
    const msStr = ms.toString().padStart(2, '0').slice(0,2);
    const sStr = s.toString().padStart(2, '0');
    const mStr = m.toString().padStart(2, '0');
    const hStr = h.toString().padStart(2, '0');
    
    timeElement.innerText = `${hStr}:${mStr}:${sStr}.${msStr}`;
}

start.addEventListener('click', function() {
	if (start.disabled === false){
		start.setAttribute("disabled", true);
	}
		
    let pre = new Date();
    intervalId = setInterval(function() {
    const now = new Date();
    elapsed += now - pre;
    pre = now;
    updateTime();
    console.log(elapsed);
	}, 10);
	
});

stop.addEventListener('click', function(){
    if(start.disabled === true){
		start.removeAttribute("disabled");
	}
    
    clearInterval(intervalId);
    intervalId = null;
    
    if(intervalId !== null){ return; }
    let pre = new Date();
    intervalId = setInterval(function() {
        const now = new Date();
        elapsed += now - pre;
        pre = now;
        updateTime();
        console.log(elapsed);
    }, 10);
});

stop.addEventListener('click', function(){
    clearInterval(intervalId);
    intervalId = null;
});

reset.addEventListener('click', function(){
    if(intervalId !== null){ return; }
    elapsed = 0;
    updateTime();
});