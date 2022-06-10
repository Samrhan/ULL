import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:ULL/main.dart';
import 'package:ULL/screens/bottomNavBar.dart';
import 'package:ULL/services/authentication.dart';


class Profile extends StatelessWidget{

  Profile(GoogleSignInAccount? _currentAccount, {Key? key}) : super(key: key){
    this._currentAccount = _currentAccount;
    super.key;
  }

  GoogleSignInAccount? _currentAccount;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home :Scaffold(
            bottomNavigationBar: BottomNavBar(0,_currentAccount),
            body: ConstrainedBox(
                constraints: const BoxConstraints.expand(),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(padding: EdgeInsets.only(top: 70),
                      child : MaterialButton(onPressed: (){
                        Authentication().signOut();
                        Navigator.push(
                          context,
                          PageRouteBuilder(
                            pageBuilder: (context,a1,a2) => const ULL(),
                            transitionsBuilder : (context,anim,a2,child) => FadeTransition(opacity: anim, child: child),
                            transitionDuration: const Duration(milliseconds: 0),
                          ),
                        );
                      }
                      ,child: Text("Déco")
                      )
                    )
                  ],
                )
            )
        )
    );

    }
}
