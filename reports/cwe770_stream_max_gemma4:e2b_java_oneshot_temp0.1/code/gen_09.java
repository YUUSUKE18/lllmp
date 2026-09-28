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
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                // 64bit整数として解釈
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
            // 有効な整数が一つもなかった場合、count=0, max=0 または適切なデフォルト値を設定する。
            // 仕様上、読み込んだ要素数と最大値を出力する必要があるため、入力されたカンマ区切りの要素数をカウントする。
            // ただし、「整数として解釈できない要素も無視」という指示に基づき、実際にパースできた数のみをカウントするのが自然。
            // ここでは、パースできた数のみをcountとする。もし何もパースできなければ count=0, max=0 とする。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
