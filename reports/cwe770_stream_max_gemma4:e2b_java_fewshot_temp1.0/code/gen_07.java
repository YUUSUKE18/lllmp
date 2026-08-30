import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;

        if (line != null) {
            // カンマで分割し、各要素を処理する
            for (String token : line.split(",")) {
                String trimmedToken = token.trim();
                if (trimmedToken.isEmpty()) {
                    continue;
                }
                try {
                    // 64bit整数としてパース
                    long n = Long.parseLong(trimmedToken);
                    count++;
                    if (first || n > max) {
                        max = n;
                        first = false;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        // 要素数と最大値を1行で出力
        System.out.println("count=" + count + " max=" + max);
    }
}
