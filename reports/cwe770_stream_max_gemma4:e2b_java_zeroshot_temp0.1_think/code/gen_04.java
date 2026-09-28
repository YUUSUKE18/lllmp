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
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            // 前後の空白を削除
            String trimmedToken = token.trim();

            if (trimmedToken.isEmpty()) {
                continue; // 空要素は無視
            }

            try {
                // 整数として解析を試みる
                long value = Long.parseLong(trimmedToken);
                
                // 有効な整数としてカウントと最大値を更新
                count++;
                if (value > max) {
                    max = value;
                }
                foundNumber = true;

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        // 要素が一つもなかった場合（入力が全て無効な場合）の処理
        if (!foundNumber) {
            // 仕様上、要素が0個の場合の最大値の定義は曖昧だが、
            // 0個の要素に対しては count=0, max=0 とするのが自然。
            System.out.println("count=0 max=0");
        } else {
            // 結果を出力
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
