import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=-1"); // または適切な初期値。ここでは安全のため0と-1とする
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundAny = false;

        for (String part : parts) {
            // 前後の空白を無視して整数に変換を試みる
            try {
                // trim()で前後の空白を除去
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    long value = Long.parseLong(trimmedPart);
                    count++;
                    if (value > max) {
                        max = value;
                    }
                    foundAny = true;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する（仕様を満たす）
            }
        }

        // データが一つも存在しなかった場合、maxの扱いを考慮して出力
        if (!foundAny) {
            // 要素が0個の場合、最大値は定義されないが、安全のため count=0 max=なしとする。
            // 課題の制約上、もしデータが全て無効なら count=0 で良い。最大値は問題に依存するが、ここでは-1や0など特定の値を出力してもよい。
            // 最小値がLong.MIN_VALUEなので、存在しない場合は count=0 max=0 (またはマイナス無限大を示す値)とします。
            System.out.println("count=0 max=-1"); // または問題の制約に従う
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
