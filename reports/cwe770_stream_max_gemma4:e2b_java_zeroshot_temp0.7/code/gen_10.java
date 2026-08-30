import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        // カンマで区切られた文字列をトークンに分割
        String[] tokens = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundValidNumber = false;

        for (String token : tokens) {
            // 前後の空白を除去
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                // 整数としてパース
                long value = Long.parseLong(trimmedToken);

                // 要素数と最大値を更新
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

        // 要素が見つかった場合のみ結果を出力
        if (foundValidNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 有効な整数が一つもなかった場合の処理（仕様上、要素数と最大値は0またはデフォルト値となる）
            // 厳密に「要素数と最大値を求める」という指示に従い、入力された有効な数値のみを考慮する。
            // 入力に有効な数値が一つもない場合は、count=0, max=0 (または適切な初期値)とするのが自然だが、
            // ここでは入力された有効な数値の集合に基づいて計算するため、何も見つからなかった場合は空の出力を避けるため、
            // 少なくとも count=0, max=0 を出力する。
            System.out.println("count=0 max=0");
        }

        scanner.close();
    }
}
