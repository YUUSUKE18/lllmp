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

        // Read Target from the first valid integer line (ignoring empty/invalid lines)
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                target = Long.parseLong(line);
                targetFound = true;
                break;
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        if (!targetFound) {
            System.out.println("pairs=0");
            return;
        }

        Map<Long, Integer> map = new HashMap<>();
        long count = 0;

        // Read numbers from subsequent lines
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long num = Long.parseLong(line);
                long needed = target - num;
                if (map.containsKey(needed)) {
                    count += map.get(needed);
                }
                map.put(num, map.getOrDefault(num, 0) + 1);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        System.out.println("pairs=" + count);
    }
}
