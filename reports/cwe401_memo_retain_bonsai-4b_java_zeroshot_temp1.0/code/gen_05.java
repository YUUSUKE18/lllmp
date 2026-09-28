import java.util.*;

public class Main {
    static Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int total = 0;
        
        while (true) {
            try {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) continue;
                
                String[] tokens = line.trim().split("\\s+");
                if (tokens.length == 0) continue;
                
                int n = Integer.parseInt(tokens[0]);
                if (n == 1) {
                    total += 0;
                } else {
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (memo.containsKey(current)) {
                            steps = memo.get(current);
                        } else {
                            steps = 0;
                            current = (current % 2 == 0) ? current / 2 : 3 * current + 1;
                        }
                        memo.put(current, steps + 1);
                    }
                    total += steps;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
}
