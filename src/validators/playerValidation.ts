import * as yup from 'yup'

export const playerValidationSchema = yup.object({

    tournamentId: yup.string().required(),
    playerName: yup.string().required().min(3).max(15),
    mobile: yup.string().required().matches(/^[0-9]{10}$/,'invalid mobile number'),
    playerType: yup.string().required(),
    dateOfBirth: yup.date(),
    address: yup.string().required().min(3).max(50),
    state: yup.string().min(3).max(20),
    district: yup.string().min(3).max(25),
    pincode: yup.string().min(6).max(6),
    battingStyle: yup.string().min(3).max(30),
    bowlingStyle: yup.string().min(3).max(30),
    team: yup.string().min(3).max(20)


})