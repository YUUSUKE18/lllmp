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
                // 仕様上は値が64bit範囲に収まることが前提だが、ここでは読み込んだ値をそのまま使う。

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
            // 数値が一つもなかった場合、何も出力しない（仕様に明記されていないが、要素がない場合はカウント0, 最大値未定義となるため）
            // ただし、入力が空または非数値のみの場合、count=0, max=MIN_VALUEとなる。
            // ここでは、読み取った有効な数があれば出力する、というロジックを採用する。
        }

        scanner.close();
    }
}
