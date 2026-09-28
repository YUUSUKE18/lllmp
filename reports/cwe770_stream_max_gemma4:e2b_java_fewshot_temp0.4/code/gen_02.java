import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;

        if (line != null) {
            // カンマで分割
            String[] parts = line.split(",");
            for (String part : parts) {
                // 前後の空白をトリム
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        // 64bit整数として解釈
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            }
        }

        // 空要素・前後の空白は無視し、整数として解釈できない要素も無視した上で、
        // 有効な整数のみを数え、最大値を求める。
        // 仕様では「カンマ区切りの整数列を受け取る」とあるため、ここでは読み込んだ有効な整数数をカウントする。

        // 読み込んだ要素の総数（空でないもの）と最大値を計算し直す方がより厳密かもしれないが、
        // 例2の動作を参考に、入力されたカンマ区切りの要素のうち、有効な整数として処理できたものをカウントする。
        // 仕様：「それらの『要素数』と『最大値』を求めます。」

        // 再度、よりシンプルに「有効な整数」の数を数える方法を採用し、最大値を求める。
        count = 0;
        max = Long.MIN_VALUE;

        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
