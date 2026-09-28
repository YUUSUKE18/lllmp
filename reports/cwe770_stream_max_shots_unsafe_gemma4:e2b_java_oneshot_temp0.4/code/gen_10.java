import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割
        String[] parts = line.split(",");

        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
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
                // 整数として解釈できない要素は無視
            }
        }

        if (!foundNumber) {
            // 有効な整数が一つもなかった場合、count=0, max=0 または適切なデフォルト値を出力する。
            // 問題の制約から、入力が空または無効な場合を考慮する必要があるが、ここでは読み込んだ有効な数の情報に基づいて出力する。
            // 読み込んだ要素数(parts.length)ではなく、実際にパースできた整数のみをカウントすべきか？
            // 仕様：「カンマ区切りの整数列を受け取ります」→ カンマで区切られたものから整数を抽出する。
            // ここでは、抽出できた整数の個数と最大値を求める。

            // 読み込んだ要素が全て無効だった場合 (例: "a,b,c") は count=0, max=0 とするのが安全。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
