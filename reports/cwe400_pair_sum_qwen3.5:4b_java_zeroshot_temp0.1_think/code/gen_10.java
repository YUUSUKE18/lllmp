import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            return;
        }
        
        long target = Long.parseLong(line.trim());
        Map<Long, Long> map = new HashMap<>();
        long pairs = 0;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(line);
                long needed = target - num;
                Long count = map.get(needed);
                if (count != null) {
                    pairs += count;
                }
                long currentCount = map.getOrDefault(num, 0L);
                map.put(num, currentCount + 1);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
