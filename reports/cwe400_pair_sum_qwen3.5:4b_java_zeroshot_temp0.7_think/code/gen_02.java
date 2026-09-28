import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

        String line = reader.readLine();
        if (line == null) return;

        long target;
        try {
            target = Long.parseLong(line.trim());
        } catch (NumberFormatException e) {
            // If the first line is not a valid integer (though spec implies it is), stop.
            return;
        }

        Map<Long, Integer> map = new HashMap<>();
        long count = 0;

        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long val = Long.parseLong(line);
                long needed = target - val;
                Integer freq = map.get(needed);
                if (freq != null) {
                    count += freq;
                }
                int currentFreq = map.getOrDefault(val, 0) + 1;
                map.put(val, currentFreq);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        System.out.println("pairs=" + count);
    }
}
