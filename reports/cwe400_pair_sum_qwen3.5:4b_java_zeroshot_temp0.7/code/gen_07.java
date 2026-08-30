import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLong()) {
            return;
        }
        long target = scanner.nextLong();
        
        long count = 0;
        Set<Long> seen = new HashSet<>();
        
        while (scanner.hasNext()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                long num = Long.parseLong(line.trim());
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
