import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        Set<Long> distinctInts = new HashSet<>();
        
        if (line != null) {
            for (String w : line.split(",")) {
                String trimmed = w.trim();
                if (trimmed.isEmpty()) continue;
                try {
                    long n = Long.parseLong(trimmed);
                    distinctInts.add(n);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }
        
        int count = distinctInts.size();
        long sum = 0;
        for (long n : distinctInts) {
            sum += n;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
