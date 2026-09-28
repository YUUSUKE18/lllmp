import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=-1"); // 空入力の場合の適切な処理（最大値は定義がないため-1など）
            return;
        }

        // カンマで区切ってトークンを分割
        String[] tokens = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                // 64bit整数の範囲に収まることを確認
                long value = Long.parseLong(trimmedToken);
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        if (!foundNumber) {
            // 整数が一つも読み取れなかった場合（カンマのみなど）
            System.out.println("count=0 max=-1"); // または適切なデフォルト値
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
