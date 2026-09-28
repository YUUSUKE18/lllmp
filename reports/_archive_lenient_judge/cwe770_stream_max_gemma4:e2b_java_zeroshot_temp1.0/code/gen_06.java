import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、各要素を処理する
        String[] parts = line.split(",");
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白をトリム
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                // 整数として解釈を試みる
                long value = Long.parseLong(trimmedPart);
                
                // 要素数をカウント
                count++;
                
                // 最大値を更新
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 処理した数値が存在する場合のみ結果を出力する
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
