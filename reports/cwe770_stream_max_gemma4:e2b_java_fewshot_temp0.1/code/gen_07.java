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
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        }

        // 空要素や非数値要素を無視した後のカウントと最大値を計算する。
        // 仕様では「空でない語の数」と「最大値」を求めるため、上記ループで集計したものを利用する。
        // ただし、元の入力がカンマ区切りであり、各要素が整数であるという前提に基づき、
        // 実際に読み込んだ有効な整数の数をカウントし、その最大値を求める。

        // 再度、より厳密に「空でない語の数」と「最大値」を計算するロジックを適用する。
        // 上記のループで count と max は既に求まっているが、
        // 課題の要求に合わせて、入力されたカンマ区切りの要素数を再確認し、
        // 整数として有効だったものの数をカウントする必要がある。

        // 再度、よりシンプルに処理を記述する（例2のロジックを参考に）
        count = 0;
        max = Long.MIN_VALUE;

        if (line != null) {
            String[] words = line.split(",");
            for (String w : words) {
                String trimmedW = w.trim();
                if (!trimmedW.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmedW);
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
