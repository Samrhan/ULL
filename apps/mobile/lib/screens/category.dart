import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:ULL/screens/bottomNavBar.dart';
import 'package:ULL/screens/ListPrestat.dart';
import 'package:ULL/services/globals.dart' as globals;

import 'mainScreen.dart';

class Category extends StatelessWidget{
  Category(GoogleSignInAccount? _currentAccount,{Key? key}){
    if(globals.dropDownValue != null) {
      event = globals.dropDownValue!.name + " - " +
          globals.dropDownValue!.projectDate;
    }
    else{
      event = "Pas d'événements pour le moment";
    }
    this._currentAccount=_currentAccount;

  }

  var event;
  GoogleSignInAccount? _currentAccount;


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
            extendBodyBehindAppBar: true,
            bottomNavigationBar: BottomNavBar(0, _currentAccount),
            appBar: PreferredSize(
                preferredSize:
                    Size.fromHeight(MediaQuery.of(context).size.height / 10),
                child: Column(
                  children: [
                    Container(
                        width: MediaQuery.of(context).size.width,
                        decoration: const BoxDecoration(
                            gradient: LinearGradient(
                                begin: Alignment.topRight,
                                end: Alignment.bottomLeft,
                                colors: <Color>[
                              Color(0xFF894c56),
                              Color(0xFFa80d0d)
                            ])),
                        child: Padding(padding: const EdgeInsets.only(bottom: 30),
                            child:Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              const Padding(
                                  padding: EdgeInsets.only(top: 50, left: 5),
                                  child: Text(
                                    'Votre évenement ',
                                    style: TextStyle(
                                        fontSize: 15, color: Colors.grey),
                                  )),
                              Padding(
                                padding: const EdgeInsets.only(top: 5, left: 5),
                                child: Text(
                                  event,
                                  style: const TextStyle(
                                      color: Colors.white, fontSize: 17),
                                ),
                              ),

                            ]
                            )
                        ),
                    )
                  ],
                ),

            ),
            body:
            ListPrestatStated( _currentAccount,'Traiteur')
           // ListPrestat('Traiteur', _currentAccount)


        ));
  }
}
