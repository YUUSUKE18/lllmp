import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                char c = (char) buf[i];
                if (c == ',') {
                    count++;
                } else if (c != ' ' && c != '\t' && c != '\n' && c != '\r') {
                    try {
                        long val = Long.parseLong(new String(buf, i, 1));
                        if (!foundFirst || val > max) {
                            max = val;
                            foundFirst = true;
                        }
                    } catch (NumberFormatException e) {
                        // Ignore elements that are not valid integers
                    }
                }
            }
        }

        // カンマで終わる場合、最後の要素を処理するロジックが必要だが、
        // 上記の読み取り方法はカンマや空白文字の前後関係に依存するため、
        // より堅牢なトークン化を行う必要がある。
        // ここでは、入力ストリーム全体を文字列として読み込み、分割する方法を採用する。

        // 再度実装（より標準的なトークン化アプローチ）
        java.util.Scanner scanner = new java.util.Scanner(in);
        StringBuilder result = new StringBuilder();
        long currentCount = 0;
        long currentMax = Long.MIN_VALUE;
        boolean isFirst = true;

        while (scanner.hasNext()) {
            String token = scanner.next();
            if (!token.isEmpty()) {
                try {
                    long value = Long.parseLong(token);
                    currentCount++;
                    if (isFirst || value > currentMax) {
                        currentMax = value;
                        isFirst = false;
                    }
                } catch (NumberFormatException e) {
                    // Ignore non-integer tokens if they are present, although the prompt implies
                    // only integers separated by commas. We rely on the structure implied by the example.
                }
            }
        }

        System.out.println("count=" + currentCount + " max=" + currentMax);
    }
}
