const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};let n=null;t.stopBtn.disabled=!0,t.startBtn.addEventListener("click",(function(){n=setInterval((()=>{const n=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;document.body.style.backgroundColor=`${n}`,t.startBtn.disabled=!0,t.stopBtn.disabled=!1}),1e3)})),t.stopBtn.addEventListener("click",(function(){t.startBtn.disabled=!1,t.stopBtn.disabled=!0,clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.34b8e180.js.map
