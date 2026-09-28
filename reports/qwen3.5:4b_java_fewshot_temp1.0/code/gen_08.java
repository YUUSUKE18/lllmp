import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        Set<Integer> uniqueIntegers = new HashSet<>();
        long sum = 0;
        
        if (line != null) {
            for (String part : line.split(",")) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                try {
                    int n = Integer.parseInt(part);
                    uniqueIntegers.add(n);
                    sum += n;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }
        
        System.out.println("count=" + uniqueIntegers.size() + " sum=" + sum);
    }
}
