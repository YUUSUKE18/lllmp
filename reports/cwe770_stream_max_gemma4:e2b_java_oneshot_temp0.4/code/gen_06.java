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

        // カンマで分割して整数列を取得
        String[] parts = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                // 64bit整数として解釈
                long n = Long.parseLong(trimmedPart);
                count++;
                if (n > maxValue) {
                    maxValue = n;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        if (!foundNumber) {
            // 整数が一つもなかった場合、count=0, max=0 または適切な値を出力する。
            // 仕様上、空の入力に対する挙動が明記されていないため、ここでは読み込んだ有効な要素数と最大値を出す。
            // 要素が0個の場合、maxは初期値(Long.MIN_VALUE)になる可能性があるが、
            // 整数として解釈できたものが0個ならcount=0, max=0とするのが自然。
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}
