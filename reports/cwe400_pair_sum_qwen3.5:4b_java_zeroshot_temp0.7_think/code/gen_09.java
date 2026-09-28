import java.util.Scanner;
import java.util.Map;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        long target = 0;
        try {
            target = Long.parseLong(line.trim());
        } catch (NumberFormatException e) {
            return;
        }
        
        Map<Long, Integer> countMap = new HashMap<>();
        long pairs = 0;
        
        while (scanner.hasNextLine()) {
            line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            
            try {
                long num = Long.parseLong(line.trim());
                long complement = target - num;
                
                if (countMap.containsKey(complement)) {
                    pairs += countMap.get(complement);
                }
                
                countMap.put(num, countMap.getOrDefault(num, 0) + 1);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("pairs=" + pairs);
    }
}
