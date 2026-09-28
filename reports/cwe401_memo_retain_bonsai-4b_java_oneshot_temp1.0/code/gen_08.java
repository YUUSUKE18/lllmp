import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            String trimmed = line.trim();
            if (trimmed.isEmpty()) continue;
            
            int[] numbers = trimmed.split("\\s+");
            for (String f : numbers) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (memo.containsKey(n)) continue;
                    int steps = 0;
                    int current = n;
                    if (current == 1) {
                        memo.put(current, 0);
                        continue;
                    }
                    
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        if (memo.containsKey(current)) {
                            memo.put(current, memo.get(current));
                            break;
                        }
                        steps++;
                        if (current > 1) {
                            memo.put(current, steps);
                            break;
                        }
                        current = (current > 2) ? (current * 3) : (current + 1);
                    }
                    if (current == 1) {
                        memo.put(1, steps);
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
            }
            total += memo.getOrDefault(1, 0);
        }
        System.out.println("total=" + total);
    }
}
