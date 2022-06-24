import 'dart:math';

import 'package:flutter/material.dart';
import 'package:ULL/screens/mainFavorite.dart';
import 'package:ULL/screens/mainScreen.dart';
import 'package:ULL/screens/mainEvent.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:ULL/screens/message.dart';

// Bonjour ne posez pas de questions  Merci.
/*
אני לא ממש יודע מה עשיתי, הייתי צריך לקנן דקלאס בשיעורים בשיעורים אחרת זה לא עובד. זה אפילו יותר גרוע מ-CSS.
 */

class TagList extends StatelessWidget {
  const TagList({
    Key? key,
    required this.ListCat,
  }) : super(key: key);

  final String ListCat;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        width: MediaQuery.of(context).size.width - 30,
        height: 20,
        child: ListView(
          scrollDirection: Axis.horizontal,
          shrinkWrap: true,
          children: <Widget>[
            for (int index = 0; index < 50; index++)
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
                            ListCat,
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
  final String ListCat;

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
  }) : super(key: key);

  final Widget thumbnail;
  final String title;
  final String subtitle;
  final String ListCat;

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
                  print("Click");
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class Presta {
  const Presta({
    Key? key,
    required this.thumbnail,
    required this.title,
    required this.subtitle,
    required this.ListCat,
    required this.id,
  }) ;

  final Widget thumbnail;
  final String title;
  final String subtitle;
  final String ListCat;
  final String id;


}


class CustomListItem2 extends StatelessWidget {
  const CustomListItem2({
    Key? key,
    required this.thumbnail,
    required this.title,
    required this.subtitle,
    required this.ListCat,
  }) : super(key: key);

  final Widget thumbnail;
  final String title;
  final String subtitle;
  final String ListCat;




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
              thumbnail: thumbnail,
              title: title,
              subtitle: subtitle,
              ListCat: ListCat,
            ),
          )
        ],
      ),
    );
  }
}


class ListPrestat extends StatelessWidget {
  ListPrestat(String cat, GoogleSignInAccount? _currentAccount, {super.key}) {
    this._currentAccount = _currentAccount;
    super.key;
    _currentCat = cat;
  }

  String _currentCat = 'Default';
  GoogleSignInAccount? _currentAccount;

  final growableList = <String>['https://i.stack.imgur.com/hi0eh.jpg', 'https://www.atelierdeschefs.com/media/recette-e30299-pizza-pepperoni-tomate-mozza.jpg','https://i.stack.imgur.com/hi0eh.jpg', 'https://www.atelierdeschefs.com/media/recette-e30299-pizza-pepperoni-tomate-mozza.jpg','https://upload.wikimedia.org/wikipedia/commons/5/58/Forggensee_Panorama_SK_0001.jpg']; // Creates growable list.

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height   ,
       //   -(MediaQuery.of(context).size.height / 6 + 56),
      child: CustomScrollView(
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
                  MaterialPageRoute(builder: (context) => MainScreen(_currentAccount)),
                );;
              },
            ),
            centerTitle: true,
            shadowColor: Colors.black,
            elevation: 10,
            bottom: const PreferredSize(
                preferredSize: Size.fromHeight(0),
                child: TagList(ListCat: 'brouette')),
            title: Container(
                width: MediaQuery.of(context).size.width,
                padding: EdgeInsets.all(MediaQuery.of(context).size.width / 4),
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
                for (int index = 0; index < 5; index++)
                  CustomListItem2(
                    thumbnail: ClipRRect(
                        borderRadius: BorderRadius.circular(8.0),
                        child: AspectRatio(
                          child: Image.network(
                            growableList[index],
                            width: 100.0,
                            height: 100.0,
                            fit: BoxFit.fill,
                          ),
                          aspectRatio: 1 / 1,
                        )),
                    title: 'Chez Luigi',
                    subtitle: 'Les meilleurs pizza hors d\'italie.',
                    ListCat: 'Food Truck',
                  ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
