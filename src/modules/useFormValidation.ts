import { reactive } from "@vue/reactivity";
// import useValidators from '@/modules/validators'
import useValidators from '../modules/validators'

const errors = reactive({});


export default function useFormValidation() {


    const { isEmpty, minLength, isEmail, isNum } = useValidators();

    const validateNameField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 1)
    }

    const validateEmailField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue)
    }

    const validatePriceField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isNum(fieldName, fieldValue)
    }

    const validatePasswordField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 8)
    }


    return {    errors, validateNameField, validateEmailField, validatePriceField, validatePasswordField }
}