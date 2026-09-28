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
                foundNumber = true;
                
                // 要素数をカウント
                count++;
                
                // 最大値を更新
                if (value > maxValue) {
                    maxValue = value;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 数値が一つもなかった場合、仕様に厳密に従うため何も出力しないか、
            // または適切なデフォルト値を設定する。ここでは入力された数値に基づいて計算するため、
            // 数値が一つもなかった場合は何も出力しない（または count=0 max=... となるが、
            // 求められているのは「要素数」と「最大値」なので、データがない場合は処理をスキップするのが自然）。
            // ただし、仕様は「要素数と最大値を求める」ことなので、入力された有効な数値に基づいて計算する。
            // 数値が一つもなかった場合、count=0, maxValue=Long.MIN_VALUE となるが、
            // 厳密に「整数として解釈できない要素を無視する」という指示に基づき、
            // 有効な数値が存在する場合のみ出力する。
        }

        scanner.close();
    }
}
