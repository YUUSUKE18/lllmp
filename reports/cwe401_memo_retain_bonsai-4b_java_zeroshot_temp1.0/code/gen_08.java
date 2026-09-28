import java.util.*;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> queries = new ArrayList<>();
        
        System.out.println(); // 空行
        while (true) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                break;
            }
            try {
                int n = Integer.parseInt(line);
                queries.add(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        Scanner out = new Scanner(System.out);
        int total = 0;
        
        for (int n : queries) {
            int steps = computeSteps(n);
            total += steps;
        }
        
        System.out.println("total=" + total);
        out.close();
    }
    
    public static int computeSteps(int n) {
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
