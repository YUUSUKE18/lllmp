import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    total += 0;
                    continue;
                }
                int count = 0;
                int current = n;
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        count += memo.get(current);
                        break;
                    }
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                    memo.put(current, count);
                }
                total += count;
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be parsed as integers
            }
        }
        System.out.println("total=" + total);
    }
}
