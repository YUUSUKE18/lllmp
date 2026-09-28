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
            String[] parts = line.split(",");
            for (String part : parts) {
                // 前後の空白を除去
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue;
                }

                try {
                    // 64bit整数としてパース
                    long n = Long.parseLong(trimmedPart);
                    count++;
                    if (first || n > max) {
                        max = n;
                        first = false;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        // 要素数と最大値を指定形式で出力
        System.out.println("count=" + count + " max=" + max);
    }
}
