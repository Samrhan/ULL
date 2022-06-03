import 'dart:async';
import 'dart:convert' show json;

import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;


class AuthenticationPage extends StatelessWidget{
  AuthenticationPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      type: MaterialType.transparency,
      child : Column(
        children: [
          ClipPath(
              clipper: SkewCut(),
              child:Container(
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height/2+100,
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
                    Image.asset("asset/logo.png",width: 200),
                    const Text('Une toute petite étape avant de débuter',
                        style: TextStyle(
                            fontSize: 35,
                            color: Colors.white,
                            fontWeight: FontWeight.bold),
                        textAlign: TextAlign.center),
                    /*ElevatedButton(
                      onPressed: _handleSignIn,
                      child: const Text('SIGN IN'),
                    ),*/
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
              onPressed: _handleSignIn,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Image.asset("asset/google.png",width: 30),
                  const SizedBox(
                    width: 20,
                  ),
                  const Text("Continuer avec Google",
                    style: TextStyle(color: Colors.grey,fontSize: 20),)
                ],
              ),),
          )

        ],
      )
    );
  }

  final GoogleSignIn _googleSignIn = GoogleSignIn(
    // Optional clientId
    clientId:
    '978419384807-l8725i106c9a3pl60st07i2gs39p1ct2.apps.googleusercontent.com',
    scopes: <String>[
      'email',
      'openid',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  );

  Future<void> _handleSignIn() async {
    try {
      await _googleSignIn.signIn();
    } catch (error) {
      print(error);
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
