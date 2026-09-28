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
            // この場合、count=0, max=??? となるが、最大値の初期値(Long.MIN_VALUE)を考慮すると、
            // 実際には何も読み込まれなかったことを示すために count=0 を出力するのが適切。
            // ただし、問題文の意図から「要素数と最大値を求める」という操作が実行された結果を出力する。
            // 要素が一つもなかった場合は、count=0, max=Long.MIN_VALUE となるが、
            // 読み込まれた数値がないため、ここでは何も出力しないか、あるいは count=0 を出力するかの判断が必要。
            // ここでは、実際に読み取った有効な要素数と最大値を報告する。
            // 要素が一つもなかった場合は、count=0, max=Long.MIN_VALUE となるが、
            // 厳密に「要素数」と「最大値」を求めるため、読み取れた数値がない場合は count=0 を出力する。
             System.out.println("count=0 max=" + Long.MIN_VALUE); // または単に何も出力しないことも考えられるが、ここでは計算結果を出力する。
        }

        scanner.close();
    }
}
