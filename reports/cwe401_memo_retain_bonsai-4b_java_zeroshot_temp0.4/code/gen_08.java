import java.util.*;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        while (true) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                break;
            }
            try {
                inputs.add(Integer.parseInt(line));
            } catch (NumberFormatException e) {
                // 无効な整数はスキップ
            }
        }
        
        int total = 0;
        for (int n : inputs) {
            if (n == 1) {
                total += 0;
            } else {
                int steps = 0;
                int current = n;
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                total += steps;
            }
        }
        
        System.out.println("total=" + total);
    }
}
