import { useFormik } from "formik"
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react"
import { auctionValidationSchema } from "../../../../../validators/auctionValidation"
import { registerAuction } from "../../../../../api/auctions"
import { useState } from "react"

const AuctionForm = ({ tournamentId,onClose }: { tournamentId: string, onClose:()=>void }) => {
const toast = useToast()

const [isLoading,setIsLoading] = useState(false)
    const initialValues = {
        tournamentId: tournamentId,
        auctionDate: "",
        numberOfTeams: 0,
        playersPerTeam: 0,
        basePlayerPoints: 0,
        maxPlayerPoints: 0,
        totalTeamPoints: 0,
        currentHikePoints: 0,
    }

    const registerAuctionHandler = async (values) => {
        try {
           const response = await registerAuction(values)
           console.log(response)
           toast({
            title: 'auction created succesfully',
            status: 'success',
            position: 'top-right',
            isClosable: true
          })
          onClose()
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }finally{
            setIsLoading(false)
        }
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: auctionValidationSchema,
        onSubmit: registerAuctionHandler
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <Box display='grid' gap='10px' padding='10px'>

                <FormControl isRequired isInvalid={formik.errors.auctionDate && formik.touched.auctionDate ? true : undefined}>
                    <FormLabel>Auction Date</FormLabel>
                    <Input type='date' name="auctionDate" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.auctionDate} />
                    <FormErrorMessage>{formik.errors.auctionDate}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={formik.errors.numberOfTeams && formik.touched.numberOfTeams ? true : undefined}>
                    <FormLabel>Number of Teams</FormLabel>
                    <Input type='number' name="numberOfTeams" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.numberOfTeams} />
                    <FormErrorMessage>{formik.errors.numberOfTeams}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={formik.errors.playersPerTeam && formik.touched.playersPerTeam ? true : undefined}>
                    <FormLabel>Players Per Team</FormLabel>
                    <Input type='number' name="playersPerTeam" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.playersPerTeam} />
                    <FormErrorMessage>{formik.errors.playersPerTeam}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={formik.errors.basePlayerPoints && formik.touched.basePlayerPoints ? true : undefined}>
                    <FormLabel>Base Player Points</FormLabel>
                    <Input type='number' name="basePlayerPoints" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.basePlayerPoints} />
                    <FormErrorMessage>{formik.errors.basePlayerPoints}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={formik.errors.maxPlayerPoints && formik.touched.maxPlayerPoints ? true : undefined}>
                    <FormLabel>Maximum Player Points</FormLabel>
                    <Input type='number' name="maxPlayerPoints" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.maxPlayerPoints} />
                    <FormErrorMessage>{formik.errors.maxPlayerPoints}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={formik.errors.totalTeamPoints && formik.touched.totalTeamPoints ? true : undefined}>
                    <FormLabel>Total Points For a Team</FormLabel>
                    <Input type='number' name="totalTeamPoints" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.totalTeamPoints} />
                    <FormErrorMessage>{formik.errors.totalTeamPoints}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={formik.errors.currentHikePoints && formik.touched.currentHikePoints ? true : undefined}>
                    <FormLabel>Starting Hike Points</FormLabel>
                    <Input type='number' name="currentHikePoints" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.currentHikePoints} />
                    <FormErrorMessage>{formik.errors.currentHikePoints}</FormErrorMessage>
                </FormControl>

                <Button isLoading={isLoading} bg='green' color='white' type="submit">Register</Button>


            </Box>
        </form>
    )
}

export default AuctionForm