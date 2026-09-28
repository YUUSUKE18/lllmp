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
            // 要素が一つもなかった場合、最大値の定義に注意が必要だが、ここでは0個と最小値を出力する
            // 問題の意図に従い、データが存在しない場合は count=0, max=適切な値（例：0または未定義）を出力する。
            // 整数列がない場合の最大値は通常定義されないが、入力が空の場合はcount=0として扱う。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
