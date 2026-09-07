import java.util.HashMap;

public class Main {
    public static void main(String[] args) throws Exception {
        HashMap<Integer, Integer> memo = new HashMap<>();
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        while (true) {
            String line = br.readLine();
            if (line == null || line.isEmpty()) break;
            int n = Integer.parseInt(line);
            if (memo.containsKey(n)) {
                total += memo.get(n);
            } else {
                int count = 0;
                while (n != 1) {
                    count++;
                    if (n % 2 == 0) {
                        n /= 2;
                    } else {
                        n = 3 * n + 1;
                    }
                    if (memo.containsKey(n)) {
                        count += memo.get(n);
                        break;
                    } else {
                        memo.put(n, count);
                    }
                }
                total += count;
            }
        }
        System.out.println("total=" + total);
    }
}
