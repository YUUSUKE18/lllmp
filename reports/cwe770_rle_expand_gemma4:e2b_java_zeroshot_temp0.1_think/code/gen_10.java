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

        // カンマで区切って各ランレングスを処理する
        String[] parts = line.split(",");

        for (String part : parts) {
            // 前後の空白を削除
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            // コロンで分割
            String[] keyValue = trimmedPart.split(":");

            if (keyValue.length == 2) {
                try {
                    // 値 (Value) と回数 (Count) を取得
                    // 値は要素の値、回数はその要素の出現回数
                    long value = Long.parseLong(keyValue[0].trim());
                    long count = Long.parseLong(keyValue[1].trim());

                    // 回数が0以上であることを確認 (仕様上は回数は0以上)
                    if (count >= 0) {
                        totalCount += count;
                        totalSum += value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーが発生した場合は無視する
                    // 仕様上、値と回数は整数であると想定される
                }
            }
        }

        // 結果を出力
        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
