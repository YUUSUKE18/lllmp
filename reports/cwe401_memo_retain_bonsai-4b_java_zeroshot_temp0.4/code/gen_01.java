import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        try {
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
                    int steps = getSteps(n);
                    inputs.add(n);
                } catch (NumberFormatException e) {
                    continue;
                }
            }
            
            int total = 0;
            for (int n : inputs) {
                total += getSteps(n);
            }
            
            System.out.println("total=" + total);
        } catch (EOFException e) {
            e.printStackTrace();
        }
    }
    
    private static int getSteps(int n) {
        if (n == 1) {
            return 0;
        }
        
        if (memo.containsKey(n)) {
            return memo.get(n);
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
}
