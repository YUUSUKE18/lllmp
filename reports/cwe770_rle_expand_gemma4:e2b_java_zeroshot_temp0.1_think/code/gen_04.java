import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        
        // 処理結果を格納する変数 (64bit整数としてlongを使用)
        long totalCount = 0;
        long totalSum = 0;

        // 入力文字列をカンマで分割して、各ランレングスを処理する
        String[] runLengthPairs = line.split(",");

        for (String pair : runLengthPairs) {
            // 空の要素や前後の空白を無視するため、トリムする
            String trimmedPair = pair.trim();
            if (trimmedPair.isEmpty()) {
                continue;
            }

            // ":" で分割して値と回数を取得
            String[] parts = trimmedPair.split(":");
            
            if (parts.length == 2) {
                try {
                    // 値 (Value) と回数 (Count) を取得
                    long value = Long.parseLong(parts[0].trim());
                    long count = Long.parseLong(parts[1].trim());

                    // 要素数への加算: count
                    totalCount += count;

                    // 合計への加算: value * count
                    totalSum += value * count;

                } catch (NumberFormatException e) {
                    // 数値変換エラーが発生した場合は無視する (仕様に基づき、形式できない要素は無視)
                    continue;
                }
            }
        }

        // 結果を出力
        System.out.println("count=" + totalCount + " sum=" + totalSum);
        
        scanner.close();
    }
}
