import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = 0;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Set<Long> seen = new HashSet<>();
        int count = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long num = Long.parseLong(line);
                
                // target - num が seen に存在するか確認
                long complement = target - num;
                if (seen.contains(complement)) {
                    count++;
                }
                
                seen.add(num);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
