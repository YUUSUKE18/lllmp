import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line;
        long target = 0;
        boolean targetFound = false;
        
        // Read Target (First valid integer)
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                target = Long.parseLong(line);
                targetFound = true;
                break;
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers for target
            }
        }
        
        if (!targetFound) {
            System.out.println("pairs=0");
            return;
        }

        Map<Long, Long> countMap = new HashMap<>();
        long pairs = 0;
        
        // Read Numbers (Subsequent valid integers)
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                long num = Long.parseLong(line);
                long needed = target - num;
                if (countMap.containsKey(needed)) {
                    pairs += countMap.get(needed);
                }
                countMap.put(num, countMap.getOrDefault(num, 0L) + 1);
            } catch (NumberFormatException e) {
                // Ignore invalid lines
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
