import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
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

        long totalCount = 0;
        long totalSum = 0;

        // 正規表現で "値:回数" の形式を抽出する
        Pattern pattern = Pattern.compile("(\\d+):(\\d+)");
        Matcher matcher = pattern.matcher(line);

        while (matcher.find()) {
            try {
                int value = Integer.parseInt(matcher.group(1));
                int count = Integer.parseInt(matcher.group(2));

                if (count > 0) {
                    // 要素数に加算
                    totalCount += count;
                    // 合計に加算 (値 * 回数)
                    totalSum += (long) value * count;
                }
            } catch (NumberFormatException e) {
                // 数値変換エラーは無視する（仕様上、形式に合わないものは無視）
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
