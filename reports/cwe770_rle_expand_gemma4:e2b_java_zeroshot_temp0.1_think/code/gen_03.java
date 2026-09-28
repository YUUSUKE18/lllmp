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

        long totalCount = 0;
        long totalSum = 0;

        // カンマで区切って各ランレングスペアを処理する
        String[] pairs = line.split(",");

        for (String pair : pairs) {
            // コロンで値と回数を分割する
            String[] parts = pair.split(":");

            // 形式が「値:回数」であるか確認する
            if (parts.length == 2) {
                try {
                    // 値と回数をlong型としてパースする
                    long value = Long.parseLong(parts[0].trim());
                    long count = Long.parseLong(parts[1].trim());

                    // 要素数と合計を計算する
                    totalCount += count;
                    totalSum += value * count;

                } catch (NumberFormatException e) {
                    // 数値変換エラーが発生した場合は無視する
                    continue;
                }
            }
        }

        // 結果を出力する
        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
