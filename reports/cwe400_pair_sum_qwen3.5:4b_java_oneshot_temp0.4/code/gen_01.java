import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());
        Set<Long> seen = new HashSet<>();
        long count = 0;

        while ((String line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line.trim());
                
                if (target >= 0 && seen.contains(target - n)) {
                    count++;
                } else if (target < 0 && seen.contains(target - n)) {
                    // target is negative, e.g., target = -5, n = 3. target - n = -8.
                    // If we saw -8 before, then -8 + 3 = -5. Correct.
                    count++;
                } else if (target == 0 && n == 0) {
                    // Special case for zero: 0 + 0 = 0. 
                    // We need two distinct positions. If we see a 0, and previously saw a 0, it counts.
                    // The logic `seen.contains(target - n)` where target=0, n=0 -> seen.contains(0).
                    // This works if we add to set AFTER checking? No, we check BEFORE adding for current line.
                    // If we have one 0 in seen, and current is 0. target-n = 0. seen contains 0. count++. Correct.
                }

                seen.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("pairs=" + count);
    }
}
