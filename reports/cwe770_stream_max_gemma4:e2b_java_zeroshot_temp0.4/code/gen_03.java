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
                // 64bit整数の範囲内であることを確認（Long型なので自動的に対応しているが、念のため）
                // 仕様上は「値は64bit整数の範囲に収まる」とあるため、Longで十分。

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

        // 要素が見つかった場合のみ結果を出力する（仕様上、入力が空でも処理を続ける必要があるが、
        // 意味のあるデータがない場合は count=0, max=MIN_VALUE などになる。ここでは見つかったものだけをカウントする）
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 入力が空または数値が一つもなかった場合、0個と適切な最大値を設定する。
            // 厳密には「要素数」と「最大値」を求めるため、データがない場合は0, 最小値（あるいは未定義）とする。
            // ここでは、入力された有効な数のセットに基づいて計算した結果を出力する。
            // データが一つもなかった場合、count=0, max=Long.MIN_VALUE となる。
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }

        scanner.close();
    }
}
