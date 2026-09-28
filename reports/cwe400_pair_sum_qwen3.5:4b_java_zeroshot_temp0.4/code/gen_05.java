import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = reader.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long target = Long.parseLong(targetLine.trim());
        
        Set<Long> seen = new HashSet<>();
        long count = 0;
        
        while ((targetLine = reader.readLine()) != null) {
            String[] parts = targetLine.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                
                try {
                    long value = Long.parseLong(part);
                    
                    long complement = target - value;
                    if (seen.contains(complement)) {
                        count++;
                    }
                    seen.add(value);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
