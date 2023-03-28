//IMPORTAMOS LAS EXPRESIONES Y LOS TIPOS DE VALIDACIONES
import { ObjRegularExpresions, ObjWithTypeValidations } from './JVobjects';
//IMPORTAMOS PLANTILLA PARA MENSAJES DE ERROR
import { createTemplateError } from './JVtemplateError';

function JVform(clsForm, principalMethod){

    //DEFINIMOS EL METODO PRINCIPAL DE LA FUNCIÓN
    this.principalMethod = principalMethod;
    //OBJETO DE EXPRESIONES REGULARES
    ObjRegularExpresions();
    //OBJETO DE TIPOS DE VALIDACIONES
    ObjWithTypeValidations();

    //CONFIGURACION GENERAL DEL FORMULARIO
    const ConfigJVform = ()=>{
        
        //VARIABLES GENERALES
        const getEventSubmit = document.querySelector(`${clsForm}`);
        const getAllInputs = document.querySelectorAll(`${clsForm} input`);
        const getAllTextareas = document.querySelectorAll(`${clsForm} textarea`);
        const getAllSelects = document.querySelectorAll(`${clsForm} select`);

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
                const getAtrTypeValidation = data.dataset.validation;
                const getAtrExpresion = data.dataset.expresion;
                const getAtrMandatory = data.dataset.mandatory;
                const getObjWithTypeValidations = ObjWithTypeValidations();
                const returnTypeValidation = getObjWithTypeValidations[getAtrTypeValidation];
                const getParent = data.closest('.JVform__ctn-input');
                const atrExpresionTransform = new RegExp(getAtrExpresion);
                //CREAMOS FUNCION PARA VALIDAR EL TIPO DE ATRIBUTO Y AÑADIMOS VALIDACIÓN CON EXPRESIONES REGULARES
                const reUseClsValidation = (typeValidation, exp)=>{
                    if(getAtrExpresion && getAtrMandatory != "false"){
                        if(atrExpresionTransform.test(data.value)){
                            getParent.classList.add('validateVF');
                            getParent.classList.remove('errorValidateVF');
                        }else{
                            getParent.classList.remove('validateVF');
                        }
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
                const getAtrExpresionsMsg = data.dataset.expresion;
                const getAtrMandatoryMsg = data.dataset.mandatory;
                const getParentTextarea = data.closest('.JVform__ctn-input');
                const atrExpresionTransformMsg = new RegExp(getAtrExpresionsMsg);
                if(getAtrExpresionsMsg && getAtrMandatoryMsg != "false"){
                    if(atrExpresionTransformMsg.test(data.value)){
                        getParentTextarea.classList.add('validateVF');
                        getParentTextarea.classList.remove('errorValidateVF');
                    }else{
                        getParentTextarea.classList.remove('validateVF');
                    }
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

        //---------------- VALIDACIÓN PARA SELECTS ---------------//
        getAllSelects && getAllSelects.forEach((data)=>{
            const getDataMandatorySelect = data.dataset.mandatory;
            const getParentSelect = data.closest('.JVform__ctn-input');
            //COMPROBAMOS SI ES OBLIGATORIO
            if(getDataMandatorySelect == 'false' || getDataMandatorySelect == false){
                getParentSelect.classList.add('validateVF');
            }else{
                data.addEventListener('change', ()=>{
                    const getFirtsChild = data.firstElementChild.value;
                    const getValueSelect = data.value;
                    //VALIDAMOS QUE NO VUELVA A SELECCIONAR LA OPCIÓN POR DEFECTO
                    if(getFirtsChild.toLowerCase() == getValueSelect.toLowerCase()){
                        getParentSelect.classList.remove('validateVF');
                        getParentSelect.classList.add('errorValidateVF');
                    }else{
                        getParentSelect.classList.add('validateVF');
                        getParentSelect.classList.remove('errorValidateVF');
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
            const getAllClsValidate = document.querySelectorAll(`${clsForm} .validateVF`);
            const getAllClsInputCtn = document.querySelectorAll(`${clsForm} .JVform__ctn-input`);
            const getMessageError = document.querySelector(`${clsForm} .JVform__error-send`);
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
                principalMethod.preventSubmit == true && e.preventDefault();
                //EVENTO SUBMIT PARA ENVÍO DEL FORM AL BACKEND
                principalMethod.sendFunction && principalMethod.sendFunction();

                getMessageError && getMessageError.classList.remove('active');
            }else{
                //MENSAJE DE ERROR PARA INPUTS
                reUseAssignementCls(getAllInputs);
                //MENSAJE DE ERROR PARA TEXTAREAS
                reUseAssignementCls(getAllTextareas);
                //MENSAJE DE ERROR PARA SELECTS
                reUseAssignementCls(getAllSelects);
                //MENSAJE DE ERROR GENERAL
                getMessageError && getMessageError.classList.add('active');
                if(getMessageError.classList.contains('active')){
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

    return ConfigJVform();
}

export { JVform }