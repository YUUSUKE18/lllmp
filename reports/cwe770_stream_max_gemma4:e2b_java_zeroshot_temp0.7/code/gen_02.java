import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        // カンマで区切られた文字列をトークンに分割
        String[] tokens = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            // 前後の空白を無視して整数として解釈可能かチェック
            if (token.trim().isEmpty()) {
                continue;
            }

            try {
                // 整数に変換
                long value = Long.parseLong(token.trim());
                
                // 要素数をカウント
                count++;
                
                // 最大値を更新
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        // 要素が見つかった場合のみ結果を出力
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
