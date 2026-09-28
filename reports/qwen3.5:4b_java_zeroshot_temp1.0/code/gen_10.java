import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String[] tokens = line.split(",");
        Set<Integer> uniqueIntegers = new HashSet<>();
        
        for (String token : tokens) {
            String trimmed = token.trim();
            if (trimmed.isEmpty()) {
                continue;
            }
            
            try {
                int value = Integer.parseInt(trimmed);
                uniqueIntegers.add(value);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }
        
        int count = uniqueIntegers.size();
        long sum = 0;
        for (int value : uniqueIntegers) {
            sum += value;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
