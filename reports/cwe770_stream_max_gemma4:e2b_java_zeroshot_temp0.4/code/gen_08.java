import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        String[] parts = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈できるか試みる
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                // 64bit整数の範囲に収まることを確認（Long型なので自動的に保証されるが、念のため）
                if (value >= Long.MIN_VALUE && value <= Long.MAX_VALUE) {
                    count++;
                    if (value > maxValue) {
                        maxValue = value;
                    }
                    foundNumber = true;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 整数が一つもなかった場合、仕様に厳密に従うため何も出力しないか、あるいは適切なエラー処理を行う。
            // 仕様には「要素数と最大値を求める」とあるため、データが存在しない場合は何を出力すべきか明確ではないが、
            // データが存在しない場合のデフォルトの振る舞いを考慮し、ここではデータが見つからなかった場合は何も出力しない（または0 0など）とする。
            // ただし、入力が空文字列や無効な値のみの場合、count=0 max=MIN_VALUEとなるため、そのまま出力する。
             System.out.println("count=0 max=" + Long.MIN_VALUE); // データが存在しない場合の安全策として
        }

        scanner.close();
    }
}
