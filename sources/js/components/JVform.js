const JVform = (()=>{

    //CREAMOS VALIDACIONES CON EXPRESIONES REGULARES
    const RegularExpresions = ()=>{
        return {
            user: /^[a-zA-ZÀ-ÿ\s\.-_@]{3,40}/,
            text: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
            name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
            phone: /^(\+)?[\d\s\-\.]{5,30}$/,
            email: /^[\w\d\.\-]+@+[\w\d]+\.+[\w\d\.]+$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
            message: /.{20,200}/
        }
    }
    //CREAMOS OBJETO CON LOS TIPOS DE DATA ATRIBUTOS DE LOS INPUTS
    const ObjWithTypeValidations = ()=>{
        return {
            'text': 'text',
            'number': 'number',
            'user': 'user',
            'name': 'name',
            'phone': 'phone',
            'email': 'email',
            'password': 'password',
            'message': 'message'
        }
    }
    //CREAMOS PLANTILLA DEL MENSAJE DE ERROR
    const createTemplateError = (cls)=>{
        cls.forEach((data)=>{
            const createDivForTemplate = document.createElement('div');
            createDivForTemplate.classList.add('JVform__error-message');
            const getAtrError = data.dataset.error;
            const getName = data.name;
            let templateMessage;
            getAtrError ? templateMessage = `<p>${getAtrError}</p>` : templateMessage = `<p>Ingrese ${getName}</p>`;
            createDivForTemplate.innerHTML = templateMessage;
            data.parentNode.append(createDivForTemplate);
        });
    }

    const ConfigJVform = ()=>{
        
        //VARIABLES GENERALES
        const getEventSubmit = document.querySelector('form');
        const getAllInputs = document.querySelectorAll('form input');

        //CREACIÓN MENSAJE DE ERROR LLAMANDO A LA FUNCIÓN CREADA PARA ELLO
        createTemplateError(getAllInputs);

        //CREAMOS UNA VALIDACION QUE SE USARA EN LOS DIFERENTES EVENTOS DEL FORM
        const reUseValidation = ()=>{
            //DESESTRUCTURAMOS EL OBJETO CON LAS EXPRESIONES REGULARES
            const {user, text, name, phone, email, password, message} = RegularExpresions();
            getAllInputs.forEach((data)=>{
                //OBTENEMOS LOS ATRIBUTOS DEL INPUT 
                const getAtrTypeValidation = data.dataset.validation;
                const getObjWithTypeValidations = ObjWithTypeValidations();
                const returnTypeValidation = getObjWithTypeValidations[getAtrTypeValidation];
                //VALIDAMOS EL TIPO DE ATRIUBTO Y AÑADIMOS VALIDACIÓN CON EXPRESIONES REGULARES
                const getParent = data.parentNode;
                if(returnTypeValidation == 'text'){
                    if(text.test(data.value)){
                        getParent.classList.add('validateVF');
                    }else{
                        getParent.classList.remove('validateVF');
                    }
                }    
            });
        }


        getAllInputs && getAllInputs.forEach((data)=>{
            data.addEventListener('keyup', reUseValidation);
            data.addEventListener('blur', reUseValidation);
        });


        //VALIDACION DE CONDICIONES EN SUBMIT
        getEventSubmit.addEventListener('submit', (e)=>{
            e.preventDefault();

            const getAllClsValidate = document.querySelectorAll('.validateVF');
            console.log(getAllClsValidate.length, getAllInputs.length);
            if(getAllInputs.length == getAllClsValidate.length){
                console.log('enviado');
            }else{
                getAllInputs.forEach((data)=>{
                    const getParentVal = data.parentNode;
                    if(getParentVal.classList.contains('validateVF')){
                        getParentVal.querySelector('.JVform__error-message').classList.remove('active');
                    }else{
                        getParentVal.querySelector('.JVform__error-message').classList.add('active');
                    }
                });
            }

        });

    }



    return {
        getChildJVform: function(){
            try {
                ConfigJVform();
            } catch (error) { }
        }
    }


})();


const getAllChildsJVform = ()=>{
    JVform.getChildJVform();
}


export { getAllChildsJVform }
