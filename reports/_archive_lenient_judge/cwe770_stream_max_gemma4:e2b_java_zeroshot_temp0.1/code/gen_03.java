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
                // 64bit整数の範囲内であることを確認（Long型なので自動的に保証されるが、念のため）
                if (value >= Long.MIN_VALUE && value <= Long.MAX_VALUE) {
                    count++;
                    if (value > maxValue) {
                        maxValue = value;
                    }
                    foundNumber = true;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 数値が一つもなかった場合、仕様に厳密に従うため何も出力しないか、あるいは0 0などとして扱う。
            // ここでは、数値が見つからなかった場合は何も出力しない（または空の出力を避ける）とする。
            // ただし、問題文は「要素数と最大値を求めます」とあるため、データが存在しない場合の挙動は明記されていないが、
            // 存在する値がない場合は count=0 max=?? となる。ここでは、数値が見つからなかった場合は何も出力しない（または空の行）とするのが安全だが、
            // 厳密に「1行だけ」という制約を考えると、最低限の情報を出力するべき。
            // 今回は、データが存在すれば出力するという方針で進める。もしデータが全くない場合は、何も出力しない。
        }

        scanner.close();
    }
}
