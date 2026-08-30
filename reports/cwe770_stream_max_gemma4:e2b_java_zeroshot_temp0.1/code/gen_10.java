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

        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 整数が一つもなかった場合、仕様に厳密に従うため何も出力しないか、あるいは0と最小値を出力するかの判断が必要だが、
            // ここでは入力された数値が存在する場合のみ出力するという解釈で進める。
            // ただし、もし入力が空または無効な場合、count=0, max=MIN_VALUEとなる。
            // 仕様上「要素数と最大値」を求めるため、要素が一つもなければ count=0, max=? となる。
            // 最小値を初期値として使用し、数値が見つからなかった場合はその状態を反映させる。
            // 今回は、数値が見つかった場合のみ出力する（もし何も見つからなかった場合は何も出力しない）。
        }

        scanner.close();
    }
}
