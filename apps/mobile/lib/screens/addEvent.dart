import 'dart:io';

import 'package:flutter/material.dart';

import 'package:image_picker/image_picker.dart';
import 'package:figma_squircle/figma_squircle.dart';

class AddEvent extends StatefulWidget {
  AddEvent() : super();

  @override
  AddEventState createState() => AddEventState();
}

class AddEventState extends State<AddEvent> {
  XFile? file;
  ImagePicker _picker = ImagePicker();
  String? name;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Column(
        children: [
          Container(
            width: MediaQuery
                .of(context)
                .size
                .width-20,
            height: 250,
            alignment: Alignment.center,
            decoration: getDecoration(),
            child: Container(
              width: 150,
              height: 50,
              decoration: ShapeDecoration(
                color: Colors.black,
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: 10,
                    cornerSmoothing: 0.5,
                  ),
                ),
              ),
              child: MaterialButton(
                onPressed: chooseImage,
                child: const Text(
                  "Choisir une image",
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          ),
          Container(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                const Text("Nom du projet",style: TextStyle(fontWeight: FontWeight.bold),),
                TextField(
                  onChanged : (text) {
                    updateValue(name,text);
                    print(name);
                  },
                )
              ],
            ),
          )
        ],
      ),
    );
  }

  chooseImage() async {
    var file1 = await _picker.pickImage(source: ImageSource.gallery);
    setState(() {
      file = file1;
    });
  }

  ShapeDecoration getDecoration() {
    if (file == null) {
      return ShapeDecoration(
        color: const Color(0xffeeeeee),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 10,
            cornerSmoothing: 0.5,
          ),
        )
      );
    }
    else {
      return ShapeDecoration(
          image: DecorationImage(
            fit: BoxFit.fill,
            image: FileImage(File(file!.path))
          ),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 10,
              cornerSmoothing: 0.5,
            ),
          )
      );
    }
  }


  updateValue(variable,text){
    setState((){
      variable = text;
    });
  }

}
