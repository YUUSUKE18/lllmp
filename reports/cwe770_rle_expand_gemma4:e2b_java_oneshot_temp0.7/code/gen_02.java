import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        long totalCount = 0;
        long totalSum = 0;

        // カンマで区切って各ペアを処理
        String[] pairs = line.split(",");

        for (String pair : pairs) {
            String trimmedPair = pair.trim();
            if (trimmedPair.isEmpty()) continue;

            // 値:回数の形式をパース
            String[] parts = trimmedPair.split(":");
            if (parts.length != 2) {
                continue; // 形式が不正な場合は無視
            }

            try {
                // 値 (Value)
                int value = Integer.parseInt(parts[0].trim());
                // 回数 (Count)
                int count = Integer.parseInt(parts[1].trim());

                if (count > 0) {
                    // 要素数に加算
                    totalCount += count;
                    // 合計に加算 (値 * 回数)
                    totalSum += (long) value * count;
                }
            } catch (NumberFormatException e) {
                // 数値変換エラーの場合は無視
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
