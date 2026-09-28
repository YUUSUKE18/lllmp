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
            // 整数が一つもなかった場合、仕様に厳密に従うため何も出力しないか、または適切なエラー処理を行うが、
            // ここでは入力されたデータから数値を抽出できなかった場合は何も出力しない（または0, MIN_VALUEなど）とする。
            // 仕様では「要素数と最大値」を求めるため、数値が存在しない場合はcount=0, max=MIN_VALUEとなる。
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }

        scanner.close();
    }
}
