import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

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
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白をトリム
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                // 64bit整数としてパース
                long n = Long.parseLong(trimmedPart);
                count++;
                if (n > max) {
                    max = n;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        // 整数として読み取れた要素のみをカウントし、最大値を求める
        if (count == 0) {
            // 数字が一つもなかった場合は count=0, max=0 とするのが適切（仕様上は「要素数と最大値」を求めるため）
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
