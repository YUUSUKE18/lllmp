import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            // 入力が空の場合は何も出力しない（または仕様に合わせた適切な処理。ここでは何も行わないとする）
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、要素を処理する
        String[] parts = line.split(",");
        
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白をトリム
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > max) {
                    max = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視する
            }
        }

        // 要素が存在し、数値が一つでも見つかった場合のみ出力する
        if (count > 0 && foundNumber) {
            System.out.println("count=" + count + " max=" + max);
        } else if (count == 0) {
             // 数値が一つもなかった場合は、count=0, max=? の形式で出力する。
             // ここでは、入力されたカンマ区切りの要素がすべて無効であった場合を想定し、count=0を出力する。
             System.out.println("count=0 max=-1"); // 最大値が存在しない場合は、安全のため-1などを設定しても良いが、ここでは単に数値を処理した結果として count=0 で終了させる
        }
    }
}
