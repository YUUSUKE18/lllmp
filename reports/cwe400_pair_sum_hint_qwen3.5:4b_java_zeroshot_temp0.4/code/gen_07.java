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

        Map<Long, Integer> countMap = new HashMap<>();
        int pairs = 0;

        while (true) {
            String line = reader.readLine();
            if (line == null) break;

            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long value = Long.parseLong(line);
                
                long needed = target - value;
                if (countMap.containsKey(needed)) {
                    pairs += countMap.get(needed);
                }
                countMap.put(value, countMap.getOrDefault(value, 0) + 1);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
