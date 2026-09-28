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

        // カンマで分割してトークン化
        String[] tokens = line.split(",");

        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            // 前後の空白を無視（split(",")で区切られたものには通常不要だが念のため）
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(trimmedToken);
                count++;
                if (value > max) {
                    max = value;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視
            }
        }

        if (!foundNumber) {
            // 有効な整数が一つもなかった場合、count=0 max=0 または適切なデフォルト値を設定する。
            // ここでは、入力された要素数（区切り文字で分けた数）ではなく、実際に読み取れた数値の数をカウントする。
            // 仕様に基づき「読み取った整数」のみを考慮する。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
