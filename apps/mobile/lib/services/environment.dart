
class Environment{
  var baseServer,authenticationService,chatService,customerService, accountingService,discoveryService,providerService,reservationService,providerPictures;
  Environment(){
    print("e");
    bool isProd = const bool.fromEnvironment('dart.vm.product');
    if(isProd){
      print("f");
      environmentCopy(EnvironmentProd());
      print("g");
    }else{
      print("h");
      environmentCopy(EnvironmentDebug());
      print("i");
    }
  }
  environmentCopy(Environment e){
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

class EnvironmentDebug extends Environment{
  EnvironmentDebug(){
    print("l");
    baseServer = "http://localhost:";
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

class EnvironmentProd extends Environment{
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
