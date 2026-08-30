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
                        // 64bit整数としてパース
                        long n = Long.parseLong(trimmedPart);

                        // 要素数をカウント
                        count++;

                        // 最大値を更新
                        if (n > max) {
                            max = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        }

        // 結果を出力
        System.out.println("count=" + count + " max=" + max);
    }
}
