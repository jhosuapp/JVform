//CREAMOS VALIDACIONES CON EXPRESIONES REGULARES
const ObjRegularExpresions = ()=>{
    return {
        user: /^[a-zA-ZÀ-ÿ\s\.-_@]{3,40}/,
        text: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        phone: /^(\+)?[\d\s\-\.]{5,30}$/,
        email: /^[\w\d\.\-]+@+[\w\d]+\.+[\w\d\.]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
        message: /.{10,200}/,
        url: /[a-zA-Z0-9_.+-]{0,3}\.[a-zA-Z0-9-]{0,100}\.[a-zA-Z0-9-.]+$/,
    }
}
//CREAMOS OBJETO CON LOS TIPOS DE DATA ATRIBUTOS DE LOS INPUTS
const ObjWithTypeValidations = ()=>{
    return {
        'text': 'text',
        'number': 'number',
        'user': 'user',
        'phone': 'phone',
        'email': 'email',
        'password': 'password',
        'message': 'message',
        'url': 'url',
    }
}


export {ObjRegularExpresions, ObjWithTypeValidations}