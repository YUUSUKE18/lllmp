import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String target = br.readLine();
        int pairs = 0;
        Map<Integer, Integer> count = new HashMap<>();
        int i = 1;
        while (i <= target) {
            String line = br.readLine();
            if (line == null || line.isEmpty()) continue;
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    count.put(n, count.getOrDefault(n, 0) + 1);
                } catch (NumberFormatException e) {
                }
            }
            i++;
        }
        for (int key : count.keySet()) {
            if (count.get(key) >= 2) {
                pairs += count.get(key) * (count.get(key) - 1) / 2;
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
