import 'dart:convert';
import 'dart:developer';

import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/material.dart';
import 'package:ULL/screens/mainScreen.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:dio/dio.dart';
import 'package:ULL/services/globals.dart' as globals;

import '../services/environment.dart';

class BeginCat extends StatelessWidget {
  BeginCat({
    Key? key,
    required this.info,
  }) : super(key: key);
  final Environment ev = Environment();

  final Map<String, dynamic> info;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      child: Row(
        children: [
          const SizedBox(height: 150),
          const SizedBox(width: 10),
          CircleAvatar(
            radius: 50,
            backgroundImage: NetworkImage(
              //ev.providerPictures + _Listpresta[index]['profile_picture'],
              ev.providerPictures +
                  info['id_provider'] +
                  "/" +
                  info['profile_picture'],
            ),
          ),
          const SizedBox(width: 10),
          SizedBox(
            width: MediaQuery.of(context).size.width - 200,
            child: Column(
              children: [
                SizedBox(
                  width: double.infinity,
                  child: Container(
                    child: Text(
                      info['company_name'],
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 24),
                      textAlign: TextAlign.left,
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: MediaQuery.of(context).size.width - 110,
                  child: Container(
                    child: Text(
                      info['company_description'],
                      style: const TextStyle(color: Colors.grey, fontSize: 13),
                      textAlign: TextAlign.left,
                    ),
                  ),
                ),
                const SizedBox(height: 5),
                SizedBox(
                  width: double.infinity,
                  child: Container(
                    child: Text(
                      info['area_served'],
                      style: const TextStyle(color: Colors.grey, fontSize: 13),
                      textAlign: TextAlign.left,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      decoration: const BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black38,
            blurRadius: 5,
            offset: Offset(0, 1),
          ),
        ],
      ),
    );
  }
}

class AddPresta extends StatelessWidget {
   AddPresta({
    Key? key,
    required this.performance_id,
  }) : super(key: key);

  final String performance_id;

  var color =globals.dropDownValue!.state =="draft" ? Colors.red : Colors.grey;

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.only(left: 30.0, right: 30.0),
        child: ElevatedButton(
          child: const Text("Add"),
          onPressed: () {addPresta(performance_id);},
          style: ElevatedButton.styleFrom(
            shape: const StadiumBorder(),
            primary: color,
          ),
        ));
  }
}

class InfoCat extends StatelessWidget {
  const InfoCat({
    Key? key,
    required this.textinfo,
  }) : super(key: key);

  final String textinfo;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      child: Padding(
        padding: const EdgeInsets.all(10), //apply padding to all four sides
        child: Text(textinfo),
      ),
      decoration: const BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black38,
            blurRadius: 5,
            offset: Offset(0, 1),
          ),
        ],
      ),
    );
  }
}

class BigCat extends StatelessWidget {
  var prestat;

  BigCat({
    Key? key,
    required this.tinfo,
    required this.prestat,
  }) : super(key: key);

  final Map<String, dynamic> tinfo;
  final Environment ev = Environment();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      child: Padding(
        padding: const EdgeInsets.all(10), //apply padding to all four sides
        child: Column(
          children: <Widget>[
            SizedBox(
              width: double.infinity,
              child: Text(
                tinfo['section_title'],
                style:
                    const TextStyle(fontWeight: FontWeight.bold, fontSize: 22),
                textAlign: TextAlign.left,
              ),
            ),
            SizedBox(
              height: 90,
              child: ListView(
                // This next line does the trick.
                scrollDirection: Axis.horizontal,
                children: <Widget>[
                  for (int index = 0; index < tinfo['pictures'].length; index++)
                    Container(
                        margin: const EdgeInsets.all(2),
                        child: AspectRatio(
                          child: Image.network(
                            ev.providerPictures +
                                prestat +
                                "/" +
                                tinfo['pictures'][index],
                            height: 190.0,
                            fit: BoxFit.cover,
                          ),
                          aspectRatio: 5 / 3,
                        )),
                ],
              ),
            ),
            Row(
              children: [
                Expanded(
                  child: Text(
                    tinfo['content'][0]['performance_title'],
                    textAlign: TextAlign.left,
                  ),
                ),
                Expanded(
                  child: Text(
                    (tinfo['content'][0]['price']['value']/100).toString() +
                        "€ / Participant",

                   // tinfo['content'][0]['price']['unit'],
                    textAlign: TextAlign.right,
                  ),
                ),
              ],
            ),
            Text(tinfo['content'][0]['performance_description'],
                style: const TextStyle(color: Colors.grey, fontSize: 11)),

            AddPresta( performance_id:tinfo['content'][0]['id_performance']),


          ],
        ),
      ),
      decoration: const BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black38,
            blurRadius: 5,
            offset: Offset(0, 1),
          ),
        ],
      ),
    );
  }
}

class MediumCat extends StatelessWidget {
  var prestat;
  final Environment ev = Environment();
  MediumCat({
    Key? key,
    required this.tinfo,
    required this.prestat,
  }) : super(key: key);

  final Map<String, dynamic> tinfo;

  @override
  Widget build(BuildContext context) {
    return Container(
        width: MediaQuery.of(context).size.width,
        child: Column(
          children: [
            SizedBox(
              width: double.infinity,
              child: Text(
                tinfo['section_title'],
                style:
                    const TextStyle(fontWeight: FontWeight.bold, fontSize: 22),
                textAlign: TextAlign.left,
              ),
            ),
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              child: Text(
                tinfo['section_description'],
                style: const TextStyle(fontSize: 16),
                textAlign: TextAlign.left,
              ),
            ),
            SizedBox(
              height: 300,
              child: ListView(
                // This next line does the trick.
                scrollDirection: Axis.horizontal,
                children: <Widget>[
                  for (int index = 0; index < tinfo["content"].length; index++)
                    Card(
                      clipBehavior: Clip.antiAliasWithSaveLayer,
                      child: SizedBox(
                        width: 170,
                        child: Column(
                          children: [
                            SizedBox(
                              height: 120,
                              width: 170,
                              child: Image.network(
                                ev.providerPictures +
                                    prestat +
                                    "/" +
                                    tinfo['content'][index]["picture"],
                                fit: BoxFit.cover,
                              ),
                            ),
                            const SizedBox(
                              height: 16,
                            ),
                            Column(children: [
                              Text(
                                tinfo["content"][index]["performance_title"],
                                style: const TextStyle(
                                    fontWeight: FontWeight.bold, fontSize: 16),
                              ),
                              const SizedBox(
                                height: 14,
                              ),
                              Text(
                                  tinfo["content"][index]
                                      ["performance_description"],
                                  style: const TextStyle(
                                      color: Colors.grey, fontSize: 12)),
                              const SizedBox(
                                height: 12,
                              ),
                              Text(
                                  (tinfo["content"][index]['price']['value']/100)
                                          .toString() +
                                      "€ / Participant",
                                    //  + tinfo["content"][index]['price']['unit'],
                                  style: const TextStyle(
                                      color: Colors.grey, fontSize: 12)),
                            ]),
                            AddPresta( performance_id:tinfo['content'][index]['id_performance']),

                          ],
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ],
        ));
  }
}

class SmallCat extends StatelessWidget {
  var prestat;
  SmallCat({
    Key? key,
    required this.tinfo,
    required this.prestat,
  }) : super(key: key);

  final Map<String, dynamic> tinfo;

  final Environment ev = Environment();

  @override
  Widget build(BuildContext context) {
    return Container(
        width: MediaQuery.of(context).size.width,
        child: Column(
          children: [
            SizedBox(
              width: double.infinity,
              child: Text(
                tinfo['section_title'],
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 22),
                textAlign: TextAlign.left,
              ),
            ),
            const SizedBox(height: 10),
            for (int index = 0; index < tinfo['content'].length; index++)
              Container(
                width: MediaQuery.of(context).size.width,
                height: 120,
                child: Row(
                  children: [
                    SizedBox(
                      width: MediaQuery.of(context).size.width - 120,
                      child: Column(
                        children: [
                          SizedBox(
                              width: double.infinity,
                              child: Container(
                                child: Padding(
                                  padding: const EdgeInsets.only(left: 10),
                                  child: Text(
                                    tinfo['content'][index]
                                        ['performance_title'],
                                    style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 18),
                                    textAlign: TextAlign.left,
                                  ),
                                ),
                              )),
                          const SizedBox(height: 20),
                          SizedBox(
                            width: double.infinity,
                            child: Padding(
                                padding: const EdgeInsets.only(left: 10),
                                child: Text(
                                  tinfo['content'][index]
                                      ['performance_description'],
                                  style: const TextStyle(
                                      color: Colors.grey, fontSize: 15),
                                  textAlign: TextAlign.left,
                                )),
                          ),
                          const SizedBox(height: 20),

                          SizedBox(
                            width: double.infinity,
                            child: Padding(
                                padding: const EdgeInsets.only(left: 10),
                                child: Text(
                                  (tinfo['content'][index]['price']['value']/100)
                                          .toString() +
                                      "€",
                                  style: const TextStyle(
                                      color: Colors.grey, fontSize: 15),
                                  textAlign: TextAlign.left,
                                )),
                          ),

                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: ClipRRect(
                          borderRadius: BorderRadius.circular(8.0),
                          child: AspectRatio(
                            child: Image.network(
                              ev.providerPictures +
                                  prestat +
                                  "/" +
                                  tinfo['content'][index]["picture"],
                              width: 100.0,
                              height: 100.0,
                              fit: BoxFit.cover,
                            ),
                            aspectRatio: 1 / 1,
                          )),
                    ),

                  ],
                ),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black38,
                      blurRadius: 5,
                      offset: Offset(0, 1),
                    ),
                  ],
                ),
              )
          ],
        ));
  }
}

class Choicecat extends StatelessWidget {
  var prestat;
  var project_id;

  Choicecat({
    Key? key,
    required this.cat,
    required this.prestat,
    required this.project_id,
  }) : super(key: key);

  final Map<String, dynamic> cat;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (cat['type'] == 'info') ...[
          InfoCat(
            textinfo: cat['section_description'],
          ),
        ] else if (cat['type'] == 'big') ...[
          BigCat(
            tinfo: cat,
            prestat: prestat,
          ),
        ] else if (cat['type'] == 'medium') ...[
          MediumCat(
            tinfo: cat,
            prestat: prestat,
          ),
        ] else if (cat['type'] == 'small') ...[
          SmallCat(
            tinfo: cat,
            prestat: prestat,
          ),
        ],
        const SizedBox(height: 10),
      ],
    );
  }
}

class PrestatStated extends StatefulWidget {
  String _currentPrestat = 'Default';
  final GoogleSignInAccount? _currentAccount;

  PrestatStated(this._currentAccount, this._currentPrestat, {Key? key})
      : super(key: key);

  @override
  State<PrestatStated> createState() => _PrestatState();
}

class _PrestatState extends State<PrestatStated> {
  @override
  PrestatStated get widget => super.widget;
  var idprojet = "1";
  var _currentPrestat;
  GoogleSignInAccount? _currentAccount;

  bool _isLoading = true;
  Environment ev = Environment();
  late List<dynamic> _Presta;
  var top = 0.0;

  void initState() {
    super.initState();
    _currentAccount = widget._currentAccount;
    _currentPrestat = widget._currentPrestat;
    fetchPresta();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        //   -(MediaQuery.of(context).size.height / 6 + 56),
        child: _isLoading
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : Scaffold(
                body: CustomScrollView(
                  slivers: [
                    SliverAppBar(
                      automaticallyImplyLeading: false,
                      floating: false,
                      leading: Center(
                        child: Ink(
                          height: 40.0,
                          decoration: const ShapeDecoration(
                            color: Colors.white,
                            shape: CircleBorder(),
                          ),
                          child: IconButton(
                            icon: Icon(Icons.arrow_back_ios, color: Colors.red),
                            onPressed: () => Navigator.pop(context),
                          ),
                        ),
                      ),
                      pinned: true,
                      snap: false,
                      elevation: 0,
                      expandedHeight: 170.0,
                      collapsedHeight: 60,
                      backgroundColor: Colors.black,
                      flexibleSpace: LayoutBuilder(builder:
                          (BuildContext context, BoxConstraints constraints) {
                        top = constraints.biggest.height;
                        return FlexibleSpaceBar(
                            title: AnimatedOpacity(
                                duration: Duration(milliseconds: 3),
                                opacity: top < 180 ? 1.0 : 0.0,
                                child:  Text(
                                  _Presta[0]['company_name'],
                                  style: const TextStyle(
                                      fontSize: 25,
                                      fontWeight: FontWeight.bold),
                                )),
                            background: Image.network(
                              ev.providerPictures +
                                  _Presta[0]['id_provider'] +
                                  "/" +
                                  _Presta[0]['cover_picture'],
                              fit: BoxFit.cover,
                            ));
                      }),
                    ),
                    SliverList(
                      delegate: SliverChildListDelegate(
                        [

                          const SizedBox(height: 20),
                          BeginCat(info: _Presta[0]),
                          const SizedBox(height: 10),
                          for (int index = 0;
                              index < _Presta[0]['services'].length;
                              index++)
                            Choicecat(
                                cat: _Presta[0]['services'][index],
                                prestat: _currentPrestat, project_id : idprojet,
                            ),
                        ],
                      ),
                    )
                  ],
                ),
              ));
  }

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    throw UnimplementedError();
  }

  Future fetchPresta() async {
    Response response;
    List<dynamic> presta = [];

    try {
      Dio dio = new Dio();
      dio.options.headers["Authorization"] = "Bearer ${globals.accessToken}";
      String url =
          ev.baseServer + ev.providerService + "/profile/" + _currentPrestat;
      response = await dio.get(url);
      presta.add(response.data);
    } catch (e) {
      print(e);
    }

    log(presta.toString());
    setState(() {
      _Presta = presta;
      _isLoading = false;
    });
  }
}
Future addPresta(performance_id) async {
  Response response;
  Environment ev = Environment();
  log("globals.allEvents.toString()");
  log(globals.dropDownValue!.state);
  if(globals.dropDownValue!.state == "pending_validation"){
    log("qesrsqdr");
    return null;
  }
  try {
    Dio dio = new Dio();
    dio.options.headers["Authorization"] = "Bearer ${globals.accessToken}";
    String url =
        ev.baseServer + ev.reservationService + "/reservation";
    log(url);
    var a = {"performance_id": performance_id, "project_id": globals.dropDownValue!.projectId!,"quantity":1} ;
    log(a.toString());
    response = await dio.post(url, data: a);
    log(response.toString());

  } catch (e) {
    print(e);
  }


}
