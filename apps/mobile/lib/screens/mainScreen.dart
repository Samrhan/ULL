import 'dart:async';
import 'dart:convert' show json;

import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;
import 'package:sliding_up_panel/sliding_up_panel.dart';

class MainScreen extends StatelessWidget{
  MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      type: MaterialType.transparency,
      child : const EventBar()
    );
  }
}

class EventBar extends StatefulWidget{
  const EventBar({Key? key}) : super(key: key);

  @override
  State<EventBar> createState() => _EventBarState();

}

class _EventBarState extends State<EventBar>{
  var dropDownValue = "Anniversaire Adrien - 17/12/2022";
  var items = ["Anniversaire Adrien - 17/12/2022","Anniversaire Jonathan - 25/09/2022","Anniversaire Emily - 25/01/2022"];
  var assetImg = [

  ];


  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
            width: MediaQuery
                .of(context)
                .size
                .width,
            height: MediaQuery
                .of(context)
                .size
                .height / 5,
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
              children : [
            Row(
                children: [
                  Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Padding(
                        padding: EdgeInsets.fromLTRB(15,25,0,0),
                        child : Text(
                            "Votre évènement",
                            style: TextStyle(
                                color: Colors.grey, fontSize: 15, ),
                              textAlign: TextAlign.left
                          ),
                        ),
                          Padding(
                          padding: const EdgeInsets.fromLTRB(0,0,0,10),
                          child :Container(
                            width: 300,
                            decoration: ShapeDecoration(
                              color: const Color(0x00ffffff),
                              shape: SmoothRectangleBorder(
                                borderRadius: SmoothBorderRadius(
                                  cornerRadius: 10,
                                  cornerSmoothing: 0.5,
                                ),
                              ),
                            ),
                            child: MaterialButton(
                              onPressed: (){
                                showModalBottomSheet(
                                  context: context,
                                  builder: (context){
                                    return Column(
                                      children: [
                                        Container(
                                          child:  const Text("Vos évènements",
                                            style: TextStyle(fontSize: 20,color: Color(0xff832232)),
                                          ),
                                          decoration : BoxDecoration(
                                            boxShadow: [BoxShadow(
                                              color: Colors.grey.withOpacity(0.5),
                                              spreadRadius: 2,
                                              blurRadius: 3,
                                            )],
                                            color: Colors.white
                                          ),
                                          width: MediaQuery
                                              .of(context)
                                              .size
                                              .width,
                                        ),

                                        for (var item in items)
                                          if(item != dropDownValue)
                                          Container(
                                            width: MediaQuery
                                                  .of(context)
                                                  .size
                                                  .width,
                                            decoration : const BoxDecoration(
                                                border: Border(
                                                  bottom: BorderSide(width: 0.5,color: Colors.grey)
                                                )
                                            ),
                                            child : MaterialButton(
                                              onPressed: (){
                                                setState((){
                                                  dropDownValue = item;
                                                });
                                                Navigator.pop(context);
                                                },
                                              child: Row(
                                                mainAxisAlignment: MainAxisAlignment.start,
                                                children : [
                                                  Text(item,style: const TextStyle(fontSize: 12))
                                                ]
                                              )

                                            )
                                          )
                                        else
                                            Container(
                                                width: MediaQuery
                                                    .of(context)
                                                    .size
                                                    .width,
                                                decoration : const BoxDecoration(
                                                    border: Border(
                                                        bottom: BorderSide(width: 0.5,color: Colors.grey)
                                                    )
                                                ),
                                                child : MaterialButton(
                                                    onPressed: (){
                                                      setState((){
                                                        dropDownValue = item;
                                                      });
                                                      Navigator.pop(context);
                                                    },
                                                    child: Row(
                                                        mainAxisAlignment: MainAxisAlignment.start,
                                                        children : [
                                                          Icon(Icons.check),
                                                          Text(item,style: const TextStyle(fontSize: 12,fontWeight: FontWeight.bold))
                                                        ]
                                                    )

                                                )
                                            )
                                      ],
                                    );
                                  }
                                );
                              },
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(dropDownValue,
                                    style: const TextStyle(color: Colors.white,fontSize: 15)
                                  ),
                                  const Icon(Icons.keyboard_arrow_down,color: Colors.white)
                                ],
                              ),
                            ),
                          )
                        )
                      ],
                  ),
                  Container(
                    width : 50,
                    height: 50,
                    decoration: const BoxDecoration(
                      shape: BoxShape.circle,
                      image :DecorationImage(image : AssetImage("asset/JW.jpg"),fit: BoxFit.fill),
                    )
                  ),
                ],
              ),
                Container(
                  width: MediaQuery
                      .of(context)
                      .size
                      .width/7*6,

                  child: TextField(
                    decoration: InputDecoration(
                      prefixIcon: const Icon(Icons.search,size: 25),
                      hintText: 'Quel type de prestation recherchez-vous ?',
                      hintStyle: const TextStyle(fontSize: 13),
                      filled: true,
                      fillColor: Colors.white,
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.white),
                        borderRadius: BorderRadius.circular(25.7),
                      ),
                      enabledBorder: UnderlineInputBorder(
                        borderSide: const BorderSide(color: Colors.white),
                        borderRadius: BorderRadius.circular(25.7),
                      ),
                        isDense: true,                      // Added this
                        contentPadding: const EdgeInsets.all(12)
                    ),
                  ),
                )
              ]
            )
          ),
        const Padding(
          padding: EdgeInsets.fromLTRB(15,15,0,10),
          child :Text(
            "Populaire",
            style: TextStyle(fontWeight: FontWeight.bold,fontSize: 18)
          )
        ),
        Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
            Container(width: MediaQuery
              .of(context)
              .size
              .width/7*3,
              height: MediaQuery
                  .of(context)
                  .size.height/7,
              decoration: ShapeDecoration(
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                  cornerRadius: 10,
                  cornerSmoothing: 0.5,
                  ),
                ),
                image: DecorationImage(image: AssetImage("asset/traiteur.jpg"),fit: BoxFit.cover)
              ),
              alignment: Alignment.center,
              child: const Text("Traiteur",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 30,
                      shadows: <Shadow>[
                        Shadow(offset: Offset(2, 2),blurRadius:3)
                      ])),
            ),
            Container(width: MediaQuery
                .of(context)
                .size
                .width/7*3,
              height: MediaQuery
                  .of(context)
                  .size.height/7,
              decoration: ShapeDecoration(
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: 10,
                      cornerSmoothing: 0.5,
                    ),
                  ),
                  image: DecorationImage(image: AssetImage("asset/musique.jpg"),fit: BoxFit.cover)
              ),
              alignment: Alignment.center,
              child: const Text("Musique",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 30,
                      shadows: <Shadow>[
                        Shadow(offset: Offset(2, 2),blurRadius:3)
                      ])),
            )
          ],
        ),
        Padding(padding: EdgeInsets.fromLTRB(0,15,0,10),
          child : Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Container(width: MediaQuery
                  .of(context)
                  .size
                  .width/7*3,
                height: MediaQuery
                    .of(context)
                    .size.height/7,
                decoration: ShapeDecoration(
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 10,
                        cornerSmoothing: 0.5,
                      ),
                    ),
                    image: DecorationImage(image: AssetImage("asset/photographe.jpg"),fit: BoxFit.cover)
                ),
                alignment: Alignment.center,
                child: const Text("Photographe",
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        shadows: <Shadow>[
                          Shadow(offset: Offset(2, 2),blurRadius:3)
                        ])),
              ),
              Container(width: MediaQuery
                  .of(context)
                  .size
                  .width/7*3,
                height: MediaQuery
                    .of(context)
                    .size.height/7,
                decoration: ShapeDecoration(
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 10,
                        cornerSmoothing: 0.5,
                      ),
                    ),
                    image: DecorationImage(image: AssetImage("asset/salle.jpg"),fit: BoxFit.cover)
                ),
                alignment: Alignment.center,
                child: const Text("Salle",
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 30,
                        shadows: <Shadow>[
                          Shadow(offset: Offset(2, 2),blurRadius:3)
                        ])),
              )
            ],
          )
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: const [
            Text("Collections mises en avant",
                style: TextStyle(fontWeight: FontWeight.bold,fontSize: 18)
            ),
            Text("Voir tout",style: TextStyle(color: Color(0xffE94B64)))
          ],
        ),
        Padding(padding: const EdgeInsets.fromLTRB(0,15,0,0),
            child : Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Container(width: MediaQuery
                    .of(context)
                    .size
                    .width/7*3,
                  height: MediaQuery
                      .of(context)
                      .size.height/12,
                  decoration: ShapeDecoration(
                      shape: SmoothRectangleBorder(
                        borderRadius: SmoothBorderRadius(
                          cornerRadius: 10,
                          cornerSmoothing: 0.5,
                        ),
                      ),
                      color: const Color(0xffF98428)
                  ),
                  padding: const EdgeInsets.all(7),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children:const [
                      Text("Les préférés",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 15,
                              fontWeight: FontWeight.bold)
                      ),
                      Text("321 Prestataires",
                          style: TextStyle(
                              color: Colors.white54,
                              fontSize: 13)
                      ),
                    ]
                  ),
                ),
                Container(width: MediaQuery
                    .of(context)
                    .size
                    .width/7*3,
                  height: MediaQuery
                      .of(context)
                      .size.height/12,
                  decoration: ShapeDecoration(
                      shape: SmoothRectangleBorder(
                        borderRadius: SmoothBorderRadius(
                          cornerRadius: 10,
                          cornerSmoothing: 0.5,
                        ),
                      ),
                      color: const Color(0xffE94B64)
                  ),
                  padding: const EdgeInsets.all(7),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children:const [
                      Text("Plus beaux gateaux",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 15,
                              fontWeight: FontWeight.bold)
                        ),
                      Text("189 À découvrir",
                          style: TextStyle(
                              color: Colors.white54,
                              fontSize: 13)
                      ),
                      ]
                  )
                )
              ],
            )
        ),
        Padding(padding: const EdgeInsets.fromLTRB(0,15,0,0),
            child : Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Container(width: MediaQuery
                    .of(context)
                    .size
                    .width/7*3,
                  height: MediaQuery
                      .of(context)
                      .size.height/12,
                  decoration: ShapeDecoration(
                      shape: SmoothRectangleBorder(
                        borderRadius: SmoothBorderRadius(
                          cornerRadius: 10,
                          cornerSmoothing: 0.5,
                        ),
                      ),
                      color: const Color(0xff4866D2)
                  ),
                  padding: const EdgeInsets.all(7),
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children:const [
                        Text("Ambiance année 80",
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 15,
                                fontWeight: FontWeight.bold)
                        ),
                        Text("526 Sur le dancefloor",
                            style: TextStyle(
                                color: Colors.white54,
                                fontSize: 13)
                        ),
                      ]
                  ),
                ),
                Container(width: MediaQuery
                    .of(context)
                    .size
                    .width/7*3,
                    height: MediaQuery
                        .of(context)
                        .size.height/12,
                    decoration: ShapeDecoration(
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(
                            cornerRadius: 10,
                            cornerSmoothing: 0.5,
                          ),
                        ),
                        color: const Color(0xff2DABE1)
                    ),
                    padding: const EdgeInsets.all(7),
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children:const [
                          Text("Lieux mémorables",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold)
                          ),
                          Text("891 Salles",
                              style: TextStyle(
                                  color: Colors.white54,
                                  fontSize: 13)
                          ),
                        ]
                    )
                )
              ],
            )
        ),
        const Padding(
            padding: EdgeInsets.fromLTRB(15,15,0,10),
            child :Text(
                "Toutes les catégories",
                style: TextStyle(fontWeight: FontWeight.bold,fontSize: 18)
            )
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Padding(padding: const EdgeInsets.only(left: 10,right: 10),
                  child: Container(
                    width: 40,
                    height: 40,
                    decoration: ShapeDecoration(
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(
                            cornerRadius: 10,
                            cornerSmoothing: 0.5,
                          ),
                        ),
                        image: const DecorationImage(image: AssetImage("asset/traiteur.jpg"),fit: BoxFit.cover)
                    ),
                  )
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const[
                    Text("Magicien",style: TextStyle(fontSize: 15,fontWeight: FontWeight.bold)),
                    Text("Jouez des tours à vos invités",style: TextStyle(fontSize: 10))
                  ],
                ),
              ],
            ),
            const Icon(Icons.keyboard_arrow_right,size: 50,)
          ],
        )
      ],
    );
  }

}




