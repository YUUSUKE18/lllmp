import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        Map<Integer, Integer> count = new HashMap<>();
        int pairs = 0;
        int n = 0;
        while ((n = br.read()) != -1) {
            if (n == '\n') continue;
            int num = Integer.parseInt(String.valueOf((char)n));
            if (count.containsKey(num)) {
                pairs += count.get(num);
                count.put(num, count.get(num) + 1);
            } else {
                count.put(num, 1);
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
