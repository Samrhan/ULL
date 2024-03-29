import 'dart:developer';

import 'package:ULL/screens/addEvent.dart';
import 'package:ULL/screens/eventDetail.dart';
import 'package:ULL/screens/profile.dart';
import 'package:ULL/screens/transition.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/material.dart';
import 'package:ULL/screens/bottomNavBar.dart';
import 'package:ULL/screens/mainScreen.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:ULL/services/globals.dart' as globals;
import 'package:sticky_headers/sticky_headers.dart';
import 'package:ULL/services/projectDisplay.dart';

class MainEvent extends StatelessWidget{


  MainEvent(GoogleSignInAccount? _currentAccount,{Key? key}){
    this._currentAccount = _currentAccount;
    super.key;
  }

  GoogleSignInAccount? _currentAccount;


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home :Scaffold(
          bottomNavigationBar: BottomNavBar(1,_currentAccount),
          floatingActionButton: FloatingActionButton(
            child: const Icon(Icons.add,size: 50,),
            onPressed: (){
              showModalBottomSheet(
                constraints: BoxConstraints(
                  maxHeight:MediaQuery
                      .of(context)
                      .size.height-70
                ),
                isScrollControlled: true,
                context: context,
                builder: (context){
                  return AddEvent(_currentAccount);
                }
              );
            },
            backgroundColor: const Color(0xff832232),
          ),
          body: ConstrainedBox(
            constraints: const BoxConstraints.expand(),
              child: MainEventStated(_currentAccount),
        )
      )
    );
  }
}


class MainEventStated extends StatefulWidget{
  MainEventStated(GoogleSignInAccount? _currentAccount){
    this._currentAccount = _currentAccount;
    super.key;
  }

  GoogleSignInAccount? _currentAccount;

  @override
  State<MainEventStated> createState() => _MainEventState();
}

class _MainEventState extends State<MainEventStated>{

  var dropDownValue = "Pas d'événements pour le moment" ;
  List<ProjectDisplay> events=[];

  @override MainEventStated get widget => super.widget;

  var _currentUser;

  @override
  initState(){
    super.initState();
    _currentUser = widget._currentAccount;
    if (globals.dropDownValue == null){
      if(globals.allEvents.isNotEmpty) {
        globals.dropDownValue = globals.allEvents[0];
        dropDownValue = dropDownValue = globals.dropDownValue!.name+" - "+ globals.dropDownValue!.projectDate;
      }
    }else{
      dropDownValue = globals.dropDownValue!.name+" - "+ globals.dropDownValue!.projectDate;
    }
    events = globals.allEvents; /*[
      ProjectDisplay(
        null,
        "Anniversaire Adrien",
        "17/12/2022",
        "Gros anniversaire sa mère. Y aura des meufs à balles, un cirque ambulant et même quelqu'un déguisé en séraphine.",
        20,
        "179", "Bd Maxime Gorki", "Villejuif",null, "94800",
        "https://www.feteanniversaire.fr/files/pages-anniversaire/2020/05/18/25-idees-de-textes-danniversaire.jpg",
        "pending_validation"
      ),
      ProjectDisplay(
          null,
          "Anniversaire Jonathan",
          "25/09/2022",
          "Anniversaire chill. Au programme choucroute et terraforming mars. Bref de l'emmerdement sympathique.",
          20,
          "179", "Bd Maxime Gorki", "Villejuif",null, "94800",
          "https://tra.img.pmdstatic.net/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2FCAM.2F2021.2F09.2F04.2F102033a7-fd8f-4650-bd9c-a56d560939d4.2Ejpeg/1200x630/quality/80/pourquoi-faire-la-fete-nous-fait-du-bien.jpg",
          "pending_payment"
      ),
      ProjectDisplay(
          null,
          "Anniversaire Emily",
          "25/01/2022",
          "Gros karting sa mère avec défi : celui qui roule en-dessous de 160km/h est un caca à roulette.",
          15, "179", "Bd Maxime Gorki", "Villejuif",null, "94800", "https://canaldelasiagne.fr/wp-content/uploads/2021/08/fete@2x.jpg",
          "paid"
      )
    ];*/
  }

  @override
  Widget build(BuildContext context) {
    return


      RefreshIndicator(
        onRefresh: () {return
          Navigator.pushReplacement(
            context,
            PageRouteBuilder(
              pageBuilder: (context,a1,a2) => Transition(_currentUser, MainEvent(_currentUser)),
              transitionsBuilder : (context,anim,a2,child) => FadeTransition(opacity: anim, child: child),
              transitionDuration: const Duration(milliseconds: 0),
            ),
          );
        },
    child: SingleChildScrollView(
         physics: AlwaysScrollableScrollPhysics(),
        child: StickyHeader(
            header : Container(
                  width: MediaQuery
                      .of(context)
                      .size
                      .width,
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
                  child: Padding(padding: const EdgeInsets.only(bottom: 10),
                  child : Column(
                      children : [
                        Row(
                          children: [
                            Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Padding(
                                  padding: EdgeInsets.fromLTRB(15,60,0,0),
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
                                              constraints: BoxConstraints(
                                                  maxHeight:MediaQuery
                                                      .of(context)
                                                      .size.height-70
                                              ),
                                              isScrollControlled: true,
                                              context: context,
                                              builder: (context){
                                                return SingleChildScrollView(
                                                  child :Column(
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

                                                    for (var item in events)
                                                      if(item.projectId != globals.dropDownValue!.projectId)
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
                                                                    globals.dropDownValue = item;
                                                                    dropDownValue = globals.dropDownValue!.name+" - "+ globals.dropDownValue!.projectDate;

                                                                    for(var ind in events){
                                                                      if(ind.projectId == globals.dropDownValue!.projectId){
                                                                        events.remove(ind);
                                                                        events.insert(0,ind);
                                                                        return;
                                                                      }
                                                                    }
                                                                  });
                                                                  Navigator.pop(context);
                                                                },
                                                                child: Row(
                                                                    mainAxisAlignment: MainAxisAlignment.start,
                                                                    children : [
                                                                      Text(item.name+" - "+item.projectDate,style: const TextStyle(fontSize: 12))
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
                                                                    globals.dropDownValue = item;
                                                                    dropDownValue = globals.dropDownValue!.name+" - "+ globals.dropDownValue!.projectDate;
                                                                    for(var ind in events){
                                                                      if(ind.projectId == globals.dropDownValue!.projectId){
                                                                        events.remove(ind);
                                                                        events.insert(0,ind);
                                                                        return;
                                                                      }
                                                                    }
                                                                  });
                                                                  Navigator.pop(context);
                                                                },
                                                                child: Row(
                                                                    mainAxisAlignment: MainAxisAlignment.start,
                                                                    children : [
                                                                      const Icon(Icons.check),
                                                                      Text(item.name+" - "+item.projectDate,style: const TextStyle(fontSize: 12,fontWeight: FontWeight.bold))
                                                                    ]
                                                                )

                                                            )
                                                        )
                                                  ],
                                                )
                                                );
                                              }
                                          );
                                        },
                                        child: Row(
                                          mainAxisAlignment: MainAxisAlignment.start,
                                          children: [
                                            Expanded(
                                                child: Text(dropDownValue,
                                                    maxLines: 1,
                                                    overflow : TextOverflow.ellipsis,
                                                    style: const TextStyle(
                                                        color: Colors.white,
                                                        fontSize: 15)
                                                )
                                            ),
                                            const Icon(Icons.keyboard_arrow_down,color: Colors.white)
                                          ],
                                        ),
                                      ),
                                    )
                                )
                              ],
                            ),
                            MaterialButton(
                              onPressed: () {
                                showModalBottomSheet<void>(
                                    isScrollControlled: true,
                                    context: context,
                                    shape: const RoundedRectangleBorder(
                                      // <-- SEE HERE
                                      borderRadius: BorderRadius.vertical(
                                        top: Radius.circular(12.0),
                                      ),
                                    ),
                                    builder: (BuildContext context) {
                                      return Profile(_currentUser);
                                    });
                              },
                              child: Container(
                                  width: 50,
                                  height: 50,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    image: DecorationImage(
                                        image: getProfileImage(), fit: BoxFit.cover),
                                  )),
                            )

                          ],
                        ),
                      ]
                  )
                  )
              ),
            content: Column(
            children: [
              for(var event in events)
                if(event.projectId != globals.dropDownValue!.projectId)
                  InkWell(
                    onTap: (){
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => EventDetail(_currentUser, event)
                        ),
                      );
                    },
                    child: Padding(padding: const EdgeInsets.only(left: 5, top: 5),
                      child: Container(
                        constraints: BoxConstraints(
                          minHeight: MediaQuery
                              .of(context)
                              .size
                              .height / 4,
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              decoration: ShapeDecoration(
                                  image: DecorationImage(image: NetworkImage(
                                      event.image), fit: BoxFit.cover),
                                  shape: const SmoothRectangleBorder(
                                    borderRadius: SmoothBorderRadius.only(
                                        topLeft: SmoothRadius(cornerRadius: 10,
                                            cornerSmoothing: 0.5),
                                        topRight: SmoothRadius(cornerRadius: 10,
                                            cornerSmoothing: 0.5)
                                    ),
                                  ),
                              ),
                              width: MediaQuery
                                  .of(context)
                                  .size
                                  .width - 10,
                              height: MediaQuery
                                  .of(context)
                                  .size
                                  .height / 6,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children:[
                                  Align(
                                    alignment: Alignment.topRight,
                                    child :Padding(
                                        padding: const EdgeInsets.only(top: 5,right: 5),
                                        child :Container(
                                          alignment: Alignment.center,
                                          width: 25,
                                          height: 25,
                                          decoration: const BoxDecoration(
                                            shape: BoxShape.circle,
                                            color: Colors.white
                                          ),
                                          child: const Icon(Icons.keyboard_arrow_right),
                                        ),
                                    ),
                                  ),
                                  Align(
                                    alignment: Alignment.bottomLeft,
                                    child: Padding(
                                      padding: const EdgeInsets.only(left: 5,bottom: 5),
                                      child: Container(
                                        alignment: Alignment.center,
                                        width: 50,
                                        height: 50,
                                        decoration: const BoxDecoration(
                                            shape: BoxShape.circle,
                                            color: Colors.white
                                        ),
                                        child: Icon(getIcon(event.state),size: 30,),
                                    ),
                                    ),
                                    )

                                    ]
                                    )
                                    ),
                                    Padding(
                                    padding: const EdgeInsets.only(left: 5, top: 5),
                                    child: Text(event.name,
                                    style: const TextStyle(fontWeight: FontWeight
                                        .bold, fontSize: 20), maxLines: 2,),
                                    ),
                                    Padding(
                                    padding: const EdgeInsets.only(left: 5, top: 5),
                                    child: Text(event.projectDate,
                                    style: const TextStyle(fontSize: 13
                                    ),
                                  maxLines: 1),
                            ),
                            Padding(
                                padding: const EdgeInsets.only(
                                    left: 5, top: 5, bottom: 5),
                                child: Text(event.number+" "+event.street+" "+event.postal_code+" "+event.city,
                                    style: const TextStyle(fontSize: 10),
                                    maxLines: 1)
                            ),

                          ],
                        ),
                        decoration: ShapeDecoration(
                          shape: SmoothRectangleBorder(
                            borderRadius: SmoothBorderRadius(
                              cornerRadius: 10,
                              cornerSmoothing: 0.5,
                            ),
                          ),
                          color: const Color(0xffEEEEEE),
                        ),
                        width: MediaQuery
                            .of(context)
                            .size
                            .width - 10,

                      )
                    )
                  )
                else
                  InkWell(
                      onTap: (){
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => EventDetail(_currentUser, event)
                          )
                        );
                      },
                      child: Padding(padding: const EdgeInsets.only(left: 5, top: 5),
                    child : Container(
                        constraints: BoxConstraints(
                          minHeight: MediaQuery
                              .of(context)
                              .size
                              .height / 4,
                        ),
                          child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              alignment: Alignment.topCenter,
                              decoration: ShapeDecoration(
                                image: DecorationImage(image: NetworkImage(
                                    event.image), fit: BoxFit.cover),
                                shape: const SmoothRectangleBorder(
                                  borderRadius: SmoothBorderRadius.only(
                                      topLeft: SmoothRadius(cornerRadius: 10,
                                          cornerSmoothing: 0.5),
                                      topRight: SmoothRadius(cornerRadius: 10,
                                          cornerSmoothing: 0.5)
                                  ),
                                ),
                              ),
                              width: MediaQuery
                                  .of(context)
                                  .size
                                  .width - 10,
                              height: MediaQuery
                                  .of(context)
                                  .size
                                  .height / 6,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children : [

                              Align(
                                alignment: Alignment.topCenter,
                              child :
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(top: 5,left: 5),
                                    child: Container(
                                      height: 25,

                                      decoration: ShapeDecoration(
                                        shape: SmoothRectangleBorder(
                                          borderRadius: SmoothBorderRadius(
                                            cornerRadius: 15,
                                            cornerSmoothing: 0.5,
                                          ),
                                        ),
                                        color: Colors.white
                                      ),
                                      child: Row(
                                        children: const [
                                          Padding(padding: EdgeInsets.only(right: 5,left: 5),child: Icon(Icons.check,size: 15),),
                                          Padding(padding: EdgeInsets.only(right: 5), child: Text("Actuellement sélectionné",style: TextStyle(fontSize: 13),))

                                        ],
                                      ),
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(top: 5,right: 5),
                                    child :Container(
                                      alignment: Alignment.center,
                                      width: 25,
                                      height: 25,
                                      decoration: const BoxDecoration(
                                          shape: BoxShape.circle,
                                          color: Colors.white
                                      ),
                                      child: const Icon(Icons.keyboard_arrow_right),
                                    ),
                                  )
                                ]
                              )
                              ),
                                  Align(
                                    alignment: Alignment.bottomLeft,
                                    child: Padding(
                                      padding: const EdgeInsets.only(left: 5,bottom: 5),
                                      child: Container(
                                        alignment: Alignment.center,
                                        width: 50,
                                        height: 50,
                                        decoration: const BoxDecoration(
                                            shape: BoxShape.circle,
                                            color: Colors.white
                                        ),
                                        child: Icon(getIcon(event.state),size: 30,),
                                      ),
                                    ),
                                  ),
                                  ]
                              )
                            ),
                            Padding(
                              padding: const EdgeInsets.only(left: 5, top: 5),
                              child: Text(event.name,
                                style: const TextStyle(fontWeight: FontWeight
                                    .bold, fontSize: 20), maxLines: 2,),
                            ),
                            Padding(
                              padding: const EdgeInsets.only(left: 5, top: 5),
                              child: Text(event.projectDate,
                                  style: const TextStyle(fontSize: 13),
                                  maxLines: 1),
                            ),
                            Padding(
                                padding: const EdgeInsets.only(
                                    left: 5, top: 5, bottom: 5),
                                child: Text(event.number+" "+event.street+" "+event.postal_code+" "+event.city,
                                    style: const TextStyle(fontSize: 10),
                                    maxLines: 1)
                            ),
                            Padding(padding: const EdgeInsets.only(left: 5,bottom: 10),
                              child: Container(
                                width: MediaQuery
                                    .of(context)
                                    .size
                                    .width - 20,
                                constraints: const BoxConstraints(minHeight: 20),
                                decoration: const BoxDecoration(
                                  border: Border(top: BorderSide(color: Colors.grey))
                                ),
                                child: Padding(padding: const EdgeInsets.only(top: 5),
                                    child: Text(event.description,style: const TextStyle(fontSize: 13),),
                                )
                              )
                            )

                          ],
                        ),

                      decoration: ShapeDecoration(
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(
                            cornerRadius: 10,
                            cornerSmoothing: 0.5,
                          ),
                        ),
                        color: const Color(0xffEEEEEE),
                      ),
                      width: MediaQuery
                          .of(context)
                          .size
                          .width - 10,

                    )
                  )
                )
              ]
            )
          )
    ));
  }




  getIcon(String state) {

    switch(state){
      case "draft" :
        return Icons.draw;
      case "pending_validation" :
        return Icons.hourglass_bottom;
      case "replacement" :
        return Icons.close;
      case "pending_payment" :
        return Icons.attach_money;
      case "paid" :
        return Icons.check;
    }

  }

  getProfileImage()  {
    var photoURL = _currentUser?.photoUrl;
    if(photoURL != null){
      return NetworkImage(photoURL);
    }
    else{
      return const AssetImage("asset/JW.jpg");
    }
  }

}


