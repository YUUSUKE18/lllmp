import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n == 1) {
                    total += 0;
                    continue;
                }
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    continue;
                }
                int count = 0;
                int current = n;
                while (current != 1) {
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                }
                memo.put(n, count);
                total += count;
            } catch (NumberFormatException e) {
                // Ignore invalid lines
            }
        }
        System.out.println("total=" + total);
    }
}
