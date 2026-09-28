import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割してトークンを取得
        String[] tokens = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            // 前後の空白を削除
            String trimmedToken = token.trim();

            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                // long型として解析を試みる
                long value = Long.parseLong(trimmedToken);
                
                // 有効な整数としてカウントと最大値を更新
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        // 整数が一つもなかった場合、最大値は0とする（または仕様に応じて適切な初期値）
        if (!foundNumber) {
            maxValue = 0;
        }
        
        // 結果を出力
        System.out.println("count=" + count + " max=" + maxValue);
    }
}
