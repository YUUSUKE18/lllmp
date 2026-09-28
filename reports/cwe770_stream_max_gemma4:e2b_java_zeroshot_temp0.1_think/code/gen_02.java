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
        // 最大値を格納するための初期値。負の数も考慮するため、最小値で初期化する。
        // ただし、要素が存在しない場合は、最大値の出力が意味を持たないため、
        // 0で初期化し、要素が見つかった場合にのみ更新する戦略をとる。
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
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 有効な要素が見つかった場合のみ、最大値を設定する
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 有効な要素が一つもなかった場合
            System.out.println("count=0 max=0");
        }
    }
}
