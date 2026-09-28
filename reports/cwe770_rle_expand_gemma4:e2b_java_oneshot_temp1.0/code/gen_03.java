import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        long totalCount = 0;
        long totalSum = 0;

        // カンマで区切られた各ペアを処理する
        String[] pairs = line.split(",");

        for (String pair : pairs) {
            // "値:回数" の形式をパース
            String[] parts = pair.trim().split(":");
            if (parts.length != 2) {
                continue; // 形式が不正な場合はスキップ
            }

            try {
                // 値を整数として取得
                int value = Integer.parseInt(parts[0].trim());
                // 回数を整数として取得
                int count = Integer.parseInt(parts[1].trim());

                // 回数が0以上であることを確認（仕様上は回数は0以上だが、念のため）
                if (count >= 0) {
                    // 要素数に加算
                    totalCount += count;
                    // 合計に加算 (value * count)
                    totalSum += (long) value * count;
                }
            } catch (NumberFormatException e) {
                // 数値変換エラーが発生した場合は無視
                continue;
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
