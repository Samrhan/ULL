import 'package:flutter/material.dart';
import 'package:mobile/screens/bottomNavBar.dart';
import 'package:mobile/screens/mainScreen.dart';
import 'package:google_sign_in/google_sign_in.dart';

class MainEvent extends StatelessWidget{


  MainEvent(GoogleSignInAccount? _currentAccount, {Key? key}){
    this._currentAccount = _currentAccount;
    super.key;
  }

  GoogleSignInAccount? _currentAccount;


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home :Scaffold(
          bottomNavigationBar: BottomNavBar(1,_currentAccount),
          body: ConstrainedBox(
            constraints: const BoxConstraints.expand(),
              child: const Text('Event'),
        )
      )
    );
  }
}
