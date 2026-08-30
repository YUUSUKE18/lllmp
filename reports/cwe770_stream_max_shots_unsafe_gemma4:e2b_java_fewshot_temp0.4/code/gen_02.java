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
            // 要素が一つも数値でなかった場合、最大値の出力方法を考慮する必要があるが、
            // 仕様上「要素数」と「最大値」を出力するため、ここでは count=0, max=0 などとして扱う。
            // ただし、入力に数値が含まれていれば正しく計算される。
            // 念のため、もし数値が一つもなかった場合は、count=0, maxは初期値のままになるか、
            // または問題の意図に従って適切な値を設定する必要がある。
            // ここでは、数値が存在しない場合は count=0, max=0 とするのが自然と判断する。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
