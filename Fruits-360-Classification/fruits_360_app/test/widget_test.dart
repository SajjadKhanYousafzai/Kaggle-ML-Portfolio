import 'package:flutter_test/flutter_test.dart';
import 'package:fruits_360_app/main.dart';

void main() {
  testWidgets('Fruits360App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const Fruits360App());
    expect(find.byType(Fruits360App), findsOneWidget);
  });
}
