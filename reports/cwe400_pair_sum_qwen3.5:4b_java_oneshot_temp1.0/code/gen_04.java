import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());
        
        Set<Long> seen = new HashSet<>();
        int pairs = 0;

        for (String line : br.lines().toArray(new String[0])) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line);
                // Check if target - n has been seen before
                long needed = target - n;
                if (seen.contains(needed)) {
                    pairs++;
                }
                // Add current number to the set
                seen.add(n);
            } catch (NumberFormatException e) {
                // Skip invalid lines
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
