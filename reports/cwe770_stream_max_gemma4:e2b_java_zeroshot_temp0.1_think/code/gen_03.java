import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割してトークンを取得
        String[] tokens = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundValidNumber = false;

        for (String token : tokens) {
            // トークンから前後の空白を削除
            String trimmedToken = token.trim();

            if (trimmedToken.isEmpty()) {
                continue; // 空要素は無視
            }

            try {
                // longとしてパースを試みる
                long value = Long.parseLong(trimmedToken);
                
                // 有効な整数としてカウントと最大値を更新
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundValidNumber = true;

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        // 有効な要素が見つからなかった場合（入力が全て無効な場合）の処理
        if (!foundValidNumber) {
            // 仕様上、要素数と最大値を求めるため、要素が0個の場合はcount=0, max=0とするのが自然だが、
            // 最小値の初期値(Long.MIN_VALUE)をそのまま出力すると不適切になるため、
            // 0個の場合はcount=0, max=0として扱う。
            System.out.println("count=0 max=0");
        } else {
            // 結果を出力
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
