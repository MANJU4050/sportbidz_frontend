import * as yup from "yup"

export const tournamentRegistrationSchema = yup.object({
    tournamentName: yup.string().required('tournament name cannot be empty').min(3, 'minimum 3 characters').max(100, 'maximum 100 characters'),
    tournamentStartDate: yup.date().required('date cannot be empty'),
    numberOfTeams: yup.number().required('teams cannot be empty').min(2,'minimum 2 teams required').max(64, 'maximum 64 teams only'),
    tournamentType: yup.string().required('type cannot be empty'),
    playersPerTeam: yup.number().required('player count cannot be empty').min(2,'minimum 2 players should be in a team'),
    maximumRegistrations: yup.number().max(1000,'maximum 1000 registrations per tournament'),
    address: yup.string().required('address cannot be empty').max(100,'max address limit 100'),
    mobile: yup.string().required('mobile number cannot be empty').matches(/^[0-9]{10}$/, 'invalid mobile number'),
    registrationStartDate: yup.date().required('date cannot be empty'),
    registrationEndDate: yup.date()
})