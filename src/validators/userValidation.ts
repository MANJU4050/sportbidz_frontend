import * as yup from 'yup'

export const userRegistrationSchema = yup.object({

    name: yup.string().required('name cannot be empty').min(3, 'name should contain minimum 3 characters').max(15, 'name cannot be more than 15 characters'),
    mobile: yup.string().required('mobile number cannot be empty').matches(/^[0-9]{10}$/, 'invalid mobile number'),
    password: yup.string().required('password cannot be empty').matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*#@&!]).{6,}$'), 'invalid password format')
    
})