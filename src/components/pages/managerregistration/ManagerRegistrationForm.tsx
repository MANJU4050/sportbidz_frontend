import { GridItem, Grid, FormControl, FormLabel, Input, FormErrorMessage, Button, Select, Heading, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useFormik } from "formik"

import { playerValidationSchema } from "../../../validators/playerValidation"
import { useParams } from "react-router-dom"
import { registerManagerDetails } from "../../../interfaces/api/managers"
import { registerManager } from "../../../api/managers"
import { managerValidationSchema } from "../../../validators/managerValidation"


const ManagerRegistrationForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { tournamentId } = useParams()
    const toast = useToast()

    const initialValues = {

        tournamentId: tournamentId,
        managerName: '',
        mobile: '',
        address: '',
        teamName: ''
    }


    const handleSubmit = async (values: registerManagerDetails, { resetForm }) => {
        try {

            setIsLoading(true)
            const response = await registerManager(values)
            resetForm()
            toast({
                status: 'success',
                title: response?.message,
                isClosable: true,
                position: "top-right"
            })

        } catch (error) {
            setIsLoading(false)
            toast({
                status: 'error',
                title: error?.response.data?.error,
                isClosable: true,
                position: "top-right"
            })
            console.error(error)

        } finally {
            setIsLoading(false)

        }
    }


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: managerValidationSchema,
        onSubmit: handleSubmit
    })



    return (

        <form onSubmit={formik.handleSubmit}>

            <Grid bg='orange' alignContent='center' gap='30px' minH='95vh' paddingLeft='100px' paddingRight='100px'>
                <GridItem textAlign='center'>
                    <Heading color='white'>Manager Registration Form</Heading>
                </GridItem>
                <GridItem>
                    <FormControl isRequired isInvalid={formik.errors.managerName && formik.touched.managerName ? true : undefined}>
                        <FormLabel>Name</FormLabel>
                        <Input type='text' name="managerName" placeholder="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.managerName} />
                        <FormErrorMessage>{formik.errors.managerName}</FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl isRequired isInvalid={formik.errors.mobile && formik.touched.mobile ? true : undefined}>
                        <FormLabel>Mobile</FormLabel>
                        <Input type='text' name="mobile" placeholder="mobile number" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobile} />
                        <FormErrorMessage>{formik.errors.mobile}</FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl isRequired isInvalid={formik.errors.teamName && formik.touched.teamName ? true : undefined}>
                        <FormLabel>team name</FormLabel>
                        <Input type='text' name="teamName" placeholder="place" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.teamName} />
                        <FormErrorMessage>{formik.errors.teamName}</FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl isRequired isInvalid={formik.errors.address && formik.touched.address ? true : undefined}>
                        <FormLabel>Place</FormLabel>
                        <Input type='text' name="address" placeholder="place" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} />
                        <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <Button type='submit' w='100%'>Register</Button>
                </GridItem>
            </Grid>
        </form>

    )
}

export default ManagerRegistrationForm