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
        
        long targetValue;
        try {
            targetValue = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Set<Long> seen = new HashSet<>();
        long count = 0;
        
        String line;
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                try {
                    long val = Long.parseLong(part);
                    long needed = targetValue - val;
                    if (seen.contains(needed)) {
                        count++;
                    }
                    seen.add(val);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
