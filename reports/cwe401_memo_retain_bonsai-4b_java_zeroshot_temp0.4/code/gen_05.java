import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
    public static int solve(int n) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        if (n == 1) {
            memo.put(1, 0);
            return 0;
        }
        
        int steps = 1;
        int current = n;
        
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
        }
        
        memo.put(n, steps);
        return steps;
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        
        while (true) {
            try {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) continue;
                int n = Integer.parseInt(line.trim());
                numbers.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        int totalSteps = 0;
        for (int n : numbers) {
            totalSteps += solve(n);
        }
        
        System.out.println("total=" + totalSteps);
    }
}
