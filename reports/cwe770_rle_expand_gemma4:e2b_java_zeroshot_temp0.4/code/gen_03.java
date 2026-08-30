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
            // "値:回数" の形式で分割
            String[] kv = part.split(":");
            if (kv.length == 2) {
                try {
                    int value = Integer.parseInt(kv[0].trim());
                    int count = Integer.parseInt(kv[1].trim());

                    // 回数が0以上であること、値が正であること（または0でもカウント対象とする）を考慮し、
                    // 仕様に従い、値:回数 の形式で解釈できるもののみを処理する。
                    // 問題文の例から、値と回数が整数であると仮定し、それらを列として解釈する。

                    // 値が正の値として解釈されると仮定し、その値が '回数' だけ繰り返される。
                    // 例: 7:3 は 7 を 3 回繰り返す (7, 7, 7)
                    for (int i = 0; i < count; i++) {
                        totalCount++;
                        totalSum += value;
                    }

                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視する（仕様に厳密に従うため）
                    continue;
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
