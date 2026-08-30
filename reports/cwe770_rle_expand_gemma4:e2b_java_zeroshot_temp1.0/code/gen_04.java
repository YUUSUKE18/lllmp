import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            String line = br.readLine();

            if (line == null || line.isEmpty()) {
                System.out.println("count=0 sum=0");
                return;
            }

            // カンマで区切って個々の要素に分割
            String[] parts = line.split(",");

            long totalCount = 0;
            long totalSum = 0;

            for (String part : parts) {
                // 各要素から値と回数を抽出するパターンを定義
                // 例: "7:3"
                Pattern pattern = Pattern.compile("^(\\d+):(\\d+)$");
                Matcher matcher = pattern.matcher(part.trim());

                if (matcher.matches()) {
                    try {
                        int value = Integer.parseInt(matcher.group(1));
                        int count = Integer.parseInt(matcher.group(2));

                        // 回数が0以上の値のみを考慮（仕様上は回数>=0が前提だが、意味のある要素として扱う）
                        if (count >= 0) {
                            totalCount += count;
                            totalSum += (long) value * count;
                        }
                    } catch (NumberFormatException e) {
                        // 数値変換エラーは無視（仕様に基づき、形式に合わないものは無視）
                        continue;
                    }
                }
            }

            System.out.println("count=" + totalCount + " sum=" + totalSum);

        } catch (IOException e) {
            // 入力エラーは無視または適切なエラー処理（ここでは無視）
        }
    }
}
