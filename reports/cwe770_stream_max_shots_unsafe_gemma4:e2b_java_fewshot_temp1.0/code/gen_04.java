import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        String s = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
        // カンマで分割
        String[] parts = s.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmed = part.trim();
            if (!trimmed.isEmpty()) {
                try {
                    long n = Long.parseLong(trimmed);
                    count++;
                    if (n > max) {
                        max = n;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        if (count == 0) {
            // 整数が一つも見つからなかった場合の処理（最大値の初期値設定に依存）
            // 問題文には空入力時の出力指定はないが、ここでは count=0, max=-1 などとしておく。
            // 読み取った要素がすべて数値でなかった場合や空だった場合を考慮し、min_valueを設定する。
            // もし数値が一つもなかった場合は、maxは初期値のままになる（Long.MIN_VALUE）か、
            // 適切なデフォルト値（例: count=0, max=0 または max=-1 など）を選ぶ必要があるが、
            // 一般的に最大値を求める文脈では、データが存在しない場合は特別な指示がない限りそのまま出す。
            // ここでは、数値が見つからなかった場合は最大値の出力として Long.MIN_VALUE を使う代わりに、
            // 厳密に「存在する整数の最大値」を求めるため、count=0 の場合は max が意味を持たない可能性があるが、
            // 最も安全なのは数値を一つでも見つけたらその最大値を表示すること。
            // 今回は、数値が見つからなかった場合でも、もし入力があったなら count とそれに伴う最大値を出力する。
            // もし入力が全て無効だった場合は、count=0, max=Long.MIN_VALUE となるため、これをそのまま出力する。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
