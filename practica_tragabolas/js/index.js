document.addEventListener('DOMContentLoaded', () => {
    
    const pantalla = document.querySelector("#pantalla");
    const mrhippo  = document.querySelector("#mrhippo");
    const amountBalls = 20

    let bolesGrogues = 0;
    let punts = 0;
    let boles = [];

    mrhippo.style.top = 48 + "%";
    mrhippo.style.left = 48 + "%";

    document.addEventListener('mousemove', function(ev){
        const mouseX   = ev.clientX;
        const mouseY   = ev.clientY;

        mrhippo.style.left = mouseX + "px";
        mrhippo.style.top = mouseY + "px";

        detectarXoc(boles);
        controlarLimits();

        if (bolesGrogues == 0) {
            mostrarResultat();
        }
    });

    function generateBalls(amountBalls, boles){
        let color;
        let top;
        let left;
        for (let i = 0; i < amountBalls; i++) {
            boles[i] = document.createElement("div");
            document.body.appendChild(boles[i]);
    
            let mida = Math.random() * 50 + 25;
            boles[i].style.width = mida + "px";
            boles[i].style.height = mida + "px";
            boles[i].style.borderRadius = "50%";
            boles[i].style.position = "absolute";
    
    
            color = Math.round(Math.random() * 4);
            switch (color) {
                case 0: boles[i].style.backgroundColor = "red"; break;
                case 1: boles[i].style.backgroundColor = "yellow"; break;
                case 2: boles[i].style.backgroundColor = "blue"; break;
                case 3: boles[i].style.backgroundColor = "green"; break;
            }
            if (color==1) {
                boles[i].classList.add("amarilla");
                bolesGrogues++;
            }
    
            top = Math.random() * (pantalla.offsetHeight - mida);
            left = Math.random() * (pantalla.offsetWidth - mida);
            boles[i].style.top = top + "px";
            boles[i].style.left = left + "px";
        }
    
        return boles;
    }
    

    function detectarXoc(boles){
        for (i = 0; i < amountBalls; i++) {
            const dreta = mrhippo.offsetLeft+mrhippo.clientWidth > boles[i].offsetLeft;
            const esquerra = mrhippo.offsetLeft < boles[i].offsetLeft+mrhippo.clientWidth;
            const dalt = mrhippo.offsetTop < boles[i].offsetTop+mrhippo.clientHeight;
            const sota = mrhippo.offsetTop+mrhippo.clientHeight > boles[i].offsetTop;
                
            if (dreta && esquerra && dalt && sota) {
                if (boles[i].classList.contains("amarilla")) {
                    punts++;
                    bolesGrogues--;
                }
                else {
                    punts--;
                }
                boles[i].remove();
            }
        }
    }

    function controlarLimits(){
        if(mrhippo.offsetLeft < 0) 
            mrhippo.style.left = 0;
        if(mrhippo.offsetTop < 0)  
            mrhippo.style.top  = 0;
        if(mrhippo.offsetTop+mrhippo.clientHeight > pantalla.clientHeight) 
            mrhippo.style.top  = (pantalla.clientHeight - mrhippo.clientHeight) + "px";
        if(mrhippo.offsetLeft+mrhippo.clientWidth > pantalla.clientWidth)
            mrhippo.style.left = (pantalla.clientWidth - mrhippo.clientWidth) + "px";
    }

    function mostrarResultat(){
        document.body.innerHTML = '';

        const resultat = document.createElement("h1");
        const puntuacio = document.createElement("h2");

        if (punts > 0) {
            resultat.textContent = "Victory!";
        } else {
            resultat.textContent = "Game Over!";
        }
        puntuacio.textContent = "Puntuació: " + punts;

        resultat.style.textAlign = "center";
        puntuacio.style.textAlign = "center";

        document.body.appendChild(resultat);
        document.body.appendChild(puntuacio);

        setTimeout(function(){location.reload();},5000);
    }
    

generateBalls(amountBalls, boles);
});