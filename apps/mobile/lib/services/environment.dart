
class Environment{
  var baseServer,authenticationService,chatService,customerService, accountingService,discoveryService,providerService,reservationService,providerPictures;
  Environment(){
    bool isProd = const bool.fromEnvironment('dart.vm.product');
    if(isProd){
      environmentCopyProd(EnvironmentProd());
    }else{
      environmentCopyDebug(EnvironmentDebug());
    }
  }
  environmentCopyProd(EnvironmentProd e){

    baseServer = e.baseServer;
    authenticationService = e.authenticationService;
    chatService = e.chatService;
    customerService = e.customerService;
    accountingService = e.accountingService;
    discoveryService = e.discoveryService;
    providerService = e.providerService;
    reservationService = e.reservationService;
    providerPictures = e.providerPictures;
  }
  environmentCopyDebug(EnvironmentDebug e){

    baseServer = e.baseServer;
    authenticationService = e.authenticationService;
    chatService = e.chatService;
    customerService = e.customerService;
    accountingService = e.accountingService;
    discoveryService = e.discoveryService;
    providerService = e.providerService;
    reservationService = e.reservationService;
    providerPictures = e.providerPictures;
  }

}

class EnvironmentDebug{
  var baseServer,authenticationService,chatService,customerService, accountingService,discoveryService,providerService,reservationService,providerPictures;
  EnvironmentDebug(){
    baseServer = "http://10.0.2.2:";
    authenticationService = "3333/api/authentication";
    chatService = "3337/api/chat";
    customerService = "3336/api/customer";
    accountingService = "3332/api/accounting";
    discoveryService = "3338/api/discovery";
    providerService = "3335/api/provider";
    reservationService = "3334/api/reservation";
    providerPictures = "https://cdn.sbader.fr/provider/";
  }
}

class EnvironmentProd{
  var baseServer,authenticationService,chatService,customerService, accountingService,discoveryService,providerService,reservationService,providerPictures;
  EnvironmentProd(){
    baseServer = "https://ull.sbader.fr/";
    authenticationService = "api/authentication";
    chatService = "api/chat";
    customerService = "api/customer";
    accountingService = "api/accounting";
    discoveryService = "api/discovery";
    providerService = "api/provider";
    reservationService = "api/reservation";
    providerPictures = "https://cdn.sbader.fr/provider/";
  }
}
