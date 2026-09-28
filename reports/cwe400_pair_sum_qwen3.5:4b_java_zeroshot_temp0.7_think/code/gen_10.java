import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        String line = reader.readLine();
        if (line == null) return;
        
        long target;
        try {
            target = Long.parseLong(line.trim());
        } catch (NumberFormatException e) {
            return;
        }

        Set<Long> seen = new HashSet<>();
        long count = 0;

        while ((line = reader.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            try {
                long val = Long.parseLong(trimmedLine);
                
                if (seen.contains(target - val)) {
                    count++;
                }
                
                seen.add(val);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("pairs=" + count);
    }
}
