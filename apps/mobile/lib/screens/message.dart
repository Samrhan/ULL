import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:mobile/screens/bottomNavBar.dart';

class MessageScreen extends StatelessWidget{
  MessageScreen(GoogleSignInAccount? _currentAccount, {Key? key}){
    this._currentAccount = _currentAccount;
    super.key;
  }

  GoogleSignInAccount? _currentAccount;


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home :Scaffold(
            bottomNavigationBar: BottomNavBar(3,_currentAccount),
            body: ConstrainedBox(
              constraints: const BoxConstraints.expand(),
              child: const Text('Message'),
            )
        )
    );
  }
}
