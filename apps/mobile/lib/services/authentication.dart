import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';


class Authentication{


  final  GoogleSignIn _googleSignIn = GoogleSignIn(
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

  Future<void> _handleSignOut() => _googleSignIn.disconnect();

  GoogleSignInAccount? getId(){
    return _googleSignIn.currentUser;
  }

  Future<GoogleSignInAccount?> signIn() async{
    await _handleSignIn();
    return  _googleSignIn.currentUser;
  }

  void signOut(){
    _handleSignOut();
  }




}

