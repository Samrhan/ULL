import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'dart:convert' show json;
import 'package:ULL/services/globals.dart' as globals;


class Authentication{


  final  GoogleSignIn _googleSignIn = GoogleSignIn(
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

  Future<void> handleGetContact(GoogleSignInAccount user) async {
    final http.Response response = await http.post(
        Uri.parse('http://10.0.2.2:3333/api/authentication/oauth'),
          body: {'email': user.email, 'id': user.id, 'access_token': (await user.authHeaders)['Authorization']},
        );
        final Map<String, dynamic> data =
        json.decode(response.body) as Map<String, dynamic>;
        globals.accessToken = data["access_token"];
  }


  }

