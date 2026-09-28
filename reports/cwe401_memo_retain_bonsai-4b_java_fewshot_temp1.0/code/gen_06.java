import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        
        while ((String line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) continue;
            
            java.util.Arrays.asList(trimmedLine.split("\\s+")).forEach(s -> {
                try {
                    int n = Integer.parseInt(s);
                    if (n == 1) {
                        total += 0;
                    } else if (n % 2 == 0) {
                        int current = n / 2;
                        while (current != 1) {
                            if (memo.containsKey(current)) {
                                current = memo.get(current);
                            } else {
                                current = 3 * current + 1;
                                memo.put(current, current);
                            }
                        }
                    } else {
                        int current = 3 * n + 1;
                        while (current != 1) {
                            if (memo.containsKey(current)) {
                                current = memo.get(current);
                            } else {
                                current = 3 * current + 1;
                                memo.put(current, current);
                            }
                        }
                    }
                    total += memo.get(1);
                } catch (NumberFormatException e) {}
            });
        }
        System.out.println("total=" + total);
    }
}
