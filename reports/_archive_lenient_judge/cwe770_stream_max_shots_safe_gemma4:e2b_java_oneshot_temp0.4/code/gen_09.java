import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        while (st.hasMoreTokens()) {
            try {
                long num = Long.parseLong(st.nextToken());
                count++;
                if (num > maxVal) {
                    maxVal = num;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 無効なトークンは無視する（仕様に従う）
            }
        }

        if (!foundNumber) {
            // 整数として解釈できる要素が一つもなかった場合、count=0, max=0とするか、あるいは空の入力に対する適切な処理。
            // ここでは、読み込んだ有効な数の数と最大値を報告する。もし何も読み込まれなかった場合は count=0, max=0 とする。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
