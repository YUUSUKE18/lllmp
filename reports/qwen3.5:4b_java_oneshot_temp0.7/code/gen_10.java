import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        if (line != null && !line.isEmpty()) {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(part);
                    uniqueNumbers.add(n);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }
        
        long count = uniqueNumbers.size();
        long sum = 0;
        for (int n : uniqueNumbers) {
            sum += n;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
