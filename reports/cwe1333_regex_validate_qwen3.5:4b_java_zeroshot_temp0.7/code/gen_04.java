import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = reader.readLine()) != null) {
            if (isCorrectFormat(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }

    private static boolean isCorrectFormat(String line) {
        // 前後の空白を除去し、空行チェック
        String trimmedLine = line.trim();
        if (trimmedLine.isEmpty()) {
            return false;
        }

        // 正規表現で整数列とカンマのみであることを判定
        // ^: 開始
        // [\d,]+: 1 個以上の数字またはカンマの連続
        // $: 終了
        // 注意：末尾のカンマは許容されるが、文字そのものは禁止。
        // 正規表現で「数字またはカンマのみ」かつ「空でない」という条件を適用する。
        return trimmedLine.matches("[\\d,]+");
    }
}
