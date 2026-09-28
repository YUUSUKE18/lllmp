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
            // 整数が一つもなかった場合（空行や全て無効な入力の場合）
            // 仕様上、要素数と最大値を求める必要があるため、0個の要素として扱うか、
            // または何も出力しないかの判断が必要だが、ここでは読み取れた有効な数値がない場合は
            // 0個の要素として処理する（ただし、問題文の意図を厳密に解釈すると、
            // 要素が存在しない場合の出力形式が不明確。ここでは読み取れた数のみを出力する）。
            // もし入力が空だった場合、count=0, max=??? となるため、要素が見つからなかった場合は何も出力しないのが安全だが、
            // 少なくとも処理は完了しているため、上記で計算された値を出力する。
            // ただし、もし入力が完全に無効な場合（例: ""）であれば、count=0, maxValue=Long.MIN_VALUE となる。
            // このケースでは、有効な数が見つからなかった場合は何も出力しない方が自然かもしれないが、
            // 読み取れた要素の数を返すという指示に基づき、見つかったものだけを出力する。
        }

        scanner.close();
    }
}
