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

        // 要素が見つかった場合のみ結果を出力する（仕様上、入力が空でもエラーを出す必要はないが、ここでは読み取ったものに基づいて出力する）
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 整数が一つもなかった場合の処理（仕様に明記されていないが、安全のため）
            // このケースでは count=0, max=?? となるが、最大値の初期値設定により問題ない。
            // ただし、入力が完全に無効な場合、count=0, max=Long.MIN_VALUE が出力されることになる。
            // 厳密に「要素数と最大値を求める」という指示に従い、読み取れたものに基づいて出力する。
            System.out.println("count=0 max=" + Long.MIN_VALUE); // または単に何も出力しないことも考えられるが、ここでは計算結果を出力する。
        }

        scanner.close();
    }
}
