import java.util.*;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> queries = new ArrayList<>();
        
        while (true) {
            try {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) {
                    break;
                }
                String[] parts = line.split("\\s+");
                if (parts.length == 0) {
                    break;
                }
                int n = Integer.parseInt(parts[0]);
                queries.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
            
            int handCount = computeHandCount(n);
            memo.put(n, handCount);
        }
        
        int total = 0;
        for (int n : queries) {
            total += memo.get(n);
        }
        
        System.out.println("total=" + total);
    }
    
    public static int computeHandCount(int n) {
        if (n == 1) {
            return 0;
        }
        
        int handCount = 1;
        int current = n;
        
        while (current != 1) {
            if (current % 2 == 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            handCount++;
        }
        
        return handCount;
    }
}
