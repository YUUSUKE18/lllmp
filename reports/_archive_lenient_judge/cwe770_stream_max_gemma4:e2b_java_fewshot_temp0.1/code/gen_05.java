import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;

        if (line != null) {
            // カンマで分割し、各要素を処理する
            String[] parts = line.split(",");
            for (String part : parts) {
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

        // 空要素や非数値要素を無視した後のカウントと最大値を計算する。
        // 仕様では「空でない語の数」と「最大値」を求めるため、上記ループで集計したものを利用する。
        // ただし、元の入力がカンマ区切りの整数列であるという前提に基づき、
        // 実際に読み込んだ有効な整数の数をカウントし、その最大値を求める。

        // 再度、より厳密に「要素数」と「最大値」を計算するロジックを適用する（例1, 2の形式を踏襲）
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

        // countとmaxを出力
        System.out.println("count=" + count + " max=" + max);
    }
}
