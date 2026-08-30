import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long target = Long.parseLong(targetLine.trim());
        Set<Long> seen = new HashSet<>();
        long count = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            
            if (line.trim().isEmpty()) continue;
            
            try {
                long val = Long.parseLong(line.trim());
                long complement = target - val;
                
                if (seen.contains(complement)) {
                    count++;
                }
                
                seen.add(val);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
