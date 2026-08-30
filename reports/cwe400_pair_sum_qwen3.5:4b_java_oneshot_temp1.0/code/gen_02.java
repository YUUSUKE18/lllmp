import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) return;
        
        long target = Long.parseLong(line1.trim());
        
        Set<Long> seen = new HashSet<>();
        long count = 0;
        
        while ((line1 = br.readLine()) != null) {
            line1 = line1.trim();
            if (line1.isEmpty()) continue;
            
            try {
                long num = Long.parseLong(line1);
                long complement = target - num;
                
                if (seen.contains(complement)) {
                    count++;
                }
                seen.add(num);
            } catch (NumberFormatException e) {
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
