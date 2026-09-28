import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        if (line != null) {
            for (String s : line.trim().split("\\s+")) {
                if (s.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(s);
                    if (n == 1) {
                        total += 0;
                        continue;
                    }
                    int count = 0;
                    int current = n;
                    if (memo.containsKey(current)) {
                        count = memo.get(current);
                    } else {
                        do {
                            current = (current % 2 == 0) ? current / 2 : 3 * current + 1;
                            count++;
                        } while (current != 1);
                        memo.put(current, count);
                    }
                    total += count;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
