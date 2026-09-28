import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Set<Long> seen = new HashSet<>();
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long target = 0;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }
        
        int pairs = 0;
        while ((targetLine = br.readLine()) != null) {
            if (targetLine.trim().isEmpty()) {
                continue;
            }
            
            long num;
            try {
                num = Long.parseLong(targetLine.trim());
            } catch (NumberFormatException e) {
                continue;
            }
            
            long complement = target - num;
            if (seen.contains(complement)) {
                pairs++;
            }
            
            seen.add(num);
        }
        
        System.out.println("pairs=" + pairs);
    }
}
