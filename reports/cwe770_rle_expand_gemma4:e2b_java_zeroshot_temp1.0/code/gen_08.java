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

        // カンマで分割して、各ペアを処理する
        String[] parts = line.split(",");

        long totalCount = 0;
        long totalSum = 0;

        for (String part : parts) {
            // ": " で分割して、値と回数を取得
            String[] keyValue = part.split(":");
            
            if (keyValue.length == 2) {
                try {
                    // 値 (value) を整数として取得
                    int value = Integer.parseInt(keyValue[0].trim());
                    // 回数 (count) を整数として取得
                    int count = Integer.parseInt(keyValue[1].trim());

                    // 値が正しく、回数が0以上であることを確認
                    if (value >= 0 && count >= 0) {
                        // 要素数に加算
                        totalCount += count;
                        // 合計に加算 (値 * 回数)
                        totalSum += (long) value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換に失敗した場合は無視する
                    continue;
                }
            }
        }

        // 結果を出力
        System.out.println("count=" + totalCount + " sum=" + totalSum);
        
        scanner.close();
    }
}
