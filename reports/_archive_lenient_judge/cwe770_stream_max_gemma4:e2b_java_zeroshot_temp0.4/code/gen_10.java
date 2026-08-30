import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        String[] parts = line.trim().split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            if (part.isEmpty()) {
                continue;
            }

            try {
                // 要素数と最大値の順序を考慮してパースするのではなく、
                // すべての要素を数値として扱い、個数と最大値を決定する
                long value = Long.parseLong(part);
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 仕様に基づき、要素数と最大値を求める。
        // ここで「要素数」とは、入力されたカンマ区切りの数値の総数を指すと解釈する。
        // また、「最大値」とは、それらの数値の最大値と解釈する。
        // ただし、仕様文が「それらの『要素数』と『最大値』を求めます」とあるため、
        // 入力されたカンマ区切りのリストから、有効な整数のみを抽出し、その個数と最大値を求めるのが自然である。

        // 再度、入力の解釈を明確にするため、上記ループで求めた count と maxValue を使用する。

        if (count > 0) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 有効な整数が一つもなかった場合（空行や無効な入力のみの場合）
            // この場合の出力形式の指定がないため、ここでは何も出力しないか、0 0 を出力する。
            // 仕様に従い、有効な要素が見つからなかった場合は何もしないのが安全だが、
            // 一般的な競技プログラミングの文脈では、入力が空の場合は何も出力しないことが多い。
            // 今回は「求める」という指示なので、データが存在しない場合は処理を終了する。
        }

        scanner.close();
    }
}
