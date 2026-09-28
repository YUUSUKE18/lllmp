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
        // 64bit整数の最小値で初期化
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            // 前後の空白を削除
            String trimmedToken = token.trim();

            // 空の要素は無視
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                // 整数として解析を試みる
                long value = Long.parseLong(trimmedToken);
                
                // 有効な整数としてカウントと最大値を更新
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        // 整数が一つもなかった場合（空の入力や非数値のみの場合）の処理
        if (!foundNumber) {
            // 仕様上、要素数と最大値を求めるため、要素が0個の場合はcount=0, max=0とするのが自然だが、
            // 厳密には最大値が存在しないため、ここではcount=0, max=0とする。
            // ただし、入力が空の場合はcount=0, max=0が適切。
            System.out.println("count=0 max=0");
        } else {
            // 結果を出力
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
