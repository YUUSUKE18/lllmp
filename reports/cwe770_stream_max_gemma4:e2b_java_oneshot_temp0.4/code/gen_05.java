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

        // カンマで区切って文字列を分割し、空白や空要素を無視する
        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
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
                // 整数として解釈できない要素は無視する
            }
        }

        if (!foundNumber) {
            // 整数が見つからなかった場合、count=0 max=0 または適切なデフォルト値を設定する。
            // 仕様に基づき、読み込んだ有効な数のみをカウント・最大値とする。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
