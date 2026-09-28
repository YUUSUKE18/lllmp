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
        boolean foundFirst = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈できるか試みる
            try {
                // トークナイザを使って、カンマ区切りの文字列から整数を抽出する
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue;
                }

                long value = Long.parseLong(trimmedPart);

                if (!foundFirst) {
                    // 最初の要素を個数として設定する（仕様の解釈に基づき、最初の要素をcountとする）
                    count = value;
                    maxValue = value;
                    foundFirst = true;
                } else {
                    // それ以降の要素を最大値と比較する
                    if (value > maxValue) {
                        maxValue = value;
                    }
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // データが一つも読み取れなかった場合は何もしない（または適切なデフォルト値を設定するが、ここでは入力がないと仮定してスキップ）
        if (foundFirst) {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
