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

            // 値:回数 の形式でパース
            String[] parts = trimmedPair.split(":");
            if (parts.length == 2) {
                try {
                    // 値 (Value)
                    long value = Long.parseLong(parts[0].trim());
                    // 回数 (Count)
                    long count = Long.parseLong(parts[1].trim());

                    if (count > 0) {
                        totalCount += count;
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
