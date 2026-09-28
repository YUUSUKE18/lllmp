import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1. Read the target value T
        String lineT = br.readLine();
        if (lineT == null) {
            System.out.println("pairs=0");
            return;
        }
        long target;
        try {
            target = Long.parseLong(lineT.trim());
        } catch (NumberFormatException e) {
            // If the first line is invalid, exit or handle as error (assuming valid input based on spec)
            System.out.println("pairs=0");
            return;
        }

        // Map to store the frequency of numbers encountered so far
        Map<Long, Long> counts = new HashMap<>();
        long pairCount = 0;
        
        String line;
        // 2. Process subsequent lines (the sequence of numbers)
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // Ignore empty lines
            }

            try {
                long num = Long.parseLong(trimmedLine);
                
                // Check for pairs: We are looking for a previous number X such that X + num = target.
                long required = target - num;
                
                // If 'required' has been seen before, add its count to the total pairs.
                if (counts.containsKey(required)) {
                    pairCount += counts.get(required);
                }
                
                // Update the frequency map for the current number
                counts.put(num, counts.getOrDefault(num, 0L) + 1);
                
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
                continue;
            }
        }

        // 3. Output the result
        System.out.println("pairs=" + pairCount);
    }
}
