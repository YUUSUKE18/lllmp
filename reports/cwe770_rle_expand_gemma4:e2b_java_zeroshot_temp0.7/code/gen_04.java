import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            String line = br.readLine();

            if (line == null || line.isEmpty()) {
                System.out.println("count=0 sum=0");
                return;
            }

            // カンマで分割して各部分を処理
            String[] parts = line.split(",");

            long totalCount = 0;
            long totalSum = 0;

            for (String part : parts) {
                // 値と回数をコロンで分割
                String[] kv = part.split(":");

                if (kv.length == 2) {
                    try {
                        // 値を整数として取得
                        int value = Integer.parseInt(kv[0].trim());
                        // 回数を整数として取得
                        int count = Integer.parseInt(kv[1].trim());

                        // 回数が0以上の場合のみ処理
                        if (count >= 0) {
                            // 要素数に加算
                            totalCount += count;
                            // 合計に加算 (値 * 回数)
                            totalSum += (long) value * count;
                        }
                    } catch (NumberFormatException e) {
                        // 数値変換エラーが発生した場合は無視
                        continue;
                    }
                }
            }

            // 結果を出力
            System.out.println("count=" + totalCount + " sum=" + totalSum);

        } catch (IOException e) {
            // 入力エラーが発生した場合
            // この問題の制約上、通常は発生しないが、安全のため
            // System.err.println("Error reading input: " + e.getMessage());
        }
    }
}
