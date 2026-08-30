import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=-1"); // または適切なデフォルト値。ここでは空入力として0個、最大値は未定義だが、制約上大きな負の数を想定するが、ここではシンプルに0とする
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈を試みる
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedPart);
                count++;
                if (value > maxVal) {
                    maxVal = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 整数として有効な要素が一つもなかった場合
        if (!foundNumber) {
            // このケースの最大値の定義は仕様に明記されていないため、ここでは0個で最小値（例えば0）とするか、
            // または問題文の制約から仮定する。ここでは見つからなかった場合は count=0, max=-1 や 0 とする。
            // 問題文の例がないため、もし要素が存在しない場合は、最大値は意味を持たないが、計算された最大値として Long.MIN_VALUE を使用するのが自然かもしれない。
            // しかし、整数列を受け取ったのであれば、入力された数の数と最大値を報告する。何も読み取れなかったなら 0 個で最小の可能性を示す。
             System.out.println("count=0 max=-1"); // 何も読み取れなかった場合、maxは定義されないため、ここでは-1を暫定的に採用（もし入力が空なら）
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
