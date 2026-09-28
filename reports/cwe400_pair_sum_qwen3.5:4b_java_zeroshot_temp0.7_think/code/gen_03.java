import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // Read target from the first line
        String line = br.readLine();
        if (line == null) return;
        
        long target;
        try {
            target = Long.parseLong(line.trim());
        } catch (NumberFormatException e) {
            // If the first line is not a valid integer, we cannot proceed as per spec.
            return;
        }

        Map<Long, Long> map = new HashMap<>();
        long count = 0;

        // Read subsequent lines (2nd line onwards)
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            try {
                long num = Long.parseLong(trimmedLine);
                
                // Check if the complement exists in the map
                long complement = target - num;
                Long freq = map.get(complement);
                if (freq != null) {
                    count += freq;
                }
                
                // Update frequency of current number
                map.put(num, map.getOrDefault(num, 0L) + 1);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        System.out.println("pairs=" + count);
    }
}
