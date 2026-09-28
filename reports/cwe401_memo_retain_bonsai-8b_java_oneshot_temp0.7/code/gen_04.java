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
                        System.out.println("total=" + total);
                        return;
                    }
                    if (memo.containsKey(n)) {
                        System.out.println("total=" + total);
                        return;
                    }
                    int count = 0;
                    int current = n;
                    while (current != 1) {
                        count++;
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                    }
                    memo.put(n, count);
                    total += count;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("total=" + total);
    }
}
