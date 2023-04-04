(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const f of n.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&u(f)}).observe(document,{childList:!0,subtree:!0});function g(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function u(t){if(t.ep)return;t.ep=!0;const n=g(t);fetch(t.href,n)}})();const _=()=>({user:/^[a-zA-ZÀ-ÿ\s\.-_@]{3,40}/,text:/^[a-zA-ZÀ-ÿ\s]{3,40}$/,phone:/^(\+)?[\d\s\-\.]{5,30}$/,email:/^[\w\d\.\-]+@+[\w\d]+\.+[\w\d\.]+$/,password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){4,50}$/,message:/.{10,200}/,url:/[a-zA-Z0-9_.+-]{0,3}\.[a-zA-Z0-9-]{0,100}\.[a-zA-Z0-9-.]+$/}),T=()=>({text:"text",number:"number",user:"user",phone:"phone",email:"email",password:"password",message:"message",url:"url"}),h=c=>{c.forEach(a=>{if(a.dataset.mandatory=="false"){const u=a.closest(".JVform__ctn-input");u&&u.classList.add("validateVF")}else{const u=document.createElement("div");u.classList.add("JVform__error-message");const t=a.dataset.error,n=a.name;let f;t?f=`<p>${t}</p>`:f=`<p>Ingrese ${n}</p>`,u.innerHTML=f,a.parentNode.append(u)}})},C=()=>{const c="abcdefghijklmn\xF1opqrstuvwxyz",a="ABCDEFGHIJKLMN\xD1OPQRSTUVWXYZ",g="0123456789",u="!@#$%^&*()<>?{}[]";let t="";for(let n=0;n<7;n++)t+=c.charAt(Math.floor(Math.random()*c.length)),t+=g.charAt(Math.floor(Math.random()*g.length)),t+=a.charAt(Math.floor(Math.random()*a.length)),t+=u.charAt(Math.floor(Math.random()*u.length));return t};function M(c,a){return this.principalMethod=a,(()=>{const u=document.querySelector(`${c}`),t=document.querySelectorAll(`${c} input`),n=document.querySelectorAll(`${c} textarea`),f=document.querySelectorAll(`${c} select`);h(t),h(n),h(f);const y=()=>{const{user:e,text:s,phone:r,email:o,password:l,url:d}=_();t&&t.forEach(i=>{const m=i.dataset.validation,V=i.dataset.expresion,P=i.dataset.mandatory,S=T()[m],v=i.closest(".JVform__ctn-input"),b=new RegExp(V),p=($,x)=>{V&&P!="false"?b.test(i.value)?(v.classList.add("validateVF"),v.classList.remove("errorValidateVF")):v.classList.remove("validateVF"):S==$&&P!="false"&&(x.test(i.value)?(v.classList.add("validateVF"),v.classList.remove("errorValidateVF")):v.classList.remove("validateVF"))};p("text",s),p("phone",r),p("email",o),p("password",l),p("url",d)})},A=()=>{const{message:e}=_();n&&n.forEach(s=>{const r=s.dataset.expresion,o=s.dataset.mandatory,l=s.closest(".JVform__ctn-input"),d=new RegExp(r);r&&o!="false"?d.test(s.value)?(l.classList.add("validateVF"),l.classList.remove("errorValidateVF")):l.classList.remove("validateVF"):o!="false"&&(e.test(s.value)?(l.classList.add("validateVF"),l.classList.remove("errorValidateVF")):l.classList.remove("validateVF"))})};t&&t.forEach(e=>{const s=e.dataset.mandatory;(e.type=="checkbox"||e.type=="radio")&&e.addEventListener("change",()=>{const r=e.closest(".JVform__ctn-input");s!="false"&&(e.checked?r.classList.add("validateVF"):r.classList.remove("validateVF"))})}),t&&t.forEach(e=>{e.type=="file"&&e.addEventListener("change",()=>{let s,r,o,l,d,i,m;e.files[0]&&(s=e.files[0].size,r=e.files[0].name,o=parseInt(e.dataset.filesize),l=e.dataset.fileallowed,d=e.closest(".JVform__ctn-input"),i=r.split("."),m=i[i.length-1].toLowerCase()),l&&(l.split(",").includes(m)?d.classList.add("validateVF"):d.classList.remove("validateVF")),o&&(s<o?d.classList.add("validateVF"):d.classList.remove("validateVF")),l&&o&&(l.split(",").includes(m)&&s<o?d.classList.add("validateVF"):d.classList.remove("validateVF"))})}),t&&t.forEach(e=>{const s=e.dataset.confirmpass;if(e.type=="password"&&s){const r=()=>{const o=e.value,l=e.dataset.match,d=document.querySelector(`${l}`).value,i=e.closest(".JVform__ctn-input");d==o?(i.classList.add("validateVF"),i.classList.remove("errorValidateVF")):(i.classList.remove("validateVF"),i.classList.add("errorValidateVF"))};e.addEventListener("keyup",r),e.addEventListener("focus",r),e.addEventListener("blur",r)}});const{clsBtnGenerator:E,clsInputGenerator:F}=a.password;if(E&&F){const e=document.querySelector(`${E}`),s=document.querySelector(`${F}`);e&&e.addEventListener("click",()=>{const r=C();s&&(s.value=r),s.focus(),s.blur()})}const{clsShowHiddePass:w}=a.password;if(w){const e=document.querySelectorAll(`${w}`);e&&e.forEach(s=>{s.addEventListener("click",()=>{const o=s.closest(".JVform__ctn-input").querySelector("input");s.classList.toggle("active"),o.type=="password"?o&&o.setAttribute("type","text"):o&&o.setAttribute("type","password")})})}f&&f.forEach(e=>{const s=e.dataset.mandatory,r=e.closest(".JVform__ctn-input");s=="false"||s==!1?r.classList.add("validateVF"):e.addEventListener("change",()=>{const o=e.firstElementChild.value,l=e.value;o.toLowerCase()==l.toLowerCase()?(r.classList.remove("validateVF"),r.classList.add("errorValidateVF")):(r.classList.add("validateVF"),r.classList.remove("errorValidateVF"))})});const L=e=>{const s=e.closest(".JVform__ctn-input");s.classList.contains("validateVF")?s.classList.remove("errorValidateVF"):s.classList.add("errorValidateVF")};t&&t.forEach(e=>{e.addEventListener("keyup",y),e.addEventListener("blur",y),e.addEventListener("blur",()=>{L(e)}),e.addEventListener("change",()=>{L(e)})}),n&&n.forEach(e=>{e.addEventListener("keyup",A),e.addEventListener("blur",A),e.addEventListener("blur",()=>{L(e)})}),u.addEventListener("submit",e=>{const s=document.querySelectorAll(`${c} .validateVF`),r=document.querySelectorAll(`${c} .JVform__ctn-input`),o=document.querySelector(`${c} .JVform__error-send`),l=d=>{d.forEach(i=>{const m=i.closest(".JVform__ctn-input");m.classList.contains("validateVF")?m&&m.classList.remove("errorValidateVF"):m&&m.classList.add("errorValidateVF")})};console.log(r.length,s.length),r.length==s.length?(a.preventSubmit==!0&&e.preventDefault(),a.sendFunction&&a.sendFunction(),a.messageError&&o.classList.remove("active")):(l(t),l(n),l(f),a.messageError&&o.classList.add("active"),a.messageError&&o.classList.contains("active")&&(o.style.animation="error-message .5s 1 ease",setTimeout(()=>{o.style.animation="nothing"},500)),e.preventDefault())})})()}const J=()=>{const c=document.querySelector("#primerFormulario");let a=new FormData(c);alert(a)};window.addEventListener("load",()=>{new M("#primerFormulario",{preventSubmit:!0,sendFunction:J,messageError:!0,password:{clsBtnGenerator:"#generatePass",clsInputGenerator:"#contrase\xF1a",clsShowHiddePass:".showHiddenPass"}})});