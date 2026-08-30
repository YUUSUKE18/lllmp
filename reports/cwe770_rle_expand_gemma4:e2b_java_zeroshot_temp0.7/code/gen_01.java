import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
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
            // "値:回数" の形式で分割
            String[] kv = part.split(":");
            if (kv.length == 2) {
                try {
                    int value = Integer.parseInt(kv[0].trim());
                    int count = Integer.parseInt(kv[1].trim());

                    // 回数が0以上であること、値が正であることは仕様に明記されていないが、
                    // 「値:回数」の形式で解釈できない要素を無視するという指示に基づき、
                    // 形式が正しければ処理する。
                    // 問題文の「値:回数」の形式に解釈できない要素を無視するという指示を厳密に適用する。
                    // ここでは、値と回数が有効な整数である限り処理する。

                    if (count > 0) {
                        totalCount += count;
                        totalSum += (long) value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視する
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
