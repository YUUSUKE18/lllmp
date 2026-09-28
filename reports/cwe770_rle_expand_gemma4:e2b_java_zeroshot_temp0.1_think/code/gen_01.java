import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        long totalCount = 0;
        long totalSum = 0;

        // カンマで区切って各ランを処理
        String[] runs = line.split(",");

        for (String run : runs) {
            if (run.trim().isEmpty()) {
                continue;
            }
            
            // 値と回数をコロンで分割
            String[] parts = run.split(":");
            
            if (parts.length == 2) {
                try {
                    // 値 (value) と回数 (count) を取得
                    long value = Long.parseLong(parts[0].trim());
                    long count = Long.parseLong(parts[1].trim());

                    // 要素数 (totalCount) の計算: 回数の合計
                    totalCount += count;

                    // 合計 (totalSum) の計算: (値 * 回数) の合計
                    totalSum += value * count;

                } catch (NumberFormatException e) {
                    // 数値変換エラーが発生した場合は無視する
                    continue;
                }
            }
        }

        // 結果を出力
        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
