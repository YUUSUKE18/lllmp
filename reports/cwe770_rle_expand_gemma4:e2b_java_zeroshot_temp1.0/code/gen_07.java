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

        // カンマで区切って各要素を分割
        String[] parts = line.split(",");

        long totalCount = 0;
        long totalSum = 0;

        // 正規表現パターン: 値:回数 の形式をチェック
        Pattern pattern = Pattern.compile("^(\\d+):(\\d+)$");

        for (String part : parts) {
            // 前後の空白を削除
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            Matcher matcher = pattern.matcher(trimmedPart);
            if (matcher.matches()) {
                try {
                    // グループ1: 値, グループ2: 回数
                    int value = Integer.parseInt(matcher.group(1));
                    int count = Integer.parseInt(matcher.group(2));

                    // 値を count 回加算
                    totalSum += (long) value * count;
                    // 要素数を加算
                    totalCount += count;

                } catch (NumberFormatException e) {
                    // 数値変換エラーが発生した場合は無視
                    continue;
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
