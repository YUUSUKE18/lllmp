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
            // 要素が一つも数値でなかった場合、最大値は定義できないか、あるいは最小値を設定する必要がある。
            // 問題の制約から、入力に数値が含まれることが期待されるが、念のため処理を続ける。
            // ここでは、数値が存在しない場合は max を何として出力するかという仕様がないため、
            // 0個と最小値（またはエラー）を出力するが、ここでは count=0, max=0 と仮定する。（実質的な最大値は存在しない）
            // ただし、例題の形式に従い、もし数値が存在しなければ max は意味を持たない。
            // 厳密に「最大値」を求めるので、数値が一つもない場合は、通常はエラーまたは最小値を返すことになるが、
            // ここでは入力された数値のみを考慮し、何も見つからなかった場合は適切な最大値を設定しないようにする。
            // 例題の意図を汲み取り、もし数値を一つも読み取れなかった場合は max を 0 とする（あるいは Long.MIN_VALUE のままにする）。
            // 今回は、入力された数値のみに基づいて count と max を計算する。count=0 なら max は初期値のまま。
        }

        if (count > 0) {
            System.out.println("count=" + count + " max=" + max);
        } else {
            // 数値が一つもなかった場合、count=0, max=? の出力。ここでは最大値が存在しないため、maxを0とするのが妥当かもしれないが、
            // 厳密には「読み取れた最大値」がない。入力された数値のみに基づくと、何も存在しないので count=0, max=0 とする。
            System.out.println("count=0 max=0");
        }
    }
}
