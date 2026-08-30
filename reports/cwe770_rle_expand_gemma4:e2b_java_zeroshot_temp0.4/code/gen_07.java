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
                            // 値が不明なため、この仕様では値は無視されると解釈する。
                            // 仕様では「値:回数」を受け取り、それを整数列に変換する。
                            // 例: 7:3,2:2 は 7,7,7,2,2
                            // これは、値が繰り返されることを意味する。
                            // 7:3 は 7 が 3 回繰り返される (7, 7, 7)
                            // 2:2 は 2 が 2 回繰り返される (2, 2)
                            
                            // 実際の要素列を構築する
                            for (int i = 0; i < count; i++) {
                                totalSum += (long) (Integer.parseInt(kv[0].trim()));
                            }
                        }
                    } catch (NumberFormatException e) {
                        // 数値変換エラーは無視
                    }
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
