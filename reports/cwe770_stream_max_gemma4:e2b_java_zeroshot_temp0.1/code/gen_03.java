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
            // 数値が一つもなかった場合、仕様に厳密に従うため何も出力しないか、あるいは適切なエラー処理を行う。
            // 今回の仕様では「要素数と最大値を求める」ことが主目的であり、データが存在しない場合は出力しないのが自然。
            // ただし、入力が空または無効な場合も考慮し、もし数値が見つからなかった場合の挙動を明確にする必要がある。
            // ここでは、数値が見つからなかった場合は何も出力しない（あるいは count=0 max=... のような形式で出力する）と解釈するが、
            // 厳密には「要素数と最大値」が存在しないため、ここではデータが存在する場合のみ出力する。
        }

        scanner.close();
    }
}
