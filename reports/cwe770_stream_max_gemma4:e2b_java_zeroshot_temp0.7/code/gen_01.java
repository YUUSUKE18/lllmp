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
                // カンマで区切られたトークンを読み込む（カンマ区切りなので、スペースやカンマ自体が区切り文字になる可能性があるため、ここでは文字列として読み込んだ後、数値としてパースする）
                String token = tokenizer.nextToken().trim();
                if (token.isEmpty()) {
                    continue;
                }

                // 整数として解釈を試みる
                long value = Long.parseLong(token);

                // 要素数をカウント
                count++;

                // 最大値を更新
                if (!foundFirst || value > maxValue) {
                    maxValue = value;
                    foundFirst = true;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 空の入力があった場合（または数値が一つもなかった場合）、何も出力しないか、仕様に従う。
        // ここでは、読み込んだ有効な要素があれば出力する。もし要素が0個なら、count=0, max=適切な値（ここでは無視）となるが、
        // 実際には入力が空なら count=0 で処理が終わるため、何も出力しないのが自然。
        if (count > 0) {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
