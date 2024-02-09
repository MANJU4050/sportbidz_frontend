export interface RegisterTournament {

    tournamentName: string;
    tournamentStartDate: Date
    numberOfTeams: number
    tournamentType: string
    playersPerTeam: number;
    maximumRegistrations: number
    address: string
    mobile: string
    registrationStartDate: Date
    registrationEndDate: Date
}

export interface getTournaments {
    page:number;
    limit:number;
    search:string
}