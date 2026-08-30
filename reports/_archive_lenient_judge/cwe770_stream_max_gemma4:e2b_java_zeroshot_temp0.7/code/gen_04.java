import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、前後の空白を無視して整数としてパースする
        String[] parts = line.split(",");
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を除去
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                // 64bit整数の範囲に収まることを確認（Long型が自動的にその範囲をカバーする）
                foundNumber = true;
                
                if (count == 0) {
                    count = value;
                    maxValue = value;
                } else {
                    if (value > maxValue) {
                        maxValue = value;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 要素が見つかった場合のみ結果を出力する
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
