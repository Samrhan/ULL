import 'package:flutter/material.dart';
import 'package:ULL/screens/mainFavorite.dart';
import 'package:ULL/screens/mainScreen.dart';
import 'package:ULL/screens/mainEvent.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:ULL/screens/message.dart';



class BottomNavBar extends StatelessWidget{

  BottomNavBar(int index,GoogleSignInAccount? _currentAccount, {super.key}){
    this._currentAccount = _currentAccount;
    super.key;
    _currentIndex = index;
  }

  GoogleSignInAccount? _currentAccount;
  int _currentIndex=0;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      items: const [
        BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Parcourir'
        ),
        BottomNavigationBarItem(
            icon: Icon(Icons.calendar_month),
            label: 'Événement'
        ),
        BottomNavigationBarItem(
            icon: Icon(Icons.favorite_border),
            label: 'Favoris'
        ),
        BottomNavigationBarItem(
            icon: Icon(Icons.message),
            label: 'Messages'
        ),
      ],
      selectedItemColor: const Color(0xffE94B64),
      unselectedItemColor: Colors.grey,
      showUnselectedLabels: true,
      currentIndex: _currentIndex,
      onTap: (int index){
        if(index==0){ //événement
          Navigator.push(
            context,
            PageRouteBuilder(
              pageBuilder: (context,a1,a2) => MainScreen(_currentAccount),
              transitionsBuilder : (context,anim,a2,child) => FadeTransition(opacity: anim, child: child),
              transitionDuration: const Duration(milliseconds: 0),
            ),
          );
        }
        if(index==1){ //événement
          Navigator.push(
            context,
            PageRouteBuilder(
              pageBuilder: (context,a1,a2) => MainEvent(_currentAccount),
              transitionsBuilder : (context,anim,a2,child) => FadeTransition(opacity: anim, child: child),
              transitionDuration: const Duration(milliseconds: 0)
            ),
          );
        }
        if(index==2){//favoris
          Navigator.push(
            context,
            PageRouteBuilder(
              pageBuilder: (context,a1,a2) => MainFavorite(_currentAccount),
              transitionsBuilder : (context,anim,a2,child) => FadeTransition(opacity: anim, child: child),
              transitionDuration: const Duration(milliseconds: 0),
            ),
          );
        }
        if(index==3){//messages
          Navigator.push(
            context,
            PageRouteBuilder(
              pageBuilder: (context,a1,a2) => MessageScreen(_currentAccount),
              transitionsBuilder : (context,anim,a2,child) => FadeTransition(opacity: anim, child: child),
              transitionDuration: const Duration(milliseconds: 0),
            ),
          );
        }
      },
    );
  }
}
