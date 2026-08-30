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
                if (!w.trim().isEmpty()) {
                    try {
                        long n = Long.parseLong(w.trim());
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
            count = 0;
            max = Long.MIN_VALUE;
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
