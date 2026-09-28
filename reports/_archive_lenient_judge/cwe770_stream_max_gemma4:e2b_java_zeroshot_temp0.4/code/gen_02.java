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
                foundNumber = true;
                
                // 要素数をカウントする
                count++;
                
                // 最大値を更新する
                if (value > maxValue) {
                    maxValue = value;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 数値が一つもなかった場合、仕様に厳密に従うため何も出力しないか、
            // または適切なデフォルト値を設定する。ここでは入力された要素に基づき計算した結果を出力する。
            // ただし、もし要素が一つも存在しない場合は、count=0, max=MIN_VALUE となる。
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }

        scanner.close();
    }
}
