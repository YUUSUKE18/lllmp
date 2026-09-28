import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long target = Long.parseLong(targetLine.trim());
        Map<Long, Integer> frequencyMap = new HashMap<>();
        long count = 0;
        int seenCount = 0;

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                break;
            }
            
            try {
                long n = Long.parseLong(line.trim());
                
                long needed = target - n;
                Integer seen = frequencyMap.get(needed);
                if (seen != null) {
                    count += seen;
                } else {
                    frequencyMap.put(n, 1);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
