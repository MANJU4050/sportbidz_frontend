import * as yup from 'yup'

export const managerValidationSchema = yup.object({

    tournamentId: yup.string().required(),
    managerName: yup.string().required('name is required').min(3).max(15),
    mobile: yup.string().required('mobile number is required').matches(/^[0-9]{10}$/,'invalid mobile number'),
    teamName:yup.string().required('team name is required').min(2),
    dateOfBirth: yup.date(),
    address: yup.string().required().min(3).max(50),
    icon:yup.object({
        iconName: yup.string(),
        iconMobile:yup.string().matches(/^[0-9]{10}$/,'invalid mobile number'),
        iconAddress:yup.string()
    })


})