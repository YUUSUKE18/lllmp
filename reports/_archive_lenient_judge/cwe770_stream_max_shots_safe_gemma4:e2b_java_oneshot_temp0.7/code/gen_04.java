import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=-1"); // または適切なデフォルト値。ここでは空入力として0個、最小の64bit値（または-1）とする。
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈を試みる
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > max) {
                    max = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 整数として解釈できた要素のみを数える必要があるため、countの再計算が必要になる場合があるが、
        // 仕様では「カンマ区切りの整数列を受け取る」とあるため、ここでは区切り文字で区切られた要素数を数える。
        // ただし、「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」という指示に基づき、
        // 実際にパースできた有効な整数の個数をカウントする。

        // 再度、有効な数値のみを数え直す（安全のため）
        count = 0;
        max = Long.MIN_VALUE;
        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    long value = Long.parseLong(trimmedPart);
                    count++;
                    if (value > max) {
                        max = value;
                    }
                } catch (NumberFormatException e) {
                    // 無効な数値は無視
                }
            }
        }

        // 0個の要素が読み取れた場合（または全て無効だった場合）の処理。
        // 問題文から「要素数」と「最大値」を求めるため、有効な整数のみを対象とする。
        if (count == 0) {
            // 要素が一つも存在しなかった場合、maxは未定義だが、最小値を設定する
            System.out.println("count=0 max=-1"); // または仕様に依存した適切な値
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
