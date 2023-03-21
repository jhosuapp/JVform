import { JVform } from './components/JVform';
import "../sass/main.scss";

const funcAlert = ()=>{
    const getForm = document.querySelector('#primerFormulario');

    let getDataOfForm = new FormData(getForm);
    alert(getDataOfForm);

}

window.addEventListener('load', ()=>{
    JVform(
        '#primerFormulario', //ID, ETIQUETA O CLASE DEL FORMULARIO
        true, //INDICACIÓN SI CUANDO TODOS LOS DATOS ESTÁN BIEN AÚN ASÍ SE MANTIENE EL PREVENTDEFAULT
        funcAlert //FUNCIÓN QUE SE EJECUTA CUANDO TODOS LOS DATOS ESTÁN BIEN
    );
});