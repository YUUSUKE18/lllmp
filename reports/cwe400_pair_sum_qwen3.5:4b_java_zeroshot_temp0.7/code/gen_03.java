import java.util.Scanner;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) return;

        long target = scanner.nextLong();
        
        Map<Long, Integer> countMap = new HashMap<>();
        int pairs = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty() || !line.matches("-?\\d+")) {
                continue;
            }
            
            try {
                long num = Long.parseLong(line);
                
                long complement = target - num;
                int count = countMap.getOrDefault(complement, 0);
                pairs += count;
                
                countMap.put(num, countMap.getOrDefault(num, 0) + 1);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("pairs=" + pairs);
    }
}
