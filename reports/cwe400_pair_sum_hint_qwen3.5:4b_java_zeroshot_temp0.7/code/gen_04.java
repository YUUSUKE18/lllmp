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

        long target = Long.parseLong(targetLine.trim());

        Map<Long, Integer> counts = new HashMap<>();
        int pairsCount = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                long num = Long.parseLong(line);
                
                long complement = target - num;
                
                Integer count = counts.get(complement);
                if (count != null) {
                    pairsCount += count;
                }
                
                counts.put(num, counts.getOrDefault(num, 0) + 1);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("pairs=" + pairsCount);
    }
}
