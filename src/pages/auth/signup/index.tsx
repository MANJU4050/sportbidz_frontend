import { useState } from 'react';
import { useFormik } from 'formik'
import { Button, FormControl, FormLabel, FormErrorMessage, Input, useToast, Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';


import styles from '../../../assets/css/pages/auth/signup/index.module.css'
import { UserRegistration } from '../../../interfaces/api/users';
import { registerUserApi } from '../../../api/auth/users';
import { userRegistrationSchema } from '../../../validators/userValidation'

const SignUp = () => {

    const toast = useToast()

    const [isSubmiting, setIsSubmiting] = useState(false)

    const initialValues = {
        name: '',
        mobile: '',
        password: ''
    }

    const handleSubmit = async (values: UserRegistration, { resetForm }: { resetForm: () => void }) => {
        try {
            setIsSubmiting(true)
            await registerUserApi(values)
            resetForm()
            toast({
                title: 'registration successfull',
                status: 'success',
                position: 'top-right',
                isClosable: true
            })
            setIsSubmiting(false)
        } catch (error) {
            setIsSubmiting(false)
            toast({
                title: error?.response?.data?.error,
                status: 'error',
                position: 'top-right',
                isClosable: true,
            })
            console.error(error)
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: userRegistrationSchema,
        onSubmit: handleSubmit
    })

    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.formcontainer}>
                    <FormControl isRequired isInvalid={formik.errors.name && formik.touched.name ? true : undefined}>
                        <FormLabel>Name</FormLabel>
                        <Input name='name' type="text" placeholder='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={formik.errors.mobile && formik.touched.mobile ? true : undefined}>
                        <FormLabel>Mobile</FormLabel>
                        <Input name='mobile' type="text" placeholder='mobile' value={formik.values.mobile} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <FormErrorMessage>{formik.errors.mobile}</FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={formik.errors.password && formik.touched.password ? true : undefined}>
                        <FormLabel>Password</FormLabel>
                        <Input name='password' type="password" placeholder='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>
                    <Button bg='yellowgreen' type='submit' isLoading={isSubmiting} isDisabled={isSubmiting}>Signup</Button>
                    <p>Already registerd? <ChakraLink as={ReactRouterLink} to='/signin'>
                        signin
                    </ChakraLink></p>
                </div>

            </form>
        </div>
    )
}

export default SignUp