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

            // 値:回数の形式にマッチさせる
            Pattern pattern = Pattern.compile("(\\d+):(\\d+)");
            Matcher matcher = pattern.matcher(trimmedPair);

            if (matcher.matches()) {
                try {
                    int value = Integer.parseInt(matcher.group(1));
                    int count = Integer.parseInt(matcher.group(2));

                    // 値 * 回数 を計算
                    // 要素数は回数の合計
                    totalCount += count;
                    // 合計は (値 * 回数) の合計
                    totalSum += (long) value * count;

                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視（仕様上、正しくフォーマットされていれば発生しないはずだが念のため）
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
