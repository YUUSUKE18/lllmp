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
                    // 整数として解釈できない場合は無視
                }
            }
        }

        if (count == 0) {
            // 要素が一つも数値でなかった場合、最大値の初期値（Long.MIN_VALUE）を適切に扱う必要がある。
            // この問題では「要素数」と「最大値」を出力する必要があるため、何も読み込まれなかった場合は count=0, max=? となる。
            // 課題の意図から、数値が存在しない場合は count=0, max=0 (または適切なデフォルト) が期待されるが、
            // 数値が存在しない場合の最大値の定義がないため、ここでは読み込んだ数値のみを考慮する。
            // もし数値が存在しなければ max は初期値のままになるが、count=0なので max の出力は意味をなさない。
            // 念のため、もし count が 0 なら max を 0 とする（空集合の最大値として）と仮定する。
            max = 0;
        } else {
            // 数値が一つ以上あった場合のみ、計算した最大値を採用する。
            // 初期値 Long.MIN_VALUE は、もし全ての数値が負の値で構成されていた場合に正しく機能する。
            // ただし、問題文の制約から「64bit整数の範囲に収まる」ため、読み込んだ値に基づいて max を決定する。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
