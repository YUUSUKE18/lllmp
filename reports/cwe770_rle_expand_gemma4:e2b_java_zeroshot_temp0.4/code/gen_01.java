import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        // カンマで分割して個々の要素を取得
        String[] parts = line.split(",");

        long totalCount = 0;
        long totalSum = 0;

        // 各要素を解析
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
                    // 数値変換エラーは無視（仕様上、正しくフォーマットされたもののみ処理）
                }
            }
        }

        // 結果を出力
        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
