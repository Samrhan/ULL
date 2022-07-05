import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:ULL/main.dart';
import 'package:ULL/screens/bottomNavBar.dart';
import 'package:ULL/services/authentication.dart';

class Profile extends StatelessWidget {
  Profile(GoogleSignInAccount? _currentAccount, {Key? key}) : super(key: key) {
    this._currentAccount = _currentAccount;
    super.key;
  }

  GoogleSignInAccount? _currentAccount;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [

          _buildHandle(context),

          Container(
            padding: const EdgeInsets.symmetric(
              horizontal: 24.0,
              vertical: 12.0,
            ),
            decoration: const BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: Colors.grey,
                  width: 0.5,
                ),
              ),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.max,
              children:  const [

                Text(
                  'Votre Compte',
                  textAlign: TextAlign.right,
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Color(0xff832232),
                      fontSize: 15),
                )
              ],
            ),
          ),
          Text(
            getProfileemail(),
            style: const TextStyle(fontSize: 15),
          ),
          _buildListItem(
            context,
            title: 'Votre Facture',
          ),
          _buildListItem(
            context,
          ),
          _buildListItem(
            context,
            title: 'Vos Information',
          ),
          _buildListItem(
            context,
            title: 'Mode de paiement',
          ),
          _buildListItem(
            context,
            title: 'Notification',
          ),
          _buildListItem(
            context,
          ),
          _buildListItem(
            context,
            title: 'Bons de réduction et crédits',
          ),
          _buildListItem(
            context,
            title: 'Inviter des amies',
          ),
          _buildListItem(
            context,
          ),
          _buildListItem(
            context,
            title: 'FAQ',
          ),
          _buildListItem(
            context,
            title: 'A propos',
          ),
          _buildListItem(
            context,
            title: 'Déconnexion',
          ),
        ],
      ),
    );
  }

  Widget _buildHandle(BuildContext context) {
    return FractionallySizedBox(
        widthFactor: 0.25,
        child: Column(
          children: [
            Container(
              margin: const EdgeInsets.symmetric(
                vertical: 12.0,
              ),
              child: Container(
                height: 4.0,
                decoration: const BoxDecoration(
                  color: Colors.grey,
                  borderRadius: BorderRadius.all(Radius.circular(2.5)),
                ),
              ),
            ),
          ],
        ));
  }

  Widget _buildHandle2(BuildContext context) {
    return Container(
        decoration: const BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: Colors.black,
              width: 0.5,
            ),
          ),
        ),
        child: Column(
          children: [
            _buildHandle(context),
            const Text(
              'Votre Compte',
              textAlign: TextAlign.right,
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Color(0xff832232),
                  fontSize: 15),
            )
          ],
        ));
  }

  getProfileemail() {
    return _currentAccount?.email;
  }
}

Widget _buildListItem(
  BuildContext context, {
  String? title,
}) {
  return Container(
    padding: const EdgeInsets.symmetric(
      horizontal: 24.0,
      vertical: 12.0,
    ),
    decoration: const BoxDecoration(
      border: Border(
        bottom: BorderSide(
          color: Colors.grey,
          width: 0.5,
        ),
      ),
    ),
    child: Row(
      mainAxisSize: MainAxisSize.max,
      children: [
        if (title != null)
          Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: 16.0,
              ),
              child: Text(title)),
        const Spacer(),
        if (title != null) const Icon(Icons.arrow_forward_ios),
      ],
    ),
  );



}
