import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null) return;
        
        long target;
        try {
            target = Long.parseLong(line.trim());
        } catch (NumberFormatException e) {
            return;
        }

        Set<Long> seen = new HashSet<>();
        long count = 0;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long num = Long.parseLong(line);
                long needed = target - num;
                if (seen.contains(needed)) {
                    count++;
                }
                seen.add(num);
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be interpreted as integers
            }
        }

        System.out.println("pairs=" + count);
    }
}
