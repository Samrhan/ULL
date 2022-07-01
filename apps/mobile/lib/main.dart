// Copyright 2013 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// ignore_for_file: public_member_api_docs

import 'dart:async';
import 'dart:convert' show json;

import 'package:flutter/material.dart';
import 'package:ULL/screens/authentication.dart';
import 'package:ULL/screens/mainScreen.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(
    const MaterialApp(
      title: 'ULL',
      home: ULL(),
    ),
  );
}

class ULL extends StatelessWidget {
  const ULL({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home :Scaffold(
        body: ConstrainedBox(
          constraints: const BoxConstraints.expand(),
          child: AuthenticationPage(),
        )
      )

        //home : MainScreen()
    );
  }
}




