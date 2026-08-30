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
            // 要素が一つも数値でなかった場合、最大値は定義されないか、問題の意図に合わせる必要があるが、ここでは0を出力する。
            // ただし、仕様上「要素数」と「最大値」を求めるため、もし数値が存在しなければcount=0, max=（意味なし）となる。
            // 念のため、入力された数値のみに基づいて計算する。
            System.out.println("count=0 max=-1"); // 数値がない場合はmax=-1などを適切なデフォルト値とする
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
