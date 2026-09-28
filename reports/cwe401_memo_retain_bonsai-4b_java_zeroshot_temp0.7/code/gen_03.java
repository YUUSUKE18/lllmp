import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
    public static int calculateStep(int n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        
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
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        while (true) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            try {
                inputs.add(Integer.parseInt(line));
            } catch (NumberFormatException e) {
                continue;
            }
            if (inputs.size() >= inputs.size() - 1) break;
        }
        
        long totalSteps = 0;
        for (int n : inputs) {
            totalSteps += calculateStep(n);
        }
        
        System.out.println("total=" + totalSteps);
    }
}
