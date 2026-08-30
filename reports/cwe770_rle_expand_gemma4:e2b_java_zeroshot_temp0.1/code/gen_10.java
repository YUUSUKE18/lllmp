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

        // カンマで区切って各要素を分割
        String[] parts = line.split(",");

        long totalCount = 0;
        long totalSum = 0;

        for (String part : parts) {
            // "値:回数" の形式にマッチさせる
            Pattern pattern = Pattern.compile("^(\\d+):(\\d+)$");
            Matcher matcher = pattern.matcher(part.trim());

            if (matcher.matches()) {
                try {
                    // 値と回数を抽出
                    int value = Integer.parseInt(matcher.group(1));
                    int count = Integer.parseInt(matcher.group(2));

                    // 抽出した値と回数に基づいて合計と要素数を計算
                    // この列は「値」が「回数」だけ繰り返されることを意味する
                    totalCount += count;
                    totalSum += (long) value * count;

                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視する（仕様上、値と回数は整数であると想定される）
                }
            }
        }

        // 結果を出力
        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
