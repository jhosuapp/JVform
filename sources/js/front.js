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
        password: {
            clsBtnGenerator: '#generatePass', //CLASE QUE CUANDO SE OPRIME GENERA UNA CONTRASEÑA
            clsInputGenerator: '#contraseña', //CLASE DE INPUT A LA CUAL SE LE ASIGNE LA CONTRASEÑA GENERADA
            clsShowHiddePass: '.showHiddenPass', //CLASE DE BOTON QUE MUESTRA Y OCULTA LA CONTRASEÑA
        }
    });
});