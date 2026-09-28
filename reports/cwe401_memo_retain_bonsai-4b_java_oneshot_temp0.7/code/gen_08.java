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
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) continue;
            
            String[] parts = trimmedLine.split("\\s+");
            for (String f : parts) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (n <= 0) continue;
                    int steps = 0;
                    int current = n;
                    if (memo.containsKey(current)) {
                        steps = memo.get(current);
                    } else {
                        if (current == 1) {
                            steps = 0;
                            memo.put(1, 0);
                        } else if (current % 2 == 0) {
                            current = current / 2;
                            steps = steps + 1;
                        } else {
                            current = 3 * current + 1;
                            steps = steps + 1;
                        }
                        if (current == 1) {
                            memo.put(current, steps);
                        }
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
                total += steps;
            }
        }
        System.out.println("total=" + total);
    }
}
