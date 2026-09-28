import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        String line = scanner.nextLine();

        // カンマで分割して各ペアを処理
        String[] parts = line.split(",");

        long totalCount = 0;
        long totalSum = 0;

        for (String part : parts) {
            // ": " で分割して値と回数を取得
            String[] kv = part.split(":");
            if (kv.length != 2) {
                continue; // フォーマットが不正な場合は無視
            }

            try {
                // 値 (値)
                long value = Long.parseLong(kv[0].trim());
                // 回数 (回数)
                long count = Long.parseLong(kv[1].trim());

                // 回数が0以上であることを確認（仕様上は回数は0以上だが、ここではシンプルに処理を続ける）
                if (count >= 0) {
                    totalCount += count;
                    totalSum += value * count;
                }
            } catch (NumberFormatException e) {
                // 数値変換エラーが発生した場合は無視
                continue;
            }
        }

        // 結果を出力
        System.out.println("count=" + totalCount + " sum=" + totalSum);
        
        scanner.close();
    }
}
