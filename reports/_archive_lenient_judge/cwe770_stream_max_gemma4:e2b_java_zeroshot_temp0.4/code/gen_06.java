import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        StringTokenizer tokenizer = new StringTokenizer(line);

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundFirst = false;

        while (tokenizer.hasMoreTokens()) {
            try {
                // カンマ区切りの整数を読み込む
                String token = tokenizer.nextToken().trim();
                if (token.isEmpty()) {
                    continue;
                }
                long value = Long.parseLong(token);

                // 要素数をカウント
                count++;

                // 最大値を更新
                if (value > maxValue) {
                    maxValue = value;
                }
                foundFirst = true;

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 要素が見つからなかった場合は何もしない（count=0, max=MIN_VALUEのまま）
        if (foundFirst) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 入力が空または無効な値のみだった場合、仕様に厳密に従うため、
            // 読み取れた有効な要素がない場合は何も出力しないか、あるいは0と最小値を出すか。
            // ここでは、読み取れた有効な要素が0個の場合もcount=0, max=Long.MIN_VALUEとして出力する。
             System.out.println("count=" + count + " max=" + maxValue);
        }

        scanner.close();
    }
}
