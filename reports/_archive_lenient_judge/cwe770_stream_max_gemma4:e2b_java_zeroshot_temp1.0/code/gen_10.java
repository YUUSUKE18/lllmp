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
        boolean foundValidNumber = false;

        for (String part : parts) {
            // 前後の空白を無視し、カンマで区切られた要素を処理する
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                // 64bit整数の範囲内であることを確認（Long型は自動的に扱えるが、念のため）
                // 仕様上、値自体は64bitに収まるという前提なので、ここではそのまま処理する。

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

        // 要素が存在した場合のみ出力する（空の入力も考慮）
        if (count > 0) {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
