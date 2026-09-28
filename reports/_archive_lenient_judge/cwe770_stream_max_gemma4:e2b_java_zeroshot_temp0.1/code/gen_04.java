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
                // 64bit整数の範囲内であるという制約は、Long型で処理することで満たされる
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 数値が一つもなかった場合の処理（仕様上、空の入力や非数値のみの場合を想定）
            // この場合、count=0, max=??? となるが、最大値は定義できないため、ここでは何も出力しないか、
            // ゼロとして扱うのが妥当だが、ここでは読み取った数に基づき出力する。
            // ただし、問題文の意図を厳密に解釈すると、数値が見つからなかった場合は何を出力すべきか不明確。
            // 数値が存在する場合のみ出力するという前提で進める。
        }

        scanner.close();
    }
}
