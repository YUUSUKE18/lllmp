import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null) return;
        
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
            String trimmed = line.trim();
            if (trimmed.isEmpty()) continue;
            
            try {
                long val = Long.parseLong(trimmed);
                
                long complement = target - val;
                count += map.getOrDefault(complement, 0L);
                map.put(val, map.getOrDefault(val, 0L) + 1);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視します。
            }
        }

        System.out.println("pairs=" + count);
    }
}
