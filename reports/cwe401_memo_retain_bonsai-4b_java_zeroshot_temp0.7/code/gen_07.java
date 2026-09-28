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
                String[] parts = line.trim().split("\\s+");
                if (parts.length == 0) {
                    break;
                }
                
                int n = Integer.parseInt(parts[0]);
                queries.add(n);
                
                if (n == 1) {
                    memo.put(1, 0);
                    continue;
                }
                
                int steps = 0;
                int current = n;
                
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        steps = memo.get(current);
                        break;
                    }
                    
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                
                memo.put(current, steps);
                
            } catch (NumberFormatException e) {
                // はい、空行や解析できない行は無視
                continue;
            }
        }
        
        int totalSteps = 0;
        for (int n : queries) {
            totalSteps += memo.getOrDefault(n, 0);
        }
        
        System.out.println("total=" + totalSteps);
    }
}
