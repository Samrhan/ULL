import 'dart:async';
import 'dart:convert' show json;

import 'package:ULL/screens/transition.dart';
import 'package:ULL/services/projectDisplay.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:ULL/services/authentication.dart';
import 'package:ULL/screens/mainScreen.dart';
import 'package:ULL/services/environment.dart';
import 'package:ULL/services/globals.dart' as globals;
import 'package:http/http.dart' as http;
import 'dart:convert' show json;


class AuthenticationPage extends StatefulWidget{
  AuthenticationPage({super.key});

  @override
  State<AuthenticationPage> createState() => _AuthenticationPageState();
}

class _AuthenticationPageState extends State<AuthenticationPage>{

  Authentication _authentication = Authentication();
  GoogleSignInAccount? _currentAccount;


  @override
  Widget build(BuildContext context) {
    if(_currentAccount == null) {
      return Material(
          type: MaterialType.transparency,
          child: Column(
            children: [
                ClipPath(
                    clipper: SkewCut(),
                    child: Container(
                      width: MediaQuery
                          .of(context)
                          .size
                          .width,
                      height: MediaQuery
                          .of(context)
                          .size
                          .height / 2 + 100,
                      decoration: const BoxDecoration(
                          gradient: LinearGradient(
                              begin: Alignment.topRight,
                              end: Alignment.bottomLeft,
                              colors: <Color>[
                                Color(0xFF894c56),
                                Color(0xFFa80d0d)
                              ]
                          )
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: <Widget>[
                          Image.asset("asset/logo.png", width: 200),
                          const Text('Une toute petite étape avant de débuter',
                              style: TextStyle(
                                  fontSize: 35,
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                              textAlign: TextAlign.center),

                        ],
                      ),
                    )
                ),
              Container(
                height: 100,
              ),
              Container(
                width: 300,
                decoration: ShapeDecoration(
                  color: Colors.white,
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: 10,
                      cornerSmoothing: 0.5,
                    ),
                  ),
                  shadows: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.5),
                      spreadRadius: 5,
                      blurRadius: 7,
                      offset: const Offset(0, 3), // changes position of shadow
                    ),
                  ],
                ),
                child: MaterialButton(
                  onPressed: ()  async {
                    var _auth = await _authentication.signIn();
                    await _authentication.handleGetContact(_auth!);
                    print(globals.allEvents);
                    setState(() {
                       _currentAccount = _auth;
                    });
                  },
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Image.asset("asset/google.png", width: 30),
                      const SizedBox(
                        width: 20,
                      ),
                      const Text("Continuer avec Google",
                        style: TextStyle(color: Colors.grey, fontSize: 18),)
                    ],
                  ),),
              )

            ],
          )
      );
    }
    else{
      return Material(
        type: MaterialType.transparency,
        child: Transition(_currentAccount, MainScreen(_currentAccount))
      );
    }
  }



}

class SkewCut extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    final path = Path();
    path.lineTo(size.width, 0);
    path.lineTo(size.width, size.height);
    path.lineTo(0, 6*size.height/7);
    path.lineTo(0, 0);
    path.close();

    return path;
  }

  @override
  bool shouldReclip(SkewCut oldClipper) => false;
}
