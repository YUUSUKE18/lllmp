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
                    // 整数として解釈できない要素は無視
                }
            }
        }

        if (count == 0) {
            // 整数が一つもなかった場合の処理。最大値をどうするか。
            // 問題文の仕様から、もし要素がないなら count=0, maxは未定義だが、ここでは0を出力する。
            // ただし、maxの初期値に依存して意図しない結果になる可能性があるため、
            // 整数が見つからなかった場合は最大値も適切に処理する必要がある。
            // ここでは、要素が一つも存在しなかった場合は count=0, max=0 と仮定する（または最小値）。
            // 例として、もし数がないなら count=0, max=0 と出力する。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
