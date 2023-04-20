/*!
 * formbouncerjs v1.2.0
 * Librería para validar formularios de forma simple y sencilla
 * (c) 2023 Jehosua Penagos
 * MIT License
 * https://github.com/jhosuapp
 */

//=====================================================================================//

//IMPORTAMOS LAS EXPRESIONES Y LOS TIPOS DE VALIDACIONES
import { ObjRegularExpresions, ObjWithTypeValidations } from './components/JVobjects';
//IMPORTAMOS PLANTILLA PARA MENSAJES DE ERROR
import { createTemplateError } from './components/JVtemplateError';
//IMPORTAMOS GENERADOR DE CONTRASEÑAS
import { generatePassword } from './components/JVformgenpass';
//IMPORTAMOS EL CSS
import "../sass/main.scss";

//=====================================================================================//

(function (root, factory) {
	// if ( typeof define === 'function' && define.amd ) {
	// 	define([], (function () {
	// 		return factory(root);
	// 	}));
	// } else if ( typeof exports === 'object' ) {
	// 	module.exports = factory(root);
	// } else {
		root.JVform = factory(root);
	// }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (function (window) {

        //OBJETO DE EXPRESIONES REGULARES
        ObjRegularExpresions();
        //OBJETO DE TIPOS DE VALIDACIONES
        ObjWithTypeValidations();
        //CONSTRUCTOR GENERAL DEL FORMULARIO
        const Constructor = function(selector, options){
            
            //VARIABLES GENERALES
            const getEventSubmit = document.querySelector(`${selector}`),
                  getAllInputs = document.querySelectorAll(`${selector} input`),
                  getAllTextareas = document.querySelectorAll(`${selector} textarea`),
                  getAllSelects = document.querySelectorAll(`${selector} select`);
    
            //CREACIÓN MENSAJE DE ERROR Y LLAMANDO A LA FUNCIÓN CREADA PARA ELLO
            createTemplateError(getAllInputs);                
            createTemplateError(getAllTextareas);
            createTemplateError(getAllSelects);
    
            //-------------------- VALIDACIÓN GENERAL --------------------//
            //CREAMOS UNA VALIDACION QUE SE USARA EN LOS DIFERENTES EVENTOS DEL FORM
            const reUseValidation = ()=>{
                //DESESTRUCTURAMOS EL OBJETO CON LAS EXPRESIONES REGULARES
                const { user, text, phone, email, password, url } = ObjRegularExpresions();
                getAllInputs && getAllInputs.forEach((data)=>{
                    //OBTENEMOS LOS ATRIBUTOS DEL INPUT 
                    const getAtrTypeValidation = data.dataset.validation,
                          getAtrExpresion = data.dataset.expresion,
                          getAtrMandatory = data.dataset.mandatory,
                          getObjWithTypeValidations = ObjWithTypeValidations(),
                          returnTypeValidation = getObjWithTypeValidations[getAtrTypeValidation],
                          getParent = data.closest('.JVform__ctn-input'),
                          atrExpresionTransform = new RegExp(getAtrExpresion);
                    //CREAMOS FUNCION PARA VALIDAR EL TIPO DE ATRIBUTO Y AÑADIMOS VALIDACIÓN CON EXPRESIONES REGULARES
                    const reUseClsValidation = (typeValidation, exp)=>{
                        //VALIDAMOS SI SE ESTA VALIDANDO CON UNA EXPRESIÓN REGULAR PERSONALIZADA
                        if(getAtrExpresion && getAtrMandatory != "false"){
                            if(atrExpresionTransform.test(data.value)){
                                getParent.classList.add('validateVF');
                                getParent.classList.remove('errorValidateVF');
                            }else{
                                getParent.classList.remove('validateVF');
                            }
                        //VALIDAMOS SI SE ESTÁN VALIDANDO CON LAS EXPRESIONES PREDEFINIDAS 
                        }else if(returnTypeValidation == typeValidation && getAtrMandatory != "false"){
                            if(exp.test(data.value)){
                                getParent.classList.add('validateVF');
                                getParent.classList.remove('errorValidateVF');
                            }else{ 
                                getParent.classList.remove('validateVF');
                            }
                        }
                    } 
                    //VALIDACION PARA INPUT TEXT
                    reUseClsValidation('text', text);
                    //VALIDACION PARA NUMERO
                    reUseClsValidation('phone', phone);
                    //VALIDACION PARA CORREO
                    reUseClsValidation('email', email);
                    //VALIDACION PARA PASSWORD
                    reUseClsValidation('password', password);
                    //VALIDACION PARA url
                    reUseClsValidation('url', url);
                });
            }
            //----------------FIN VALIDACIÓN GENERAL --------------------//
    
            //------------ VALIDACIÓN PARA TEXTAREA --------------------//
            const reUseValidationTextArea = ()=>{
                //DESESTRUCTURAMOS MENSAJE
                const { message } = ObjRegularExpresions();
                getAllTextareas && getAllTextareas.forEach((data)=>{
                    //VARIABLES
                    const getAtrExpresionsMsg = data.dataset.expresion,
                          getAtrMandatoryMsg = data.dataset.mandatory,
                          getParentTextarea = data.closest('.JVform__ctn-input'),
                          atrExpresionTransformMsg = new RegExp(getAtrExpresionsMsg);
                    //VALIDAMOS SI ES UNA EXPRESION REGULAR PERSONALIZADA
                    if(getAtrExpresionsMsg && getAtrMandatoryMsg != "false"){
                        if(atrExpresionTransformMsg.test(data.value)){
                            getParentTextarea.classList.add('validateVF');
                            getParentTextarea.classList.remove('errorValidateVF');
                        }else{
                            getParentTextarea.classList.remove('validateVF');
                        }
                    //VALIDAMOS SI ES UNA EXPRESION REGULAR PREDEFINIDA
                    }else if(getAtrMandatoryMsg != "false"){
                        if(message.test(data.value)){
                            getParentTextarea.classList.add('validateVF');
                            getParentTextarea.classList.remove('errorValidateVF');
                        }else{
                            getParentTextarea.classList.remove('validateVF');
                        }
                    }
                });
            }
            //---------------- FIN VALIDACIÓN PARA TEXTAREA ------------//
                
            //---------------- VALIDACIÓN PARA CHECKBOX ---------------//
            getAllInputs && getAllInputs.forEach((data)=>{
                const getDataMandatory = data.dataset.mandatory;
                if(data.type == 'checkbox' || data.type == 'radio'){
                    data.addEventListener('change', ()=>{
                        const getParentRadio = data.closest('.JVform__ctn-input');
                        if(getDataMandatory != "false"){
                            data.checked ? getParentRadio.classList.add('validateVF') : getParentRadio.classList.remove('validateVF');
                        }
                    });
                }
            });
            //---------------- FIN VALIDACIÓN PARA CHECKBOX ----------//
    
            //---------------- VALIDACIÓN PARA ARCHIVOS -------------//
            getAllInputs && getAllInputs.forEach((data)=>{
                if(data.type == 'file'){
                    data.addEventListener('change', ()=>{
                        //INICIZALIZAMOS LAS VARIABLES
                        let getSizeFile, getNameFile, getAtrLimitSize, getAtrAllowdedDocs, getParentFile, nameFileToArr, getExtensionOfArr;
                        //VALIDAMOS QUE EL ARCHIVO SI EXISTA PARA EVITAR ERRORES DE CONSOLA
                        if(data.files[0]){
                            getSizeFile = data.files[0].size;
                            getNameFile = data.files[0].name;
                            getAtrLimitSize = parseInt(data.dataset.filesize);
                            getAtrAllowdedDocs = data.dataset.fileallowed;
                            getParentFile = data.closest('.JVform__ctn-input');
                            nameFileToArr = getNameFile.split('.');
                            getExtensionOfArr = nameFileToArr[nameFileToArr.length - 1].toLowerCase();
                        }
                        //VALIDACIÓN PARA CUANDO HAY UN LIMITE DE EXTENSIONES
                        if(getAtrAllowdedDocs){
                            const allowerdDocsToArr = getAtrAllowdedDocs.split(',');
                            if(allowerdDocsToArr.includes(getExtensionOfArr)){
                                getParentFile.classList.add('validateVF');
                            }else{
                                getParentFile.classList.remove('validateVF');
                            }
                        }
                        //VALIDACION PARA CUANDO HAY UN LIMITE DE PESO
                        if(getAtrLimitSize){
                            if(getSizeFile < getAtrLimitSize){
                                getParentFile.classList.add('validateVF');
                            }else{
                                getParentFile.classList.remove('validateVF');
                            }
                        }
                        //VALIDACION PARA CUANDO HAY LIMITE DE PESO Y EXTENSIONES
                        if(getAtrAllowdedDocs && getAtrLimitSize){
                            const allowerdDocsToArrTwo = getAtrAllowdedDocs.split(',');
                            if(allowerdDocsToArrTwo.includes(getExtensionOfArr) && getSizeFile < getAtrLimitSize){
                                getParentFile.classList.add('validateVF');
                            }else{
                                getParentFile.classList.remove('validateVF');
                            }
                        }
                    });
                }
            });
            //---------------- FIN VALIDACIÓN PARA ARCHIVOS ---------//
    
            //---------------- VALIDACIÓN PARA PASSWORD -----------//
            getAllInputs && getAllInputs.forEach((data)=>{
                const getAtrConfirmPass = data.dataset.confirmpass;
                if(data.type == "password" && getAtrConfirmPass){
                    const reUseValidationPass = ()=>{
                        const getValueConfirmPass = data.value,
                              getAtrMatch = data.dataset.match,
                              getInputPass = document.querySelector(`${getAtrMatch}`).value,
                              getParentPass = data.closest('.JVform__ctn-input');
                        const reUseValidate = (clsRem, clsAdd)=>{
                            getParentPass.classList.remove(clsRem);
                            getParentPass.classList.add(clsAdd);
                        }
                        if(getInputPass == getValueConfirmPass){
                            reUseValidate('errorValidateVF', 'validateVF');
                        }else{
                            reUseValidate('validateVF', 'errorValidateVF');
                        }
                    }
                    data.addEventListener('keyup', reUseValidationPass);
                    data.addEventListener('focus', reUseValidationPass);
                    data.addEventListener('blur', reUseValidationPass);
                }
            });
            //------------- FIN VALIDACIÓN PARA PASSWORD ----------//
    
            //---------------- VALIDACIÓN PARA FECHAS ---------------//
            getAllInputs && getAllInputs.forEach((data)=>{
                if(data.type == "date"){
                    const getParentDate = data.closest('.JVform__ctn-input');
                    //FUNCIÓN PARA AÑADIR Y QUITAR CLASES
                    const reUseValidate = (clsRem, clsAdd)=>{
                        getParentDate.classList.remove(clsRem);
                        getParentDate.classList.add(clsAdd);
                    }
                    //OBTENEMOS LA FECHA ACTUAL
                    const createActualDate = new Date(),
                          getFullYear = createActualDate.getFullYear(),
                          getMonth = createActualDate.getMonth() + 1,
                          allowedYear = 1900;
                    //EVENTO DEL INPUT
                    data.addEventListener('change', ()=>{
                        //OBTENEMOS VALUE Y ATRIBUTOS
                        const getValue = data.value,
                              getAtrAdult = data.dataset.adult,
                              createArrayWithValue = getValue.split('-');
                        //VALIDAMOS SI TIENE EL ATRIBUTO PARA MAYORES DE EDAD
                        if(getAtrAdult == 'true'){
                            if(createArrayWithValue[0] < getFullYear - 18 && createArrayWithValue[0] > allowedYear){
                                reUseValidate('errorValidateVF', 'validateVF');
                            }else if(createArrayWithValue[0] == getFullYear - 18){
                                createArrayWithValue[1] < getMonth ? reUseValidate('errorValidateVF', 'validateVF') : reUseValidate('validateVF', 'errorValidateVF');;
                            }
                            else{
                                reUseValidate('validateVF', 'errorValidateVF');
                            }
                        }else{
                            if(getValue.length == 10 && createArrayWithValue[0] > allowedYear){
                                reUseValidate('errorValidateVF', 'validateVF');
                            }else{
                                reUseValidate('validateVF', 'errorValidateVF');
                            }
                        }
                    });
                }
            });
            //--------------- FIN VALIDACIÓN PARA FECHAS -------------//
    
            //---------------- GENERADOR DE CONTRASEÑAS --------------//
            const {clsBtnGenerator, clsInputGenerator} = options.password;
            if(clsBtnGenerator && clsInputGenerator){
                const getBtnGenPass = document.querySelector(`${clsBtnGenerator}`),        
                      getInputGenPass = document.querySelector(`${clsInputGenerator}`);
                getBtnGenPass && getBtnGenPass.addEventListener('click', ()=>{
                    const getGenPass = generatePassword();
                    getInputGenPass && (getInputGenPass.value = getGenPass);
                    getInputGenPass.focus();
                    getInputGenPass.blur();
                });
            }
            //--------------- FIN GENERADOR DE CONTRASEÑAS ------------//
    
            //-------------- MOSTRAR OCULTAR CONTRASEÑA --------------//
            const { clsShowHiddePass } = options.password;
            if(clsShowHiddePass){
                const getBtnShowHiddenPass = document.querySelectorAll(`${clsShowHiddePass}`);
                getBtnShowHiddenPass && getBtnShowHiddenPass.forEach((data)=>{
                    data.addEventListener('click', ()=>{
                        const getParentPass = data.closest('.JVform__ctn-input');
                        const getChildInput = getParentPass.querySelector('input');
                        data.classList.toggle('active');
                        if(getChildInput.type == 'password'){
                            getChildInput && getChildInput.setAttribute('type', 'text');
                        }else{
                            getChildInput && getChildInput.setAttribute('type', 'password');
                        }
                    });
                });
            }
            //------------ FIN MOSTRAR OCULTAR CONTRASEÑA -----------//
    
            //---------------- VALIDACIÓN PARA SELECTS ---------------//
            getAllSelects && getAllSelects.forEach((data)=>{
                const getDataMandatorySelect = data.dataset.mandatory,
                      getParentSelect = data.closest('.JVform__ctn-input');
                //FUNCIÓN PARA AÑADIR Y QUITAR CLASES
                const reUseValidate = (clsRem, clsAdd)=>{
                    getParentSelect.classList.remove(clsRem);
                    getParentSelect.classList.add(clsAdd);
                }
                //COMPROBAMOS SI ES OBLIGATORIO
                if(getDataMandatorySelect == 'false' || getDataMandatorySelect == false){
                    getParentSelect.classList.add('validateVF');
                }else{
                    data.addEventListener('change', ()=>{
                        const getFirtsChild = data.firstElementChild.value;
                        const getValueSelect = data.value;
                        //VALIDAMOS QUE NO VUELVA A SELECCIONAR LA OPCIÓN POR DEFECTO
                        if(getFirtsChild.toLowerCase() == getValueSelect.toLowerCase()){
                            reUseValidate('validateVF', 'errorValidateVF');
                        }else{
                            reUseValidate('errorValidateVF', 'validateVF');
                        }
                    });
                }
    
            });
            //---------------- FIN VALIDACIÓN PARA SELECTS -----------//
    
            //------- MENSAJES DE ERROR PARA INPUTS FOCUSEADOS ---------//
            const reUseValidationMsg = (clsMsg)=>{
                const getParentDataMsg = clsMsg.closest('.JVform__ctn-input');
                getParentDataMsg.classList.contains('validateVF') ? getParentDataMsg.classList.remove('errorValidateVF') : getParentDataMsg.classList.add('errorValidateVF');
            }
            //----- FIN MENSAJES DE ERROR PARA INPUTS FOCUSEADOS -------//
    
            //---------------- EJECUCIÓN DE EVENTOS -----------------//
            //EJECUCION DE LA VALIDACIÓN GENERAL
            getAllInputs && getAllInputs.forEach((data)=>{
                data.addEventListener('keyup', reUseValidation);
                data.addEventListener('blur', reUseValidation);
                data.addEventListener('blur', ()=>{
                    reUseValidationMsg(data);
                });
                data.addEventListener('change', ()=>{
                    reUseValidationMsg(data);
                });
            });
            //EJECUCIÓN VALIDACIÓN TEXTAREA
            getAllTextareas && getAllTextareas.forEach((data)=>{
                data.addEventListener('keyup', reUseValidationTextArea);
                data.addEventListener('blur', reUseValidationTextArea);
                data.addEventListener('blur', ()=>{
                    reUseValidationMsg(data);
                });
            });
            //---------------- FIN EJECUCIÓN DE EVENTOS -----------------//
    
            //---------------- ENVÍO DEL FORMULARIO --------------------//
            //VALIDACION DE CONDICIONES EN SUBMIT Y ENVIO DEL FORM
            getEventSubmit.addEventListener('submit', (e)=>{
                const getAllClsValidate = document.querySelectorAll(`${selector} .validateVF`),
                      getAllClsInputCtn = document.querySelectorAll(`${selector} .JVform__ctn-input`),
                      getMessageError = document.querySelector(`${selector} .JVform__error-send`);
                //FUNCIÓN PARA AÑADIR Y QUITAR CLASE QUE VALIDA
                const reUseAssignementCls = (clsValidation)=>{
                    clsValidation.forEach((data)=>{
                        const getParentVal = data.closest('.JVform__ctn-input');
                        if(getParentVal.classList.contains('validateVF')){
                            getParentVal && getParentVal.classList.remove('errorValidateVF');
                        }else{
                            getParentVal && getParentVal.classList.add('errorValidateVF');
                        }
                    });
                }
                console.log(getAllClsInputCtn.length, getAllClsValidate.length);
                if(getAllClsInputCtn.length == getAllClsValidate.length){
                    //VALIDAMOS SI INSETAMOS PREVENT DEFAULT DEPENDIENDO EL PARAMETRO RECIBIDO
                    options.preventSubmit == true && e.preventDefault();
                    //EVENTO SUBMIT PARA ENVÍO DEL FORM AL BACKEND
                    options.sendFunction && options.sendFunction();
    
                    options.messageError && getMessageError.classList.remove('active');
                }else{
                    //MENSAJE DE ERROR PARA INPUTS
                    reUseAssignementCls(getAllInputs);
                    //MENSAJE DE ERROR PARA TEXTAREAS
                    reUseAssignementCls(getAllTextareas);
                    //MENSAJE DE ERROR PARA SELECTS
                    reUseAssignementCls(getAllSelects);
                    //MENSAJE DE ERROR GENERAL
                    options.messageError && getMessageError.classList.add('active');
                    if(options.messageError && getMessageError.classList.contains('active')){
                        getMessageError.style.animation = "error-message .5s 1 ease";
                        setTimeout(()=>{
                            getMessageError.style.animation = "nothing";
                        },500);
                    }
                    //SE PREVIENE EL EVENTO DEL SUBMIT
                    e.preventDefault();
                }
    
            });
            //---------------- FIN DEL ENVIO DEL FORMULARIO --------------------//
        }
    
    return Constructor;

}));

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