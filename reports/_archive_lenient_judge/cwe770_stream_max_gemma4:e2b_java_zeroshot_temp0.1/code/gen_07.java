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
                // 仕様上は値が64bitに収まることが前提だが、ここでは読み取った値をそのまま使う。

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
            // ただし、入力が空または非数値のみの場合、count=0, max=??? となる。
            // 厳密には「整数として解釈できない要素も無視する」ため、有効な整数が一つもない場合は何も出力しないのが自然だが、
            // ここでは読み取った数値を基に出力する。もし入力が完全に無効なら、count=0, max=Long.MIN_VALUEとなる。
            // 仕様に従い、見つかった要素があれば出力する。
        }

        scanner.close();
    }
}
