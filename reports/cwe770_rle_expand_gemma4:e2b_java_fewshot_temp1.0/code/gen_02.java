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

        // カンマで区切って各要素を処理
        String[] parts = line.split(",");

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            // ":" で分割して値と回数を取得
            String[] kv = trimmedPart.split(":");
            if (kv.length == 2) {
                try {
                    // 値 (値)
                    long value = Long.parseLong(kv[0].trim());
                    // 回数 (回数)
                    long count = Long.parseLong(kv[1].trim());

                    if (count > 0) {
                        // 要素数の計算
                        totalCount += count;
                        // 合計の計算: 値 * 回数
                        totalSum += value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
