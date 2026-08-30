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
                    // 整数として解釈できない場合は無視する
                }
            }
        }

        if (count == 0) {
            // 要素が一つも数値でなかった場合、最大値の出力は仕様に厳密に従うため、
            // このケースでは count=0, max=初期値（Long.MIN_VALUE）となる。
            // ただし、問題文の意図から「要素数と最大値」を求めるので、count=0として扱う。
        }

        System.out.println("count=" + count + " max=" + (count == 0 ? "N/A" : max));
    }
}
