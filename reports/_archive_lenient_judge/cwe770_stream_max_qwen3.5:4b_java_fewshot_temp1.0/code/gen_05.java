import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long max = Long.MIN_VALUE;
        
        if (line != null && !line.isEmpty()) {
            for (String s : line.split(",")) {
                if (!s.trim().isEmpty()) {
                    try {
                        long val = Long.parseLong(s.trim());
                        count++;
                        if (count == 1 || val > max) {
                            max = val;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        } else if (!line.isEmpty()) {
             for (String s : line.split(",")) {
                 if (!s.trim().isEmpty()) {
                     try {
                         long val = Long.parseLong(s.trim());
                         count++;
                         if (count == 1 || val > max) {
                             max = val;
                         }
                     } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                 }
             }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
