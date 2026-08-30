import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        String s = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
        // カンマで分割し、前後の空白を考慮して処理する
        String[] parts = s.split(",");
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を除去
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(trimmedPart);
                count++;
                if (n > max) {
                    max = n;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視する
            }
        }

        if (count == 0) {
            // 数値が一つもなかった場合、最大値の初期値を適切に設定する必要があるが、
            // 仕様上は「要素数」と「最大値」を出力するため、カウントが0の場合はmaxをどうするか。
            // ここでは、数値が存在しない場合は count=0, max=0 (または未定義) とする。
            // 読み取った数値がない場合の処理として、count=0, max=0とする。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
