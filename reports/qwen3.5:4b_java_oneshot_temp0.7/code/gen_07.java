import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        
        Set<Integer> distinctNumbers = new HashSet<>();
        String[] parts = line.split(",");
        
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(part);
                distinctNumbers.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        long count = distinctNumbers.size();
        long sum = 0L;
        for (int n : distinctNumbers) {
            sum += n;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
