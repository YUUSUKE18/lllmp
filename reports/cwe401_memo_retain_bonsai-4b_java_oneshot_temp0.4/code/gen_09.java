import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder result = new StringBuilder();
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            String trimmed = line.trim();
            if (trimmed.isEmpty()) continue;
            
            String[] tokens = trimmed.split("\\s+");
            for (String token : tokens) {
                if (token.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(token);
                    if (n == 1) {
                        result.append("0\n");
                        continue;
                    }
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        if (memo.containsKey(current)) {
                            steps += memo.get(current);
                        } else {
                            memo.put(current, 1);
                            steps += 1;
                        }
                    }
                    result.append("steps=" + steps);
                    if (steps > 0) result.append(" for n=" + n);
                } catch (NumberFormatException e) {}
            }
        }
        System.out.println("total=" + result.toString().trim());
    }
}
