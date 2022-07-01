import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:ULL/screens/mainScreen.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:dio/dio.dart';
import 'package:ULL/services/globals.dart' as globals;
import 'package:ULL/screens/Prestat.dart';

import '../services/environment.dart';

// Bonjour ne posez pas de questions  Merci.
/*
אני לא ממש יודע מה עשיתי, הייתי צריך לקנן דקלאס בשיעורים בשיעורים אחרת זה לא עובד. זה אפילו יותר גרוע מ-CSS.
 */

class TagList extends StatelessWidget {
  const TagList({
    Key? key,
    required this.ListCat,
  }) : super(key: key);

  final List<dynamic> ListCat;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        width: MediaQuery.of(context).size.width - 30,
        height: 20,
        child: ListView(
          scrollDirection: Axis.horizontal,
          shrinkWrap: true,
          children: <Widget>[
            for (int index = 0; index < ListCat.length; index++)
              Padding(
                  padding: const EdgeInsets.only(right: 4.0),
                  child: Container(
                      decoration: BoxDecoration(
                          border: Border.all(
                            color: Colors.grey,
                          ),
                          borderRadius:
                              const BorderRadius.all(Radius.circular(20))),
                      child: Padding(
                          padding: const EdgeInsets.fromLTRB(4, 2, 4, 2),
                          child: Text(
                            ListCat[index],
                            style: const TextStyle(
                                fontSize: 11.0,
                                color: Colors.black,
                                decoration: TextDecoration.none),
                          ))))
          ],
        ));
  }
}

class _ArticleDescription extends StatelessWidget {
  const _ArticleDescription({
    Key? key,
    required this.title,
    required this.subtitle,
    required this.ListCat,
  }) : super(key: key);

  final String title;
  final String subtitle;
  final List<dynamic> ListCat;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                title,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                    fontSize: 15.0,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                    decoration: TextDecoration.none),
              ),
              const Padding(padding: EdgeInsets.only(bottom: 4.0)),
              Text(
                subtitle,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                    fontSize: 11.0,
                    color: Colors.grey,
                    decoration: TextDecoration.none),
              ),
              const Padding(padding: EdgeInsets.only(bottom: 20.0)),
              TagList(ListCat: ListCat),
            ],
          ),
        ),
      ],
    );
  }
}

class CustomListItem extends StatelessWidget {
  const CustomListItem({
    Key? key,
    required this.thumbnail,
    required this.title,
    required this.subtitle,
    required this.ListCat,
    required this.idpresta,
    required this.currentAccount,
  }) : super(key: key);
  final GoogleSignInAccount? currentAccount;

  final Widget thumbnail;
  final String title;
  final String subtitle;
  final String idpresta;
  final List<dynamic> ListCat;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      child: SizedBox(
        height: 160,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 0, 0, 0),
              child: thumbnail,
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20.0, 0.0, 2.0, 0.0),
                child: _ArticleDescription(
                  title: title,
                  subtitle: subtitle,
                  ListCat: ListCat,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(0, 25, 10, 0),
              child: IconButton(
                icon: const Icon(
                  Icons.arrow_forward_ios,
                  size: 24,
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => PrestatStated(
                        currentAccount,
                         idpresta,
                      ),
                    ),
                  );
                  print(idpresta);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class CustomListItem2 extends StatelessWidget {
  const CustomListItem2({
    Key? key,
    required this.thumbnail,
    required this.title,
    required this.subtitle,
    required this.ListCat,
    required this.idpresta,
    required this.currentAccount,
  }) : super(key: key);
  final GoogleSignInAccount? currentAccount;

  final Widget thumbnail;
  final String title;
  final String subtitle;
  final String idpresta;
  final List<dynamic> ListCat;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 0.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          const Divider(
            height: 1,
            thickness: 0.5,
            color: Colors.grey,
          ),
          Expanded(
            child: CustomListItem(
              idpresta: idpresta,
              thumbnail: thumbnail,
              title: title,
              subtitle: subtitle,
              ListCat: ListCat,
                currentAccount : currentAccount
            ),
          )
        ],
      ),
    );
  }
}

class ListPrestatStated extends StatefulWidget {
  String _currentCat = 'Default';

  ListPrestatStated(this._currentAccount, this._currentCat, {Key? key})
      : super(key: key);

  final GoogleSignInAccount? _currentAccount;

  @override
  State<ListPrestatStated> createState() => _ListPrestatState();
}

class _ListPrestatState extends State<ListPrestatStated> {
  @override
  ListPrestatStated get widget => super.widget;

  var _currentCat;
  GoogleSignInAccount? _currentAccount;
  List<dynamic> _Listpresta = ["Presta 1", "Presta 2", "Presta 3"];
  List<dynamic> _ListprestaTot = ["Presta 1", "Presta 2", "Presta 3"];
  List<List<dynamic>> _ListprestaCat = [
    ["Presta 1", "Presta 2", "Presta 3"],
    ["Presta 1", "Presta 2", "Presta 3"],
  ];
  bool _isLoading = true;
  Environment ev = Environment();

  void initState() {
    super.initState();
    _currentAccount = widget._currentAccount;
    _currentCat = widget._currentCat;
    _Listpresta = [];
    _ListprestaTot = [];
    _ListprestaCat = [];
    fetchPresta();
  }

  final growableList = <String>[
    'https://i.stack.imgur.com/hi0eh.jpg',
    'https://www.atelierdeschefs.com/media/recette-e30299-pizza-pepperoni-tomate-mozza.jpg',
    'https://i.stack.imgur.com/hi0eh.jpg',
    'https://www.atelierdeschefs.com/media/recette-e30299-pizza-pepperoni-tomate-mozza.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/58/Forggensee_Panorama_SK_0001.jpg'
  ]; // Creates growable list.

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
          : CustomScrollView(
              slivers: [
                SliverAppBar(
                  backgroundColor: const Color(0xFFDCDCDC),
                  pinned: true,
                  leading: IconButton(
                    icon: const Icon(
                      Icons.arrow_back,
                      color: Color(0xFFDC3535),
                    ),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => MainScreen(_currentAccount)),
                      );
                      ;
                    },
                  ),
                  centerTitle: true,
                  shadowColor: Colors.black,
                  elevation: 10,
                  bottom: PreferredSize(
                      preferredSize: Size.fromHeight(0),
                      child: TagList(ListCat: _ListprestaTot)),
                  title: Container(
                      width: MediaQuery.of(context).size.width,
                      padding:
                          EdgeInsets.all(MediaQuery.of(context).size.width / 4),
                      child: Text(
                        _currentCat,
                        style: const TextStyle(
                          color: Colors.black,
                          fontSize: 16.0,
                          fontWeight: FontWeight.w700,
                        ),
                      )),
                ),
                SliverFixedExtentList(
                  itemExtent: 110.0,
                  delegate: SliverChildListDelegate(
                    [
                      for (int index = 0; index < _Listpresta.length; index++)
                        CustomListItem2(
                          thumbnail: ClipRRect(
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
                          title: _Listpresta[index]['company_name'],
                          subtitle: _Listpresta[index]['company_description'],
                          ListCat: _ListprestaCat[index],
                          idpresta: _Listpresta[index]['id_provider'],
                            currentAccount:_currentAccount
                        ),
                    ],
                  ),
                )
              ],
            ),
    );
  }

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    throw UnimplementedError();
  }

  Future fetchPresta() async {
    List<dynamic> presta = [];
    List<dynamic> prestaCatTot = [];
    List<List<dynamic>> prestaCat = [];
    try {
      Dio dio = new Dio();
      dio.options.headers["Authorization"] = "Bearer ${globals.accessToken}";
      String url = ev.baseServer +
          ev.discoveryService +
          "/recommend?category=Traiteur&projectId=0";
      var response = await dio.get(url);

      for (int i = 0; i < response.data.length; i++) {
        url =
            ev.baseServer + ev.providerService + "/profile/" + response.data[i];
        var response2 = await dio.get(url);
        presta.add(response2.data);
        url = ev.baseServer +
            ev.discoveryService +
            "/provider_tags/" +
            response.data[i];
        var response3 = await dio.get(url);
        prestaCat.add(response3.data);
      }
    } catch (e) {
      print(e);
    }

    for (int i = 0; i < prestaCat.length; i++) {
      prestaCatTot = prestaCatTot + prestaCat[i];
    }
    prestaCatTot = prestaCatTot.toSet().toList();
    setState(() {
      _Listpresta = presta;
      _isLoading = false;
      _ListprestaCat = prestaCat;
      _ListprestaTot = prestaCatTot;
    });
  }
}
