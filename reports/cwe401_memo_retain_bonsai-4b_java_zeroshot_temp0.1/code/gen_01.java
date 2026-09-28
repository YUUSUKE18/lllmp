import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        // 入力を読み取る
        while (true) {
            try {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) continue;
                String[] parts = line.trim().split("\\s+");
                if (parts.length == 0) continue;
                
                List<Integer> numbers = new ArrayList<>();
                for (String part : parts) {
                    if (part.matches("\\d+")) {
                        numbers.add(Integer.parseInt(part));
                    }
                }
                
                if (numbers.isEmpty()) break;
                
                // 各数に対して計算
                int total = 0;
                for (int n : numbers) {
                    total += computeSteps(n);
                }
                
                // 出力
                System.out.println("total=" + total);
            } catch (EOFException e) {
                break;
            }
        }
        
        scanner.close();
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
