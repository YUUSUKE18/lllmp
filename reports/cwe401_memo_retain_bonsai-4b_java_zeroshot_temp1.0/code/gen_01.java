import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> queries = new ArrayList<>();
        
        while (true) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                break;
            }
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) {
                    continue;
                }
                int steps = computeSteps(n);
                queries.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        int totalSteps = 0;
        for (int n : queries) {
            if (memo.containsKey(n)) {
                totalSteps += memo.get(n);
            } else {
                totalSteps += computeSteps(n);
                memo.put(n, totalSteps);
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
    
    private static int computeSteps(int n) {
        if (n == 1) {
            return 0;
        }
        
        int steps = 1;
        int current = n;
        
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
