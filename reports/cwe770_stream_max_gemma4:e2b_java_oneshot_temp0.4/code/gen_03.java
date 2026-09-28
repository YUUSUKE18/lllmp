import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割して整数列を取得
        String[] parts = line.split(",");

        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                // 64bit整数として解釈
                long n = Long.parseLong(trimmedPart);
                count++;
                if (n > maxVal) {
                    maxVal = n;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        if (!foundNumber) {
            // 整数が一つもなかった場合、count=0, max=0 または適切なデフォルト値を設定する。
            // 仕様に基づき、入力された有効な数値の数と最大値を計算する。
            // 数値が一つもなかった場合は count=0, max=0 とするのが自然だが、
            // 読み込んだ要素数をそのままカウントする方が意図に近いかもしれない。
            // ここでは、実際にパースできた数の総数を count とする。
             System.out.println("count=" + count + " max=" + (foundNumber ? maxVal : 0));

        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
