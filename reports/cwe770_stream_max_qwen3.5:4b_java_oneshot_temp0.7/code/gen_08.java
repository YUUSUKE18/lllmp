import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Integer.MIN_VALUE);
            return;
        }

        int count = 0;
        long maxLongValue = Long.MIN_VALUE;
        
        String[] parts = line.split(",");
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    long val = Long.parseLong(part.trim());
                    if (val > maxLongValue) {
                        maxLongValue = val;
                    }
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        System.out.println("count=" + count + " max=" + maxLongValue);
    }
}
