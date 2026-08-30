import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String[] parts = line.split(",");
        long totalCount = 0;
        long totalSum = 0;

        for (String part : parts) {
            if (part.contains(":")) {
                String[] kv = part.split(":");
                if (kv.length == 2) {
                    try {
                        // 値 (value) は無視し、回数 (count) を取得
                        int count = Integer.parseInt(kv[1].trim());
                        if (count >= 0) {
                            totalCount += count;
                            // 値は kv[0] にあるが、ここでは合計を計算する必要がないため無視する
                            // totalSum += (long) Integer.parseInt(kv[0].trim()) * count; // 仕様では「合計」は要素の総和ではなく、列の総和と解釈されるため、ここでは要素の総和を計算する
                        }
                    } catch (NumberFormatException e) {
                        // 数値に変換できない場合は無視
                        continue;
                    }
                }
            }
        }

        // 仕様の解釈:
        // 「7:3,2:2 は 7,7,7,2,2 という整数列を表します。」
        // これは、値:回数 のペアが、その値が回数だけ繰り返されることを意味します。
        // 例: 7:3 は 7 が 3 回繰り返される (7, 7, 7)
        // 2:2 は 2 が 2 回繰り返される (2, 2)
        // したがって、要素数 (count) は回数の合計、合計 (sum) は (値 * 回数) の総和です。

        totalCount = 0;
        totalSum = 0;

        for (String part : parts) {
            if (part.contains(":')) {
                String[] kv = part.split(":");
                if (kv.length == 2) {
                    try {
                        int value = Integer.parseInt(kv[0].trim());
                        int count = Integer.parseInt(kv[1].trim());

                        if (count >= 0) {
                            totalCount += count;
                            totalSum += (long) value * count;
                        }
                    } catch (NumberFormatException e) {
                        // 数値に変換できない場合は無視
                        continue;
                    }
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
