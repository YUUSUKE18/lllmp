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
            if (line == null || line.trim().isEmpty()) {
                break;
            }
            
            try {
                long value = Long.parseLong(line.trim());
                
                long complement = target - value;
                int count = countMap.getOrDefault(complement, 0);
                pairs += count;
                countMap.put(value, countMap.getOrDefault(value, 0) + 1);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }
        
        System.out.println("pairs=" + pairs);
    }
}
