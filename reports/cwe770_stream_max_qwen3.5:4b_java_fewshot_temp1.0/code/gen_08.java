import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;
        
        if (line != null && !line.isEmpty()) {
            for (String token : line.split(",")) {
                String trimmed = token.trim();
                if (!trimmed.isEmpty()) {
                    try {
                        long n = Long.parseLong(trimmed);
                        count++;
                        if (first || n > max) {
                            max = n;
                            first = false;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                }
            }
        } else {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        if (!first) {
            System.out.println("count=" + count + " max=" + max);
        } else {
            // 要素が全くない場合の出力（または MAX_LONG のデフォルト値を使用）
            System.out.println("count=0 max=" + Long.MIN_VALUE); 
        }
    }
}
