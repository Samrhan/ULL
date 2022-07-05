import 'dart:io';

import 'package:ULL/services/environment.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

import 'package:image_picker/image_picker.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:http/http.dart' as http;
import 'package:dio/dio.dart';
import 'package:sticky_headers/sticky_headers.dart';
import 'package:ULL/services/globals.dart' as globals;
import 'package:ULL/screens/transition.dart';

class AddEvent extends StatefulWidget {
  AddEvent(GoogleSignInAccount? _currentAccount) : super(){
    this._currentAccount=_currentAccount;
  }
  GoogleSignInAccount? _currentAccount;

  @override
  AddEventState createState() => AddEventState();
}

class AddEventState extends State<AddEvent> {
  XFile? file;
  ImagePicker _picker = ImagePicker();
  String? name,
      addressNb,
      addressStreet,
      addressCity,
      addressPostalCode,
      nb,
      description;
  GoogleSignInAccount? _currentAccount;
  DateTime date = DateTime.now();

  AddEvent get widget => super.widget;

  @override
  initState(){
    super.initState();
    _currentAccount=widget._currentAccount;
  }

  @override
  Widget build(BuildContext context) {
    return  SingleChildScrollView(

        child: StickyHeader(
            header: Container(
              decoration: const BoxDecoration(
                  color: Color(0xffeeeeee),
                  boxShadow: [
                    BoxShadow(
                        color: Colors.grey,
                        spreadRadius: 5,
                        blurRadius: 7,
                        offset: Offset(0, 3)
                    )
                  ]
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  MaterialButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    child: const Text(
                      "Annuler",
                      style: TextStyle(color: Color(0xff832232), fontSize: 20),
                    ),
                  ),
                  MaterialButton(
                    onPressed: pushData,
                    child: const Text(
                      "Enregistrer",
                      style: TextStyle(
                          color: Color(0xff832232),
                          fontSize: 20,
                          fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ),
            ),
            content: Padding(
              padding: const EdgeInsets.only(top: 20,left: 10,right: 10,bottom: 10),
              child: Column(
                children: [
                  showImage(),
                  Container(
                    height: 80,
                    width: MediaQuery.of(context).size.width - 20,
                    decoration: const BoxDecoration(
                        border: Border(
                            bottom:
                            BorderSide(width: 0.5, color: Colors.grey))),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          "Nom du projet",
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                        Padding(
                            padding: EdgeInsets.all(10),
                            child: Container(
                                width: MediaQuery.of(context).size.width / 2,
                                child: TextField(
                                  onChanged: (text) {
                                    setState(() {
                                      name = text;
                                    });
                                  },
                                  decoration: const InputDecoration(
                                      fillColor: Color(0xffeeeeee),
                                      filled: true),
                                ))),
                      ],
                    ),
                  ),
                  Container(
                    height: 261,
                    width: MediaQuery.of(context).size.width - 20,
                    decoration: const BoxDecoration(
                        border: Border(
                            bottom:
                            BorderSide(width: 0.5, color: Colors.grey))),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Padding(
                            padding: EdgeInsets.only(top: 20),
                            child: Text(
                              "Adresse",
                              style: TextStyle(fontWeight: FontWeight.bold),
                            )),
                        Padding(
                            padding: EdgeInsets.all(10),
                            child: Column(children: [
                              Container(
                                  width: MediaQuery.of(context).size.width / 2,
                                  height: 60,
                                  child: TextField(
                                    onChanged: (text) {
                                      setState(() {
                                        addressNb = text;
                                      });
                                    },
                                    decoration: const InputDecoration(
                                        fillColor: Color(0xffeeeeee),
                                        filled: true,
                                        hintText: "Numéro"),
                                  )),
                              Container(
                                  width: MediaQuery.of(context).size.width / 2,
                                  height: 60,
                                  child: TextField(
                                    onChanged: (text) {
                                      setState(() {
                                        addressStreet = text;
                                      });
                                    },
                                    decoration: const InputDecoration(
                                        fillColor: Color(0xffeeeeee),
                                        filled: true,
                                        hintText: "Rue"),
                                  )),
                              Container(
                                  width: MediaQuery.of(context).size.width / 2,
                                  height: 60,
                                  child: TextField(
                                    onChanged: (text) {
                                      setState(() {
                                        addressPostalCode = text;
                                      });
                                    },
                                    decoration: const InputDecoration(
                                        fillColor: Color(0xffeeeeee),
                                        filled: true,
                                        hintText: "Code postal"),
                                  )),
                              Container(
                                  width: MediaQuery.of(context).size.width / 2,
                                  height: 60,
                                  child: TextField(
                                    onChanged: (text) {
                                      setState(() {
                                        addressCity = text;
                                      });
                                    },
                                    decoration: const InputDecoration(
                                        fillColor: Color(0xffeeeeee),
                                        filled: true,
                                        hintText: "Ville"),
                                  )),
                            ])),
                      ],
                    ),
                  ),
                  Container(
                    height: 80,
                    width: MediaQuery.of(context).size.width - 20,
                    decoration: const BoxDecoration(
                        border: Border(
                            bottom:
                            BorderSide(width: 0.5, color: Colors.grey))),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          "Date",
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                        Padding(
                            padding: const EdgeInsets.all(10),
                            child: ElevatedButtonTheme(
                                data: ElevatedButtonThemeData(
                                    style: ButtonStyle(
                                      minimumSize: MaterialStateProperty.resolveWith<Size>(
                                              (states) => Size((MediaQuery.of(context).size.width / 2),50)),
                                      side: MaterialStateProperty.resolveWith<BorderSide>(
                                              (states) => const BorderSide(color: Colors.grey)),
                                      backgroundColor: MaterialStateProperty.resolveWith<Color>(
                                              (states) => const Color(0xffeeeeee)),
                                    )
                                ),
                                child : ElevatedButton(
                                  onPressed: () async{
                                    DateTime? newDate = await showDatePicker(
                                        context: context,
                                        initialDate: date,
                                        firstDate: DateTime.now(),
                                        lastDate: DateTime(2100)
                                    );
                                    if(newDate != null) {
                                      setState(() {
                                        date = newDate;
                                      });
                                    }
                                  },
                                  child: Text(date.day.toString().padLeft(2,'0') + '/' + date.month.toString().padLeft(2,'0') + '/' + date.year.toString().padLeft(2,'0')
                                    ,style: const TextStyle(color: Colors.black,fontSize: 20),),
                                )
                            )
                        ),
                      ],
                    ),
                  ),
                  Container(
                    height: 80,
                    width: MediaQuery.of(context).size.width - 20,
                    decoration: const BoxDecoration(
                        border: Border(
                            bottom:
                            BorderSide(width: 0.5, color: Colors.grey))),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          "Nombre de participants",
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                        Padding(
                            padding: EdgeInsets.all(10),
                            child: Container(
                                width: MediaQuery.of(context).size.width / 2,
                                child: TextField(
                                  onChanged: (text) {
                                    setState(() {
                                      nb = text;
                                    });
                                  },
                                  decoration: const InputDecoration(
                                      fillColor: Color(0xffeeeeee),
                                      filled: true),
                                ))),
                      ],
                    ),
                  ),
                  Container(
                    height: 260,
                    width: MediaQuery.of(context).size.width - 20,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Padding(
                            padding: EdgeInsets.only(top: 20),
                            child: Text(
                              "Description",
                              style: TextStyle(fontWeight: FontWeight.bold),
                            )),
                        Padding(
                            padding: EdgeInsets.all(10),
                            child: Container(
                                width: MediaQuery.of(context).size.width / 2,
                                child: TextField(
                                  maxLines: 10,
                                  maxLength: 2000,
                                  onChanged: (text) {
                                    setState(() {
                                      description = text;
                                    });
                                  },
                                  decoration: const InputDecoration(
                                      fillColor: Color(0xffeeeeee),
                                      filled: true),
                                ))),
                      ],
                    ),
                  ),
                ],
              ),
            )));
  }

  chooseImage() async {
    var file1 = await _picker.pickImage(source: ImageSource.gallery);
    setState(() {
      file = file1;
    });
  }

  ShapeDecoration getDecoration() {
    if (file == null) {
      return ShapeDecoration(
          color: const Color(0xffeeeeee),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 10,
              cornerSmoothing: 0.5,
            ),
          ));
    } else {
      return ShapeDecoration(
          image: DecorationImage(
              fit: BoxFit.fill, image: FileImage(File(file!.path))),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 10,
              cornerSmoothing: 0.5,
            ),
          ));
    }
  }

  Widget showImage() {
    return Container(
      width: MediaQuery.of(context).size.width - 20,
      height: 250,
      alignment: Alignment.center,
      decoration: getDecoration(),
      child: Container(
        width: 150,
        height: 50,
        decoration: ShapeDecoration(
          color: Colors.black,
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 10,
              cornerSmoothing: 0.5,
            ),
          ),
        ),
        child: MaterialButton(
          onPressed: chooseImage,
          child: const Text(
            "Choisir une image",
            style: TextStyle(color: Colors.white),
          ),
        ),
      ),
    );
  }

  pushData() async {
    var dio = Dio();
    dio.options.headers['content-Type'] = 'multipart/form-data';
    dio.options.headers['Authorization'] = "Bearer ${globals.accessToken}";
    Environment ev = Environment();
    var url = ev.baseServer + ev.customerService + "/project";
    FormData formData = FormData.fromMap({
      "project_name": name,
      "project_date": date.toString(),
      "project_description": description,
      "amount_of_people": nb,
      "address_number": addressNb,
      "address_street": addressStreet,
      "address_city": addressCity,
      "address_postal_code": addressPostalCode,
      "project_picture":
          await MultipartFile.fromFile(file!.path, filename: file!.name)
    });

    try {
      var res = await dio.post(url, data: formData);
      Navigator.push(
        context,
        PageRouteBuilder(
          pageBuilder: (context,a1,a2) => Transition(_currentAccount),
          transitionsBuilder : (context,anim,a2,child) => FadeTransition(opacity: anim, child: child),
          transitionDuration: const Duration(milliseconds: 0),
        ),
      );
      print(res.statusMessage);
    }catch(e){
      if(e is DioError){
        print(e.response);
      }else{
        print("rip");
      }
    }
  }
}
