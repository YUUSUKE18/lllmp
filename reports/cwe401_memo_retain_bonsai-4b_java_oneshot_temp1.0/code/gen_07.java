import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        
        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) break;
            String[] parts = line.trim().split("\\s+");
            for (String f : parts) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (memo.containsKey(n)) continue;
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        if (memo.containsKey(current)) break;
                        if (current > 2**63) break; // 32bit に収まりないための安全
                        memo.put(current, memo.get(current) + 1);
                        steps++;
                    }
                    if (memo.containsKey(1)) {
                        total += steps;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
