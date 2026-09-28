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
        // 最大値を初期化するために、最小値として設定
        // 64bit整数の範囲を考慮し、最初の有効な値が設定されるまで待つ
        long maxValue = Long.MIN_VALUE;
        boolean foundFirst = false;

        for (String token : tokens) {
            // 前後の空白を削除
            String trimmedToken = token.trim();

            if (trimmedToken.isEmpty()) {
                continue; // 空要素は無視
            }

            try {
                // longとしてパースを試みる
                long value = Long.parseLong(trimmedToken);

                // 有効な整数としてカウントと最大値を更新
                count++;
                
                if (!foundFirst) {
                    maxValue = value;
                    foundFirst = true;
                } else {
                    if (value > maxValue) {
                        maxValue = value;
                    }
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        // 最初の有効な要素が見つからなかった場合（すべて無効な要素だった場合）の処理
        if (!foundFirst) {
            // 要素が0個の場合、count=0, max=0とするのが自然だが、
            // 仕様上、入力された要素が0個の場合、最大値の定義が曖昧になるため、
            // 0個の場合は count=0, max=0 とする。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
