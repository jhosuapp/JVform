(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))v(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const L of r.addedNodes)L.tagName==="LINK"&&L.rel==="modulepreload"&&v(L)}).observe(document,{childList:!0,subtree:!0});function y(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function v(t){if(t.ep)return;t.ep=!0;const r=y(t);fetch(t.href,r)}})();const w=(l,d,y)=>{const v=()=>({user:/^[a-zA-ZÀ-ÿ\s\.-_@]{3,40}/,text:/^[a-zA-ZÀ-ÿ\s]{3,40}$/,phone:/^(\+)?[\d\s\-\.]{5,30}$/,email:/^[\w\d\.\-]+@+[\w\d]+\.+[\w\d\.]+$/,password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,message:/.{10,200}/}),t=()=>({text:"text",number:"number",user:"user",phone:"phone",email:"email",password:"password",message:"message"}),r=A=>{A.forEach(s=>{if(s.dataset.mandatory=="false"){const a=s.closest(".JVform__ctn-input");a&&a.classList.add("validateVF")}else{const a=document.createElement("div");a.classList.add("JVform__error-message");const V=s.dataset.error,e=s.name;let o;V?o=`<p>${V}</p>`:o=`<p>Ingrese ${e}</p>`,a.innerHTML=o,s.parentNode.append(a)}})};return(()=>{const A=document.querySelector(`${l}`),s=document.querySelectorAll(`${l} input`),m=document.querySelectorAll(`${l} textarea`);r(s),r(m);const a=()=>{const{user:e,text:o,phone:c,email:n,password:u}=v();s&&s.forEach(i=>{const p=i.dataset.validation,f=t()[p],E=i.closest(".JVform__ctn-input"),h=(F,_)=>{f==F&&(_.test(i.value)?E.classList.add("validateVF"):E.classList.remove("validateVF"))};h("text",o),h("phone",c),h("email",n),h("email",n)})},V=()=>{const{message:e}=v();m&&m.forEach(o=>{const c=o.closest(".JVform__ctn-input");e.test(o.value)?c.classList.add("validateVF"):c.classList.remove("validateVF")})};s&&s.forEach(e=>{(e.type=="checkbox"||e.type=="radio")&&e.addEventListener("change",()=>{e.checked?e.closest(".JVform__ctn-input").classList.add("validateVF"):e.closest(".JVform__ctn-input").classList.remove("validateVF")})}),s&&s.forEach(e=>{e.type=="file"&&e.addEventListener("change",()=>{const o=e.files[0].size,c=e.files[0].name,n=parseInt(e.dataset.filesize),u=e.dataset.fileallowed,i=e.closest(".JVform__ctn-input"),p=c.split("."),g=p[p.length-1].toLowerCase();u&&(u.split(",").includes(g)?i.classList.add("validateVF"):i.classList.remove("validateVF")),n&&(o<n?i.classList.add("validateVF"):i.classList.remove("validateVF")),u&&n&&(u.split(",").includes(g)&&o<n?i.classList.add("validateVF"):i.classList.remove("validateVF"))})}),s&&s.forEach(e=>{e.addEventListener("keyup",a),e.addEventListener("blur",a)}),m&&m.forEach(e=>{e.addEventListener("keyup",V),e.addEventListener("blur",V)}),A.addEventListener("submit",e=>{const o=document.querySelectorAll(`${l} .validateVF`),c=document.querySelectorAll(`${l} .JVform__ctn-input`),n=document.querySelector(`${l} .JVform__error-send`),u=i=>{i.forEach(p=>{const g=p.parentNode,f=g.querySelector(".JVform__error-message");g.classList.contains("validateVF")?f&&f.classList.remove("active"):f&&f.classList.add("active")})};console.log(c.length,o.length),c.length==o.length?(d==!0||d=="true"&&e.preventDefault(),y(),n&&n.classList.remove("active")):(u(s),u(m),n&&n.classList.add("active"),e.preventDefault())})})()};const T=()=>{const l=document.querySelector("#primerFormulario");let d=new FormData(l);alert(d)};window.addEventListener("load",()=>{w("#primerFormulario",!0,T)});
