import java.util.Scanner;

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
        boolean foundValidNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈を試みる
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                // 64bit整数の範囲に収まることを確認（Long型なので自動的に保証されるが、念のため）
                // 問題の制約上、Long型で十分処理可能。
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundValidNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (count == 0) {
            // 要素が一つも有効な整数でなかった場合、何も出力しないか、仕様に従う（ここでは0個の要素と最小値を出力）
            // 仕様では「要素数」と「最大値」を求めるため、入力から得られた有効な数値に基づいて計算する。
            // ゼロ個の場合、count=0, maxValue=Long.MIN_VALUE となる。
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
