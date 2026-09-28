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
        
        long target;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Set<Long> seen = new HashSet<>();
        long count = 0;
        
        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            
            try {
                long num = Long.parseLong(line);
                long complement = target - num;
                if (seen.contains(complement)) {
                    count++;
                }
                seen.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
