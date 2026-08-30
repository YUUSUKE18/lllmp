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

        // カンマで区切られた各要素を処理
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

                    // 指定された形式で整数列を生成
                    for (int i = 0; i < count; i++) {
                        totalCount++;
                        totalSum += value;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視する（仕様上、入力形式が保証されていると想定するが安全のため）
                }
            }
        }

        // 結果の出力
        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
