import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const Fruits360App());
}

class Fruits360App extends StatelessWidget {
  const Fruits360App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fruits-360 AI',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.green),
        useMaterial3: true,
        textTheme: GoogleFonts.outfitTextTheme(),
      ),
      home: const FruitScannerScreen(),
    );
  }
}
