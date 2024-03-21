import { GridItem, Grid, FormControl, FormLabel, Input, FormErrorMessage, Button, Heading, useToast, Box } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { useFormik } from "formik"

import { useNavigate, useParams } from "react-router-dom"
import { registerManagerDetails } from "../../../../interfaces/api/managers"
import { registerManager } from "../../../../api/managers"
import { managerValidationSchema } from "../../../../validators/managerValidation"
import { AuthContext } from "../../../../context/authcontext"


const ManagerRegistrationForm = () => {

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const { tournamentId } = useParams()
    const toast = useToast()

    const initialValues = {

        tournamentId: tournamentId,
        managerName: user?.user?.name,
        mobile: user?.user?.mobile,
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
            navigate(-1)


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
                        <Input isReadOnly type='text' name="managerName" placeholder="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.managerName} />
                        <FormErrorMessage>{formik.errors.managerName}</FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl isRequired isInvalid={formik.errors.mobile && formik.touched.mobile ? true : undefined}>
                        <FormLabel>Mobile</FormLabel>
                        <Input isReadOnly type='text' name="mobile" placeholder="mobile number" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobile} />
                        <FormErrorMessage>{formik.errors.mobile}</FormErrorMessage>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl isRequired isInvalid={formik.errors.teamName && formik.touched.teamName ? true : undefined}>
                        <FormLabel>Team Name</FormLabel>
                        <Input type='text' name="teamName" placeholder="team name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.teamName} />
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
                <Box display='flex' gap='10px'>
                    <Button bg='green' color='white' w='75%' type='submit' >Register</Button>
                    <Button bg='black' color='white' w='25%' onClick={() => navigate(-1)}>Cancel</Button>


                </Box>
            </Grid>

        </form>

    )
}

export default ManagerRegistrationForm