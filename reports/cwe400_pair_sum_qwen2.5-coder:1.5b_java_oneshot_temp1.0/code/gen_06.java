import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String target = br.readLine();
        int targetValue = Integer.parseInt(target);
        int pairs = 0;
        Map<Integer, Integer> seen = new HashMap<>();
        String line;
        while ((line = br.readLine()) != null) {
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int num = Integer.parseInt(f);
                    if (num > targetValue) {
                        if (seen.containsKey(num - targetValue)) {
                            pairs += seen.get(num - targetValue);
                        }
                    }
                    seen.put(num, seen.getOrDefault(num, 0) + 1);
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
