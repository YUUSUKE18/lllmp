import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = reader.readLine();
        if (targetLine == null || targetLine.isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Map<Long, Integer> countMap = new HashMap<>();
        int pairs = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                long value = Long.parseLong(line);
                long needed = target - value;
                
                Integer stored = countMap.get(needed);
                if (stored != null) {
                    pairs += stored;
                    countMap.put(value, countMap.getOrDefault(value, 0) + 1);
                } else {
                    countMap.put(value, 1);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
