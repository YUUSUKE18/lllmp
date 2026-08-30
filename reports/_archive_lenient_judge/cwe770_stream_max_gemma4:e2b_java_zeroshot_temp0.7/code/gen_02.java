import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        StringTokenizer tokenizer = new StringTokenizer(line);

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundFirst = false;

        while (tokenizer.hasMoreTokens()) {
            try {
                // カンマ区切りの整数を読み込む
                String token = tokenizer.nextToken().trim();
                if (!token.isEmpty()) {
                    long value = Long.parseLong(token);

                    // 要素数をカウント
                    count++;

                    // 最大値を更新
                    if (value > maxValue) {
                        maxValue = value;
                    }
                    foundFirst = true;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 要素が一つもなかった場合は、適切な処理（ここでは最大値が初期値のままになる）
        // 問題の仕様上、入力が空の場合の出力形式についての明示的な指示はないが、
        // 読み取った有効な要素に基づいて計算を行う。もし要素がない場合の特別な要件があれば追加する。

        if (count > 0) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 要素が一つもなかった場合、最大値の定義が曖昧になるが、ここでは数と最大値を出力する。
            // 全ての要素を無視した場合、個数は0、最大値は初期値（Long.MIN_VALUE）となる。
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }

        scanner.close();
    }
}
