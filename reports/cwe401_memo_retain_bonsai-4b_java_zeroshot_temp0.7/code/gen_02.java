import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        while (true) {
            try {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) {
                    continue;
                }
                inputs.add(Integer.parseInt(line.trim()));
            } catch (NumberFormatException e) {
                continue;
            }
            
            long total = 0;
            for (int n : inputs) {
                total += solve(n);
            }
            
            System.out.println("total=" + total);
            break;
        }
        
        scanner.close();
    }
    
    private static long solve(int n) {
        if (n == 1) {
            return 0;
        }
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int next = (n % 2 == 0) ? n / 2 : 3 * n + 1;
        
        int steps = 1 + solve(next);
        memo.put(n, steps);
        
        return steps;
    }
}
