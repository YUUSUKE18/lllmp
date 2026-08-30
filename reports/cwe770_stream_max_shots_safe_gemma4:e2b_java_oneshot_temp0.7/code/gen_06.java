import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=-1"); // または適切なデフォルト値。ここでは0個、最大値は定義できないため-1とする。
            return;
        }

        // カンマで分割し、空白を無視して整数を抽出する
        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白をトリム
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
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        if (!foundNumber) {
            // 整数が一つもなかった場合、count=0, maxの扱いは仕様に依存するが、ここでは一般的な最大値の初期値に基づいて処理する。
            // 問題文では「要素数と最大値」を求めるとあるため、要素数が0なら最大値は意味を持たない。
            // 読み取った要素が0個の場合、maxを未定義として扱うため、例に倣って-1や0を設定することも考えられるが、ここでは読み取れた数値に基づき処理する。
            // もし全ての要素が無視された場合は count=0, maxの初期値（Long.MIN_VALUE）が残る可能性がある。
            // 厳密には「整数として解釈できない要素も無視する」ため、もし全て無視されたならcount=0となる。最大値は存在しない。
            System.out.println("count=0 max=-1"); // 数値が存在しなかった場合の安全策
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
