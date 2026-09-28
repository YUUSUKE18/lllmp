import java.util.Scanner;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            System.out.println("pairs=0");
            return;
        }
        
        String targetLine = scanner.nextLine();
        long targetValue;
        
        try {
            targetValue = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }
        
        Map<Long, Integer> countMap = new HashMap<>();
        long pairsCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                long value = Long.parseLong(line.trim());
                
                long complement = targetValue - value;
                int count = countMap.getOrDefault(complement, 0);
                pairsCount += count;
                countMap.put(value, countMap.getOrDefault(value, 0) + 1);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("pairs=" + pairsCount);
    }
}
