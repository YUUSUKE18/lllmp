import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 max=0");
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundValidNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    // 値は64bit整数に収まるという条件があるのでlongを使用する
                    long n = Long.parseLong(trimmedPart);
                    count++;
                    if (n > max) {
                        max = n;
                    }
                    foundValidNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        if (!foundValidNumber) {
            // 有効な整数が一つもなかった場合、count=0 max=0 とする（最大値の初期値に依存するが、ここでは安全のため）
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
