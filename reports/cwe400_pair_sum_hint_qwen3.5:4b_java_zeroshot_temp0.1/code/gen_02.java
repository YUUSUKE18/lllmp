import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = reader.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long targetValue;
        try {
            targetValue = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Map<Long, Integer> frequencyMap = new HashMap<>();
        int count = 0;
        
        String line;
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                long value = Long.parseLong(line.trim());
                
                long complement = targetValue - value;
                int occurrences = frequencyMap.getOrDefault(complement, 0);
                count += occurrences;
                
                frequencyMap.put(value, frequencyMap.getOrDefault(value, 0) + 1);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
