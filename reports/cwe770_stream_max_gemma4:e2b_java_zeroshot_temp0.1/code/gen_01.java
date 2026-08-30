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
            // または count=0, max=Long.MIN_VALUE のように扱うのが妥当だが、
            // 厳密に「要素数と最大値」を求めるので、数値が存在しない場合はcount=0で終了する。
            // ただし、問題文の意図から、数値が見つかった場合にのみ出力すると解釈する。
        }

        scanner.close();
    }
}
