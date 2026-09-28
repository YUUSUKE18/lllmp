import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割して整数列を取得
        String[] parts = line.split(",");

        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を削除
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) continue;

            try {
                long number = Long.parseLong(trimmedPart);
                count++;
                if (number > max) {
                    max = number;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        if (!foundNumber) {
            // 有効な整数が一つも見つからなかった場合、count=0 max=0 または適切なデフォルト値を設定（ここでは0）
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
