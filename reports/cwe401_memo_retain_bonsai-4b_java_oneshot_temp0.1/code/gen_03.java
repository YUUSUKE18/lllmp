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
            
            String[] parts = trimmed.split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(part);
                    if (memo.containsKey(n)) continue;
                    
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                        if (current > 320000000000000000L) break;
                    }
                    if (current == 1) {
                        memo.put(n, steps);
                        total += steps;
                    }
                } catch (NumberFormatException e) {}
            }
        }
        System.out.println("total=" + total);
    }
}
