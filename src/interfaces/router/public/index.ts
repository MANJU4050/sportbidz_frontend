export enum Public {
   Home = '/home',
   SignUp = '/signup',
   SignIn = '/signin',
}

export enum Private {
   Tournaments = 'tournaments',
   Tournament = 'tournament/:tournamentId',
   Manager = 'manager/register/:tournamentId',
   Auctions = 'auctions',
   Auction = 'auction/:auctionId/:tournamentId'
  
}

export enum Open {
   playerregistration = '/tournament/register/:tournamentId',
   ManagerRegistration = '/manager/register/:tournamentId',
   AuctionStatus = '/auction/:auctionId'
}
