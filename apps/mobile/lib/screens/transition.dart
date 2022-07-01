import 'dart:async';
import 'dart:convert' show Codec, base64, json, utf8;

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
import 'package:flutter_spinkit/flutter_spinkit.dart';

class Transition extends StatefulWidget{
  Transition(GoogleSignInAccount? _currentAccount, {super.key}){
    this._currentAccount = _currentAccount;
  }

  GoogleSignInAccount? _currentAccount;

  @override
  State<Transition> createState() => TransitionState();
}

class TransitionState extends State<Transition>{
  @override
  Transition get widget => super.widget;
  bool done =false;
  GoogleSignInAccount? _currentAccount;

  @override
  initState(){
    super.initState();
    _currentAccount=widget._currentAccount;
  }

  @override
  Widget build(BuildContext context){
    if(done == false) {
      getAllProjects();
      return const Align(
        alignment: Alignment.center,
        child: SpinKitFadingCircle(
          color: Colors.red,
          size: 50.0,
        ),
      );
    }else{
      return Material(
        type: MaterialType.transparency,
        child: MainScreen(_currentAccount));
    }
  }


  Future<void> getAllProjects() async{
    Map<String, String> requestHeaders = {
      'Authorization': "Bearer ${globals.accessToken}"
    };
    Environment ev = Environment();
    String url = ev.baseServer + ev.customerService + "/all_projects" ;
    final http.Response response = await http.get(
        Uri.parse(url),
        headers: requestHeaders
    );
    final List data =
    json.decode(response.body);
    Codec<String, String> stringToBase64 = utf8.fuse(base64);
    final decodedTokenBodyJson = stringToBase64.decode(globals.accessToken!.split('.')[1]+'=');
    final decodedTokenBody = json.decode(decodedTokenBodyJson);
    final userId = decodedTokenBody['id'];
    url = ev.baseServer + ev.customerService + "/project/" ;
    String url1='';
    await Future.wait( data.map((element) async{
      url1 = url+element;
      final http.Response response2 = await http.get(
          Uri.parse(url1),
          headers: requestHeaders
      );
      final data2 = json.decode(response2.body);
      final date = DateTime.parse(data2["project_date"]);
      ProjectDisplay pJD = ProjectDisplay(
          element,
          data2["name"],
          date.day.toString().padLeft(2,'0') + '/' + date.month.toString().padLeft(2,'0') + '/' + date.year.toString().padLeft(2,'0'),
          data2["description"],
          data2["amount_of_people"],
          data2["address"]["number"],
          data2["address"]["street"],
          data2["address"]["city"],
          data2["address"]["complement"],
          data2["address"]["postal_code"],
          ev.customerPictures+userId+"/"+data2["image"],
          data2["state"]
      );
      if(!globals.allEvents.map((p)=>p.projectId).contains(pJD.projectId)){
        globals.allEvents.add(pJD);
      }
    }));
    setState((){
      done = true;
    });
  }
}
