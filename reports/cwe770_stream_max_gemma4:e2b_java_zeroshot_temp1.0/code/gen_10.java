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
            // 空文字や前後の空白を無視（split(',')で区切られた要素自体が空でないことを確認）
            if (part.trim().isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(part.trim());
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
            // 整数が一つもなかった場合の処理（仕様上、空入力の場合も考慮する必要がある）
            // 空の入力や全て無視された場合、count=0, max=... の形式で出力することが自然だが、
            // 「要素数と最大値を求める」という要求に基づき、実際に読み取れた値に基づいて出力する。
            // 整数が一つもなかった場合は、通常は何も出力しないか、あるいは (count=0 max=?) となる。
            // ここでは、もし数字が1つでも読み取れたなら出力する、という方針で進める。
            // 全く数字がなかった場合は、count=0, maxValue=Long.MIN_VALUE が入るため、
            // 意図的に何もしないか、または count=0 のみを出力する。
            // 今回は読み取れた値があれば出力するという形で実装を進める。
        }

        scanner.close();
    }
}
