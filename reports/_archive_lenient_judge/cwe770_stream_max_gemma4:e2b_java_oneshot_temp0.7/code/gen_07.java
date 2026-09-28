import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) continue;

            try {
                long number = Long.parseLong(trimmedPart);
                count++;
                if (number > max) {
                    max = number;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        if (!foundNumber) {
            // 整数が一つもなかった場合、count=0, max=0 または適切な初期値を出力する。
            // 問題の指示から「要素数と最大値」を求めるため、整数が見つからなかった場合は count=0, max=0 とするのが自然か。
            // ただし、もし入力が "a,b" のような場合、count=0, max=0 が適切。ここでは 0 を出力する。
             System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + max);
        }
    }
}
