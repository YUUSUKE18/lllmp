import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;
        
        if (line != null && !line.isEmpty()) {
            for (String w : line.split(",")) {
                String trimmed = w.trim();
                try {
                    if (!trimmed.isEmpty()) {
                        long n = Long.parseLong(trimmed);
                        count++;
                        if (first || n > max) {
                            max = n;
                            first = false;
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        } else if (!line.isEmpty() && line.length() == 0) {
             count++;
             max = Long.MIN_VALUE; 
             first = false;
         }

        System.out.println("count=" + count + " max=" + (first ? Long.MIN_VALUE : max));
    }
}
