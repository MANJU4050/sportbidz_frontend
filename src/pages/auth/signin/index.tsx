import { useState } from 'react';
import { useFormik } from 'formik'
import { Button, FormControl, FormLabel, FormErrorMessage, Input, useToast, Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import styles from '../../../assets/css/pages/auth/signin/index.module.css'
import { UserLogin } from '../../../interfaces/api/users';
import { loginUserApi } from '../../../api/auth/users';
import { userLoginSchema } from '../../../validators/userValidation'

const SignIn = () => {

    const toast = useToast()

    const [isSubmiting, setIsSubmiting] = useState(false)

    const initialValues = {
        mobile: '',
        password: ''
    }

    const handleSubmit = async (values: UserLogin, { resetForm }: { resetForm: () => void }) => {
        try {
            setIsSubmiting(true)
            await loginUserApi(values)
            resetForm()
            toast({
                title: 'login successfull',
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
        validationSchema: userLoginSchema,
        onSubmit: handleSubmit
    })

    return (
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.formcontainer}>
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
                    <Button bg='yellowgreen' type='submit' isLoading={isSubmiting} isDisabled={isSubmiting}>Signin</Button>
                    <p>Already registerd? <ChakraLink as={ReactRouterLink} to='/signup'>
                        signup
                    </ChakraLink></p>
                </div>
            </form>
        </div>
    )
}

export default SignIn