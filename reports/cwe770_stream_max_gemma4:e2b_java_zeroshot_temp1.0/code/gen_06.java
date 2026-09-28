import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // カンマで分割して文字列の配列を得る
            String[] parts = line.split(",");

            long count = 0;
            long maxValue = Long.MIN_VALUE;
            boolean foundNumber = false;

            for (String part : parts) {
                // 前後の空白を削除
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue;
                }

                try {
                    // 整数に変換を試みる
                    long number = Long.parseLong(trimmedPart);
                    foundNumber = true;
                    
                    // 要素数をカウント
                    count++;
                    
                    // 最大値を更新
                    if (number > maxValue) {
                        maxValue = number;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視する
                    continue;
                }
            }

            if (foundNumber) {
                // 結果を出力
                System.out.println("count=" + count + " max=" + maxValue);
            }
        }
        scanner.close();
    }
}
