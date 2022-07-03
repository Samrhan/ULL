import 'dart:convert';

import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/material.dart';
import 'package:ULL/screens/mainScreen.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:dio/dio.dart';
import 'package:ULL/services/globals.dart' as globals;

import '../services/environment.dart';

class BeginCat extends StatelessWidget {
  const BeginCat({
    Key? key,
    required this.info,
  }) : super(key: key);

  final Map<String, dynamic> info;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 150,
      width: MediaQuery.of(context).size.width,
      child: Row(
        children: [
          SizedBox(width: 10),
          CircleAvatar(
            radius: 50,
            backgroundImage: NetworkImage(
              //ev.providerPictures + _Listpresta[index]['profile_picture'],
              "https://dam.savencia.com/api/wedia/dam/transform/fix635d9eidk6rrwseqxx1hm4hxuee5jn54fmie/800?t=resize&width=800",
            ),
          ),
          SizedBox(width: 10),
          SizedBox(
            width: MediaQuery.of(context).size.width - 200,
            child: Column(
              children: [
                SizedBox(
                  width: double.infinity,
                  child: Container(
                    child: Text(
                      info['company_name'],
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
                      textAlign: TextAlign.left,
                    ),
                  ),
                ),
                SizedBox(height: 20),
                SizedBox(
                  width: MediaQuery.of(context).size.width - 110,
                  child: Container(
                    child: Text(
                      info['company_description'],
                      style: TextStyle(color: Colors.grey, fontSize: 13),
                      textAlign: TextAlign.left,
                    ),
                  ),
                ),
                SizedBox(height: 5),
                SizedBox(
                  width: double.infinity,
                  child: Container(
                    child: Text(
                      info['area_served'],
                      style: TextStyle(color: Colors.grey, fontSize: 13),
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

class addPresta extends StatelessWidget {
  const addPresta({
    Key? key,
    required this.textinfo,
  }) : super(key: key);

  final String textinfo;

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: EdgeInsets.only(left: 20.0, right: 20.0),
        child: ElevatedButton(
          child: Text("Ajouter ce prestataire"),
          onPressed: () {},
          style: ElevatedButton.styleFrom(
            shape: StadiumBorder(),
            primary: Colors.red,
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
        padding: EdgeInsets.all(10), //apply padding to all four sides
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
  const BigCat({
    Key? key,
    required this.tinfo,
  }) : super(key: key);

  final Map<String, dynamic> tinfo;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      child: Padding(
        padding: EdgeInsets.all(10), //apply padding to all four sides
        child: Column(
          children: <Widget>[
            SizedBox(
              width: double.infinity,
              child: Container(
                child: Text(
                  tinfo['section_title'],
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 22),
                  textAlign: TextAlign.left,
                ),
              ),
            ),
            SizedBox(
              height: 90,
              child: ListView(
                // This next line does the trick.
                scrollDirection: Axis.horizontal,
                children: <Widget>[
                  for (int index = 0;
                      index < tinfo['pictures'].length + 5;
                      index++)
                    Container(
                        margin: EdgeInsets.all(2),
                        child: AspectRatio(
                          child: Image.network(
                            "https://dam.savencia.com/api/wedia/dam/transform/fix635d9eidk6rrwseqxx1hm4hxuee5jn54fmie/800?t=resize&width=800",
                            height: 190.0,
                            fit: BoxFit.fill,
                          ),
                          aspectRatio: 5 / 3,
                        )),
                ],
              ),
            ),
            Row(
              children: [
                Expanded(
                  child: Container(
                    child: Text(
                      tinfo['content'][0]['performance_title'],
                      textAlign: TextAlign.left,
                    ),
                  ),
                ),
                Expanded(
                  child: Container(
                    child: Text(
                      tinfo['content'][0]['price']['value'].toString() +
                          "/" +
                          tinfo['content'][0]['price']['unit'],
                      textAlign: TextAlign.right,
                    ),
                  ),
                ),
              ],
            ),
            Text(tinfo['content'][0]['performance_description'],
                style: TextStyle(color: Colors.grey, fontSize: 11)),
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
  const MediumCat({
    Key? key,
    required this.tinfo,
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
              child: Container(
                child: Text(
                  tinfo['section_title'],
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 22),
                  textAlign: TextAlign.left,
                ),
              ),
            ),
            SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              child: Container(
                child: Text(
                  tinfo['section_description'],
                  style: TextStyle(fontSize: 16),
                  textAlign: TextAlign.left,
                ),
              ),
            ),
            SizedBox(
              height: 250,
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
                                'https://images.pexels.com/photos/443356/pexels-photo-443356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                                fit: BoxFit.fill,
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
                                  tinfo["content"][index]['price']['value']
                                          .toString() +
                                      "/" +
                                      tinfo["content"][index]['price']['unit'],
                                  style: const TextStyle(
                                      color: Colors.grey, fontSize: 12)),
                            ])
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
  const SmallCat({
    Key? key,
    required this.tinfo,
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
              child: Container(
                child: Text(
                  tinfo['section_title'],
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 22),
                  textAlign: TextAlign.left,
                ),
              ),
            ),
            SizedBox(height: 10),
            for (int index = 0; index < 4; index++)
              Container(
                width: MediaQuery.of(context).size.width,
                height: 110,
                child: Row(
                  children: [
                    SizedBox(
                      width: MediaQuery.of(context).size.width - 110,
                      child: Column(
                        children: [
                          SizedBox(
                            width: double.infinity,
                            child: Container(
                              child: Text(
                                "Pizza aaaa",
                                style: TextStyle(
                                    fontWeight: FontWeight.bold, fontSize: 18),
                                textAlign: TextAlign.left,
                              ),
                            ),
                          ),
                          SizedBox(height: 20),
                          SizedBox(
                            width: double.infinity,
                            child: Container(
                              child: Text(
                                "Base tomate tout ca tout ca",
                                style:
                                    TextStyle(color: Colors.grey, fontSize: 15),
                                textAlign: TextAlign.left,
                              ),
                            ),
                          ),
                          SizedBox(height: 20),
                          SizedBox(
                            width: double.infinity,
                            child: Container(
                              child: Text(
                                "10E",
                                style:
                                    TextStyle(color: Colors.grey, fontSize: 15),
                                textAlign: TextAlign.left,
                              ),
                            ),
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
                              //ev.providerPictures + _Listpresta[index]['profile_picture'],
                              "https://dam.savencia.com/api/wedia/dam/transform/fix635d9eidk6rrwseqxx1hm4hxuee5jn54fmie/800?t=resize&width=800",
                              width: 100.0,
                              height: 100.0,
                              fit: BoxFit.fill,
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
  const Choicecat({
    Key? key,
    required this.cat,
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
          ),
        ] else if (cat['type'] == 'medium') ...[
          MediumCat(
            tinfo: cat,
          ),
        ] else if (cat['type'] == 'small') ...[
          SmallCat(
            tinfo: cat,
          ),
        ],
        SizedBox(height: 10),
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
                      collapsedHeight: 100,
                      backgroundColor: Colors.black,
                      flexibleSpace: LayoutBuilder(builder:
                          (BuildContext context, BoxConstraints constraints) {
                        top = constraints.biggest.height;
                        return FlexibleSpaceBar(
                            title: AnimatedOpacity(
                                duration: Duration(milliseconds: 3),
                                opacity: top < 180 ? 1.0 : 0.0,
                                child: Column(
                                  children: [
                                    SizedBox(height: 60),
                                    addPresta(
                                      textinfo: 'aa',
                                    ),
                                    SizedBox(height: 15),
                                    Transform.translate(
                                      offset: const Offset(-120.0, 0.0),
                                      child: Text(
                                        _Presta[0]['company_name'],
                                        style: const TextStyle(
                                            fontSize: 20,
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),


                                  ],
                                )),
                            background: Image.network(
                              "https://images.ctfassets.net/pjshm78m9jt4/383122_header/d79a41045d07d114941f7641c83eea6d/importedImage383122_header",
                              fit: BoxFit.cover,
                            ));
                      }),
                    ),
                    SliverList(
                      delegate: SliverChildListDelegate(
                        [
                          addPresta(
                            textinfo: 'aa',
                          ),
                          SizedBox(height: 20),
                          BeginCat(info: _Presta[0]),
                          SizedBox(height: 10),
                          for (int index = 0;
                              index < _Presta[0]['services'].length;
                              index++)
                            Choicecat(cat: _Presta[0]['services'][index])
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
    var response;
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

    print(presta);
    setState(() {
      _Presta = presta;
      _isLoading = false;
    });
  }
}
