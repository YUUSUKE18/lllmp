import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        String line = scanner.nextLine();

        // カンマで分割し、空白や空文字列を考慮して整数リストを作成する
        String[] parts = line.split(",");
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を除去
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                // 整数として解析を試みる
                long value = Long.parseLong(trimmedPart);
                
                // 要素数をカウント
                count++;
                
                // 最大値を更新
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 要素が見つかった場合のみ結果を出力する。
        // 仕様では「要素数」と「最大値」を求めるため、入力された数値のみを考慮する。
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 入力が空または無効な場合（すべての要素が無視された場合）の処理は仕様に明記されていないが、
            // 厳密には入力から読み取れる数値を基に出力する。ここでは数値が見つかった場合にのみ出力する。
            // ただし、もし入力がカンマ区切りの空文字列のみだった場合、count=0, max=MIN_VALUEとなる。
            // 問題の意図を「有効な整数列から要素数と最大値を求める」と解釈し、有効な数値が見つかれば出力する。
        }
    }
}
