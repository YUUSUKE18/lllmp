import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long max = Long.MIN_VALUE;
        
        if (line != null && !line.isEmpty()) {
            boolean first = true;
            for (String part : line.split(",")) {
                String trimmed = part.trim();
                if (!trimmed.isEmpty()) {
                    try {
                        long val = Long.parseLong(trimmed);
                        count++;
                        if (first || val > max) {
                            max = val;
                            first = false;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視する
                    }
                }
            }
        }
        
        System.out.println("count=" + count + " max=" + max);
    }
}
