import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        // カンマで分割してトークンを処理
        String[] tokens = line.split(",");
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                // 64bit整数として解釈
                long n = Long.parseLong(trimmedToken);
                count++;
                if (n > maxVal) {
                    maxVal = n;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        if (!foundNumber) {
            // 有効な整数が一つもなかった場合、count=0, max=0 または適切なデフォルト値を出力する。
            // 仕様上、入力されたものから計算するため、もし数値が一つもなければ count=0, max=0 とする。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
