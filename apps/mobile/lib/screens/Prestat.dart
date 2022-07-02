import 'dart:convert';

import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/material.dart';
import 'package:ULL/screens/mainScreen.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:dio/dio.dart';
import 'package:ULL/services/globals.dart' as globals;

import '../services/environment.dart';

class InfoCat extends StatelessWidget {
  const InfoCat({
    Key? key,
    required this.textinfo,
  }) : super(key: key);

  final String textinfo;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width -10,
      decoration: BoxDecoration( boxShadow: [
        BoxShadow(
          color: Colors.grey.withOpacity(0.5),
          spreadRadius: 5,
          blurRadius: 7,
          offset: Offset(0, 3), // changes position of shadow
        ),
      ],),

      padding: const EdgeInsets.all(7),
      child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.start,
          children:  [
            Text(textinfo,
                style: const TextStyle(
                    color: Colors.black,
                    fontSize: 13,
                    fontWeight: FontWeight.bold)),

          ]),
    );
  }
}

class BigCat extends StatelessWidget {
  const BigCat({
    Key? key,
    required this.textinfo,
  }) : super(key: key);

  final String textinfo;

  @override
  Widget build(BuildContext context) {
    return Text("BigCat");
  }
}

class MediumCat extends StatelessWidget {
  const MediumCat({
    Key? key,
    required this.textinfo,
  }) : super(key: key);

  final String textinfo;

  @override
  Widget build(BuildContext context) {
    return Text("Medium");
  }
}

class SmallCat extends StatelessWidget {
  const SmallCat({
    Key? key,
    required this.textinfo,
  }) : super(key: key);

  final String textinfo;

  @override
  Widget build(BuildContext context) {
    return Text("Small");
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
          Text("big"),
        ] else if (cat['type'] == 'medium') ...[
          Text("medium"),
        ] else if (cat['type'] == 'small') ...[
          Text("small"),
        ],
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
                      expandedHeight: 150.0,
                      backgroundColor: Colors.black,
                      flexibleSpace: FlexibleSpaceBar(
                          title: Text(_Presta[0]['company_name']),
                          background: Image.network(
                            'https://images.pexels.com/photos/443356/pexels-photo-443356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                            fit: BoxFit.cover,
                          )),
                    ),
                    SliverList(
                      delegate: SliverChildListDelegate(
                        [
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
