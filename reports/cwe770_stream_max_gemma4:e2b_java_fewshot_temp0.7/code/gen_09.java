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
                        // 整数として解釈できない要素は無視する
                    }
                }
            }
        }

        // 空要素や非数値要素を無視した後の、有効な整数の個数と最大値を計算する。
        // ただし、課題の要求は「読み込んだカンマ区切りの整数列」からカウントと最大値を求めることなので、
        // 読み込んだすべての有効な整数に対してカウントを行い、その最大値を求めるのが適切である。

        // 再度、より厳密に「要素数」と「最大値」を求めるロジックを適用する（例1, 例2の処理方法を参考に）

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
                        // 整数として解釈できない要素は無視する
                    }
                }
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
