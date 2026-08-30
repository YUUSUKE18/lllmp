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
        // ここでは、入力されたカンマ区切りの文字列の数ではなく、有効な整数の数をカウントする。
        // 仕様に従い、「空でない語の数」と「最大値」を出力する。

        // 再度、より厳密に要素数をカウントし直す（例2のロジックを参考に）
        int actualCount = 0;
        long calculatedMax = Long.MIN_VALUE;

        if (line != null) {
            String[] partsForCount = line.split(",");
            for (String part : partsForCount) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmedPart);
                        actualCount++;
                        if (n > calculatedMax) {
                            calculatedMax = n;
                        }
                    } catch (NumberFormatException e) {
                        // 無効な要素は無視
                    }
                }
            }
        }

        System.out.println("count=" + actualCount + " max=" + calculatedMax);
    }
}
