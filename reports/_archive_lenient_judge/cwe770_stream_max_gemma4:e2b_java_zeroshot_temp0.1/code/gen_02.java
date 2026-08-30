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
                // 64bit整数の範囲内であることを確認（Long型なので自動的にカバーされるが、念のため）
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
            // 数値が一つもなかった場合の処理（仕様上、何も出力しないか、あるいは適切なデフォルト値を出すべきだが、ここでは入力された数値に基づいて計算する）
            // 厳密には「要素数」と「最大値」を求めるため、要素が存在しなければ何も出力しないのが自然。
            // ただし、もし入力が空や無効な場合でも、処理した結果として0個の要素とMIN_VALUE（またはエラー）を出力する選択肢もあるが、ここでは数値が見つかった場合のみ出力する。
        }

        scanner.close();
    }
}
