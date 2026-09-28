import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();
        
        // 1 行に1 以上の整数が入力されるように読み取る
        String line = scanner.nextLine();
        String[] tokens = line.split("\\s+");
        for (String token : tokens) {
            try {
                int n = Integer.parseInt(token);
                inputs.add(n);
            } catch (NumberFormatException e) {
                // 解釈できない行は無視
                continue;
            }
        }
        
        Scanner output = new Scanner(System.out);
        long total = 0;
        
        for (int n : inputs) {
            if (n == 1) {
                total += 0;
            } else {
                int current = n;
                int steps = 0;
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
        
        output.println("total=" + total);
        output.close();
    }
}
