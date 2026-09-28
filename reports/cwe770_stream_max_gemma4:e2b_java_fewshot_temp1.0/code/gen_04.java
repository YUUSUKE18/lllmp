import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 max=0");
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            try {
                // 前後の空白を無視して整数に変換
                long n = Long.parseLong(part.trim());
                count++;
                if (n > max) {
                    max = n;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        if (!foundNumber) {
            // 数字が一つもなかった場合、count=0, max=0 または適切なデフォルト値を設定（ここではmaxの初期値に依存）
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
