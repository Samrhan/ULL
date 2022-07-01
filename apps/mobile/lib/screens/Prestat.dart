import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:ULL/screens/mainScreen.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:dio/dio.dart';
import 'package:ULL/services/globals.dart' as globals;

import '../services/environment.dart';

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
  var _Presta;

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
          body: NestedScrollView(
            headerSliverBuilder: (context, innerBoxIsScrolled) {
              return <Widget>[
                SliverAppBar(
                  floating: false,
                  pinned: true,
                  snap: false,
                  elevation: 0,
                  expandedHeight: 150.0,
                  flexibleSpace: FlexibleSpaceBar(
                    title: Text("rr"),
                      background: Image.network(
                        'https://images.pexels.com/photos/443356/pexels-photo-443356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        fit: BoxFit.cover,
                      )
                  ),
                ),
              ];
            },
            body: Container(
              decoration: BoxDecoration(
                color: Colors.red,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(36),
                  topRight: Radius.circular(36),
                ),
              ),
              child: ListView.builder(
                itemExtent: 50.0,
                itemBuilder: (context, index) {
                  return Container(
                    alignment: Alignment.center,
                    color: Colors.lightBlue[100 * (index % 9)],
                    child: Text('List Item $index'),
                  );
                },
              ),
            ),
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
    try {
      Dio dio = new Dio();
      dio.options.headers["Authorization"] = "Bearer ${globals.accessToken}";
      String url =
          ev.baseServer + ev.providerService + "/profile/" + _currentPrestat;
      response = await dio.get(url);
    } catch (e) {
      print(e);
    }

    print(response);
    setState(() {
      _Presta = response;
      _isLoading = false;
    });
  }
}
