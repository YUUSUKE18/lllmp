import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        String line = scanner.nextLine();
        
        // カンマで分割し、空白を無視して整数としてパースする
        String[] parts = line.split(",");
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundValidNumber = false;

        for (String part : parts) {
            // 前後の空白を除去
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }
            
            try {
                long value = Long.parseLong(trimmedPart);
                // 64bit整数の範囲に収まることを確認（Long型なので自動的にチェックされるが、念のため）
                // 仕様に基づき、値が正しく解釈されたもののみを考慮する。
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundValidNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 少なくとも一つの有効な整数が見つかった場合のみ出力する（空入力の場合を考慮）
        if (foundValidNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 入力が完全に無効な場合、何も出力しないか、あるいは0 0 のようなデフォルト値を出すか。
            // 仕様では「要素数と最大値」を求めるため、有効なデータがない場合は何を出力するか明確でないが、
            // データが存在しない場合は、ここでは何も出力しない（またはcount=0 max=... となる）として処理する。
            // 厳密に「要素数と最大値」を求められたので、要素が存在しなければ count=0, max=-infinity (Long.MIN_VALUE) のような状態になるが、
            // ここでは単純にパースできたもののみをカウントする。有効な整数が見つからなかった場合は何も出力しない方針とする。
        }

        scanner.close();
    }
}
