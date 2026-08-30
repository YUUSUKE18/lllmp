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

        // カンマで分割し、空白を無視して整数としてパースする
        String[] tokens = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            // トークンから前後の空白を除去して整数に変換を試みる
            String trimmedToken = token.trim();
            if (!trimmedToken.isEmpty()) {
                try {
                    long number = Long.parseLong(trimmedToken);
                    count++;
                    if (number > max) {
                        max = number;
                    }
                    foundNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        if (!foundNumber) {
            // 整数が見つからなかった場合（全て無効なトークンだった場合）
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
