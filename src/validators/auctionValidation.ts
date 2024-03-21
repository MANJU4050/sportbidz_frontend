import * as yup from 'yup'

export const auctionValidationSchema = yup.object({

    tournamentId: yup.string().required(),
    auctionDate: yup.date().required('auction date cannot be empty'),
    numberOfTeams: yup.number().required('number of teams cannot be empty').max(64,'max 64 teams only').min(2,'minimum 2 teams required'),
    playersPerTeam: yup.number().required('players per team cannot be empty').min(2,'minimum 2 players required'),
    basePlayerPoints: yup.number().required('base points cannot be empty').min(1,'base player points cannot be 0'),
    maxPlayerPoints: yup.number().required('maximum player points cannot be empty').min(1,'max player points cannot be 0'),
    totalTeamPoints: yup.number().required('total team points cannot be empty').min(1,'total team points cannot be 0'),
    currentHikePoints: yup.number().required('starting hike points cannot be empty').min(1,'starting hike points cannot be zero'),
   


})