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
            for (String s : line.split(",")) {
                if (!s.trim().isEmpty()) {
                    try {
                        long n = Long.parseLong(s.trim());
                        count++;
                        if (first || n > max) {
                            first = false;
                            max = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解析できない場合は無視
                    }
                }
            }
        }
        
        System.out.println("count=" + count + " max=" + max);
    }
}
