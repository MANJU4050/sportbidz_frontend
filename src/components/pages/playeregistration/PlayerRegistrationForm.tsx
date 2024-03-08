import { GridItem, Grid, FormControl, FormLabel, Input, FormErrorMessage, Button, Select, Heading, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useFormik } from "formik"

import { registerPlayer } from "../../../api/players"
import { playerValidationSchema } from "../../../validators/playerValidation"
import { useParams } from "react-router-dom"
import { registerPlayerDetails } from "../../../interfaces/api/players"


const PlayerRegistrationForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { tournamentId } = useParams()
    const toast = useToast()

    const initialValues = {

        tournamentId: tournamentId,
        playerName: '',
        mobile: '',
        playerType: '',
        address: ''
    }


    const handleSubmit = async (values: registerPlayerDetails, { resetForm }) => {
        try {

            setIsLoading(true)
            const response = await registerPlayer(values)
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
        validationSchema: playerValidationSchema,
        onSubmit: handleSubmit
    })



    return (

        <form onSubmit={formik.handleSubmit}>

            <Grid bg='orange' alignContent='center' gap='30px' minH='95vh' paddingLeft='100px' paddingRight='100px'>
                <GridItem textAlign='center'>
                    <Heading color='white'>Player Registration Form</Heading>
                </GridItem>
                <GridItem>
                    <FormControl isRequired isInvalid={formik.errors.playerName && formik.touched.playerName ? true : undefined}>
                        <FormLabel>Name</FormLabel>
                        <Input type='text' name="playerName" placeholder="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.playerName} />
                        <FormErrorMessage>{formik.errors.playerName}</FormErrorMessage>
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
                    <FormControl isRequired isInvalid={formik.errors.playerType && formik.touched.playerType ? true : undefined}>
                        <FormLabel>Player Type</FormLabel>
                        <Select name='playerType'
                            placeholder="player type"
                            value={formik.values.playerType}

                            onChange={(e) => {
                                formik.setFieldValue('playerType', e.target.value)
                            }}
                            onBlur={() => {
                                formik.setFieldTouched('playerType', true)
                            }}>
                            <option value='batsman'>batsman</option>
                            <option value='bowler'>bowler</option>
                            <option value='allrounder'>all rounder</option>
                        </Select>
                        <FormErrorMessage>{formik.errors.playerType}</FormErrorMessage>
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

export default PlayerRegistrationForm