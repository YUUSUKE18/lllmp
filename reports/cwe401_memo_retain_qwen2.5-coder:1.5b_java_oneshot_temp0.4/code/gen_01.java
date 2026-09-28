import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        while (true) {
            String line = br.readLine();
            if (line == null || line.isEmpty()) break;
            int num = Integer.parseInt(line.trim());
            if (num == 1) {
                total += 0;
                break;
            }
            int count = 0;
            while (num != 1) {
                if (memo.containsKey(num)) {
                    count += memo.get(num);
                    break;
                }
                if (num % 2 == 0) {
                    num /= 2;
                } else {
                    num = 3 * num + 1;
                }
                count++;
            }
            total += count;
            memo.put(num, count);
        }
        System.out.println("total=" + total);
    }
}
