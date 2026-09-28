import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }

        long target;
        try {
            target = Long.parseLong(line.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Map<Long, Long> map = new HashMap<>();
        long count = 0;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                long num = Long.parseLong(line);
                long needed = target - num;
                
                if (map.containsKey(needed)) {
                    count += map.get(needed);
                }
                map.put(num, map.getOrDefault(num, 0L) + 1);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        System.out.println("pairs=" + count);
    }
}
