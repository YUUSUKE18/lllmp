import java.util.*;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        try {
            while (true) {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) continue;
                
                if (line.matches("^\\d+$")) {
                    int n = Integer.parseInt(line);
                    int steps = computeSteps(n);
                    inputs.add(steps);
                } else {
                    break;
                }
            }
            
            int total = inputs.stream().mapToInt(Integer::intValue).sum();
            System.out.println("total=" + total);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            scanner.close();
        }
    }
    
    private static int computeSteps(int n) {
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
}
