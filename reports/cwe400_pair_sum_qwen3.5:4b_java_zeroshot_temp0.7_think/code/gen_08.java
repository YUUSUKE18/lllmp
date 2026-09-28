import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // Read target value from the first line
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            return;
        }
        
        long target;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            // If the first line is not a valid integer, we cannot proceed.
            return;
        }

        Map<Long, Long> countMap = new HashMap<>();
        long pairCount = 0;

        // Read subsequent lines (lines 2 onwards)
        String line;
        while ((line = br.readLine()) != null) {
            String trimmed = line.trim();
            if (trimmed.isEmpty()) {
                continue; // Ignore empty lines
            }

            try {
                long num = Long.parseLong(trimmed);
                long complement = target - num;
                
                pairCount += countMap.getOrDefault(complement, 0L);
                
                countMap.put(num, countMap.getOrDefault(num, 0L) + 1);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        System.out.println("pairs=" + pairCount);
    }
}
