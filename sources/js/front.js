import { JVform } from './components/JVform';
import "../sass/main.scss";

const funcAlert = ()=>{
    const getForm = document.querySelector('#primerFormulario');

    let getDataOfForm = new FormData(getForm);
    alert(getDataOfForm);
}

window.addEventListener('load', ()=>{
    const miFirtsForm = new JVform('#primerFormulario',{
        preventSubmit: true, //DEJAMOS EL PREVENT DEFAULT ASÍ EL FORMULARIO SEA ENVIADO
        sendFunction: funcAlert, //FUNCIÓN QUE SE EJECUTA CUANDO SE HACE EL ENVÍO DEL FORMULARIO
        messageError: true, //FUNCIÓN QUE SE EJECUTA CUANDO SE HACE EL ENVÍO DEL FORMULARIO
    });
});