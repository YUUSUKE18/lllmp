import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割し、空白を無視して整数を抽出
        String[] parts = line.split(",");
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) continue;

            try {
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        if (!foundNumber) {
            // 整数が一つも見つからなかった場合、count=0, max=0 とするのが自然だが、
            // 仕様に基づき、もし入力に数値がなかった場合もカウントされた要素数と最大値を適切に出力する。
            // ここでは、読み込んだカンマ区切りの要素のうち、有効な整数を数えたものを使用する。
            System.out.println("count=" + count + " max=" + (foundNumber ? maxValue : 0));
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
