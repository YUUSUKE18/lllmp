import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    private static final java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int total = 0;
        if (line != null) {
            String[] tokens = line.trim().split("\\s+");
            for (String token : tokens) {
                if (token.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(token);
                    int steps = 0;
                    if (n == 1) steps = 0;
                    else {
                        int current = n;
                        while (current != 1) {
                            if (memo.containsKey(current)) {
                                steps = memo.get(current);
                            } else {
                                int next = (current % 2 == 0) ? current / 2 : 3 * current + 1;
                                steps = steps + 1;
                                memo.put(current, steps);
                            }
                            current = next;
                        }
                    }
                    total += steps;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
