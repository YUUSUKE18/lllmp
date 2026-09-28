import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        long totalElements = 0;
        long totalSum = 0;

        // カンマで区切って各ランレングスを処理
        String[] parts = line.split(",");

        for (String part : parts) {
            // 空の要素を無視
            if (part.trim().isEmpty()) {
                continue;
            }

            // コロンで値と回数を分離
            String[] kv = part.split(":");
            
            if (kv.length == 2) {
                try {
                    // 値 (Value) と回数 (Count) を取得
                    int value = Integer.parseInt(kv[0].trim());
                    int count = Integer.parseInt(kv[1].trim());

                    // 要素数と合計を計算
                    // 要素数: count を加算
                    totalElements += count;
                    
                    // 合計: value * count を加算
                    totalSum += (long) value * count;

                } catch (NumberFormatException e) {
                    // 数値変換エラーが発生した場合は無視する (仕様に基づき、形式できない要素は無視)
                    continue;
                }
            }
        }

        // 結果を出力
        System.out.println("count=" + totalElements + " sum=" + totalSum);
    }
}
