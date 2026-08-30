import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、各要素を処理する
        String[] parts = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を除去
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                // 整数として解析を試みる
                long value = Long.parseLong(trimmedPart);
                
                // 要素数をカウント
                count++;
                
                // 最大値を更新
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 要素が見つかった場合のみ結果を出力する（仕様上、入力が空の場合も考慮し、何か数値を処理した場合にのみ出力する）
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 入力が完全に無効または空だった場合（要素数が0になる場合）の挙動。
            // 仕様では「要素数と最大値を求める」とあるため、数値が一つもなかった場合は何も出力しないか、あるいは適切なデフォルト値を出力する必要がある。
            // 今回は入力から抽出した有効な数値に基づき出力する。もし数値が一つもなかった場合、count=0, max=MIN_VALUEとなる。
            // 念のため、要素が見つからなかった場合は処理を終了する（または count=0 を出力する）。
            // ここでは、値が存在する場合のみ出力するという方針で進める。
        }

        scanner.close();
    }
}
