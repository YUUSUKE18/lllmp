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
                // 64bit整数の範囲内であることはLong型で保証されるため、ここでは値の更新のみ行う
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

        // 要素が一つもなかった場合は、count=0, max=適切な値（ここではLong.MIN_VALUEを保持）を出力するか、仕様に従う。
        // 仕様では「要素数」と「最大値」を求めるため、読み取れた有効な数値のみを考慮する。
        if (!foundNumber) {
            // 読み取れた整数が一つもなかった場合、count=0, max=?。
            // この場合、最大値は定義できないため、ここでは count=0 とし、max は初期値のままにするか、あるいは問題文の意図を再解釈する必要がある。
            // 通常、要素がない場合は最大値は未定義だが、ここでは読み取れた数値のみを対象とする。
            // 読み取れた数値がゼロ個の場合、count=0, max=Long.MIN_VALUE となる。
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
