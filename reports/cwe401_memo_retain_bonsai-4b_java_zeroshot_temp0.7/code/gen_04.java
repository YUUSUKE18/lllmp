import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
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
            } catch (NumberFormatException e) {
                // 未効率的な処理を回避
                break;
            }
            
        }
        
        long total = 0;
        for (int q : queries) {
            total += solve(q);
        }
        
        System.out.println("total=" + total);
    }
    
    private static int solve(int n) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        if (n == 1) {
            memo.put(1, 0);
            return 0;
        }
        
        int steps = 0;
        int current = n;
        
        // 64bit 整数対応のループを避免し、反复処理をメモ化
        while (current != 1) {
            if (current % 2 == 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        memo.put(n, steps);
        return steps;
    }
}
