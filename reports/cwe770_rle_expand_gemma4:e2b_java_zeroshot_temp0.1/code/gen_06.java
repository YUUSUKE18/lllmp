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

        // カンマで分割して各要素を処理
        String[] parts = line.split(",");

        long totalCount = 0;
        long totalSum = 0;

        for (String part : parts) {
            // "値:回数" の形式にマッチさせる
            Pattern pattern = Pattern.compile("^(\\d+):(\\d+)$");
            Matcher matcher = pattern.matcher(part.trim());

            if (matcher.matches()) {
                try {
                    int value = Integer.parseInt(matcher.group(1));
                    int count = Integer.parseInt(matcher.group(2));

                    // 値が0以上であることを確認（仕様上、回数は0以上）
                    if (value >= 0 && count >= 0) {
                        // 要素数に加算
                        totalCount += count;
                        // 合計に加算 (値 * 回数)
                        totalSum += (long) value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視（仕様上、形式が正しければ発生しないはずだが念のため）
                }
            }
        }

        // 結果を出力
        System.out.println("count=" + totalCount + " sum=" + totalSum);
        
        scanner.close();
    }
}
