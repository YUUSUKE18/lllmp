import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        String s = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
        String[] parts = s.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String w : parts) {
            String trimmedW = w.trim();
            if (!trimmedW.isEmpty()) {
                try {
                    long n = Long.parseLong(trimmedW);
                    count++;
                    if (n > max) {
                        max = n;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        if (count == 0) {
            // 数値が存在しない場合（全て無視された場合）、maxの初期値や挙動を考慮する必要があるが、
            // 仕様上は「空でない語の数」と「最大値」を出力する。もし要素が一つも数値でなかった場合は max が未定義になるため、
            // 適切な初期値を設定して出力する。（今回は数値を読み取った場合にのみ意味のある結果が得られる）
            // ただし、全ての入力が無視された場合、count=0, max=Long.MIN_VALUE のまま出力される。
        }

        System.out.println("count=" + count + " max=" + (count == 0 ? "N/A" : max));
    }
}
