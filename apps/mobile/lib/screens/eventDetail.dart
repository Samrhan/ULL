import 'package:ULL/screens/bottomNavBar.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:ULL/services/projectDisplay.dart';
import 'package:sticky_headers/sticky_headers.dart';

class EventDetail extends StatelessWidget{
  EventDetail(this._currentAccount,this.event, {Key? key}) : super(key: key);

  final GoogleSignInAccount? _currentAccount;
  ProjectDisplay event;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home : EventDetailStated(_currentAccount,event),
    );
  }
}


class EventDetailStated extends StatefulWidget{
  EventDetailStated(this._currentAccount,this.event, {Key? key}) : super(key: key);


  final GoogleSignInAccount? _currentAccount;
  ProjectDisplay event;

  @override
  State<EventDetailStated> createState() => _EventDetailState();
}

class _EventDetailState extends State<EventDetailStated>{

  @override EventDetailStated get widget => super.widget;

  var _currentUser;
  var event;
  var nbPrestation;

  @override
  initState() {
    super.initState();
    _currentUser = widget._currentAccount;
    event = widget.event;
    nbPrestation = "4";
  }

  @override
  Widget build(BuildContext context){
    return Scaffold(
        bottomNavigationBar: BottomNavBar(1,_currentUser),
        floatingActionButton: SizedBox(
          child :FloatingActionButton(
            onPressed: (){},
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 20,
                cornerSmoothing: 1,
              ),
            ),
            child: Text(getStateText(event.state),style: const TextStyle(fontSize: 20,),),
            backgroundColor: getStateColor(event.state),
          ),
          width: MediaQuery
              .of(context)
              .size
              .width-20,
          height: 30,
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
        body: ConstrainedBox(
          constraints: const BoxConstraints.expand(),
          child: SingleChildScrollView(
            child: StickyHeader(
              header: Container(
                width: MediaQuery
                    .of(context)
                    .size
                    .width,
                height: MediaQuery
                    .of(context)
                    .size
                    .height / 4,
                decoration: BoxDecoration(
                  image: DecorationImage(image: NetworkImage(event.image),fit: BoxFit.fill)
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Padding(padding: const EdgeInsets.only(left: 10,right: 10,top: 10),
                      child: Text(event.name,style: const TextStyle(fontSize: 30,color: Colors.white,fontWeight: FontWeight.bold,shadows:
                      [
                        Shadow(offset: Offset(3, 3),blurRadius: 10,color: Colors.black87)
                      ])),),
                  Padding(padding: const EdgeInsets.only(left: 10,right: 10,bottom: 10),
                    child: Text(event.projectDate,style: const TextStyle(fontSize: 20,color: Colors.white,shadows:
                    [
                      Shadow(offset: Offset(3, 3),blurRadius: 10,color: Colors.black87)
                    ])),)
                  ],
                ),
              ),
              content: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(top: 15,left: 10),
                    child: Container(
                      width: MediaQuery
                          .of(context)
                          .size
                          .width-20,
                      decoration:  ShapeDecoration(
                        shape:  SmoothRectangleBorder(
                            borderRadius: SmoothBorderRadius(
                            cornerRadius: 10,
                            cornerSmoothing: 0.5,
                          ),
                        ),
                        color: Colors.white,
                        shadows: const [
                          BoxShadow(offset: Offset(3, 3),blurRadius: 10,color: Colors.black38),
                          BoxShadow(offset: Offset(-3, -3),blurRadius: 10,color: Colors.black38)
                        ]
                      ),
                      child: Column(
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(left: 10),
                            child: Container(
                              width: MediaQuery
                                  .of(context)
                                  .size
                                  .width-40,
                              decoration: const BoxDecoration(
                                border: Border(bottom: BorderSide(color: Colors.grey))
                              ),
                              child: Row(
                                children: [
                                   const Padding(
                                    padding: EdgeInsets.all( 10),
                                    child: Icon(Icons.location_on_outlined,size: 40,),
                                  ),
                                  Expanded(child:Padding(
                                    padding: const EdgeInsets.only(right: 10,bottom: 10, top : 10),
                                    child: Text(event.address,maxLines: 2,style: const TextStyle(fontSize: 18),),
                                  ))
                                ],
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 10),
                            child: Container(
                              width: MediaQuery
                                  .of(context)
                                  .size
                                  .width-40,
                              decoration: const BoxDecoration(
                                  border: Border(bottom: BorderSide(color: Colors.grey))
                              ),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  const Padding(
                                    padding: EdgeInsets.all( 10),
                                    child: Icon(Icons.person_outline,size: 40,),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(right: 10),
                                    child: Text(event.amountOfPeople+" participants",maxLines: 1,style: const TextStyle(fontSize: 18),),
                                  )
                                ],
                              ),
                            ),
                          ),
                          MaterialButton(onPressed: (){},
                            child : Padding(
                              padding: const EdgeInsets.only(left: 10),
                              child: Container(
                                width: MediaQuery
                                    .of(context)
                                    .size
                                    .width-40,
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Row(
                                      children: [
                                        Padding(
                                            padding: const EdgeInsets.all( 10),
                                            child: Image.asset("asset/bow_tie.png",height: 40,width: 40,)
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.only(right: 10),
                                          child: Text(nbPrestation+" Prestations",maxLines: 1,style: const TextStyle(fontSize: 18),),
                                        )
                                      ],
                                    ),
                                    const Padding(
                                      padding: EdgeInsets.only(right: 10),
                                      child: Icon(Icons.keyboard_arrow_right),
                                    )
                                  ],
                                ),
                              ),
                            ),
                          )
                        ],
                      ),
                    )
                  ),
                  const Padding(
                    padding: EdgeInsets.only(left: 10,top: 25,bottom: 25),
                    child: Text("L'événement",style: TextStyle(fontSize: 40,fontWeight: FontWeight.bold)),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 10,bottom: 10),
                    child: Text(event.description,style: const TextStyle(color: Colors.black,fontSize: 18),),
                  ),
                ],
              ),
            )
        )
      )
    );
  }

  getStateColor(String state){
    switch(state){
      case "draft" :
        return const Color(0xff832232);
      case "pending_validation" :
        return const Color(0xff9F9F9F);
      case "replacement" :
        return const Color(0xffDC3535);
      case "pending_payment" :
        return const Color(0xff34A853);
      case "paid" :
        return Colors.black;
    }
  }

  getStateText(String state){
    switch(state){
      case "draft" :
        return "Valider le projet";
      case "pending_validation" :
        return "En attente";
      case "replacement" :
        return "Action recquise";
      case "pending_payment" :
        return "Payer le projet";
      case "paid" :
        return "En attente du jour J !";
    }

  }

}
