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
        boolean first = true;
        while ((line = br.readLine()) != null) {
            String[] numbers = line.trim().split("\\s+");
            for (String f : numbers) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (first) { first = false; }
                    else {
                        if (count.containsKey(n)) {
                            pairs += count.get(n);
                            count.put(n, count.get(n) + 1);
                        } else {
                            count.put(n, 1);
                        }
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
