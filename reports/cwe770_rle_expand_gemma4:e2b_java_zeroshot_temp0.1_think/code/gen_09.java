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

        long totalCount = 0;
        long totalSum = 0;

        // カンマで区切って各要素を処理
        String[] parts = line.split(",");

        for (String part : parts) {
            // 値と回数をコロンで分割
            String[] entry = part.split(":");
            
            if (entry.length == 2) {
                try {
                    // 値 (value) と回数 (count) を取得
                    // 値は要素の値として使用するため long に格納
                    long value = Long.parseLong(entry[0].trim());
                    // 回数は要素の数として使用するため long に格納
                    long count = Long.parseLong(entry[1].trim());

                    // 回数が0以上であることを確認 (仕様上は回数は0以上)
                    if (count >= 0) {
                        totalCount += count;
                        totalSum += value * count;
                    }
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
