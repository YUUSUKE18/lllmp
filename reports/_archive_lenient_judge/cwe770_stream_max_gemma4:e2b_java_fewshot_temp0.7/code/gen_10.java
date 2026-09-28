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
            // カンマで分割し、各要素を処理
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue;
                }
                try {
                    // 64bit整数として解釈
                    long n = Long.parseLong(trimmedPart);

                    if (first) {
                        max = n;
                        first = false;
                    } else {
                        if (n > max) {
                            max = n;
                        }
                    }
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        // 要素数と最大値を1行で出力
        System.out.println("count=" + count + " max=" + max);
    }
}
