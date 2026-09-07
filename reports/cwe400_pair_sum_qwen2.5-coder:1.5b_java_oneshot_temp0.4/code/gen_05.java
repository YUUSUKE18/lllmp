import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String target = br.readLine();
        int count = 0;
        Map<Integer, Integer> map = new HashMap<>();
        while (true) {
            String line = br.readLine();
            if (line == null || line.isEmpty()) break;
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (map.containsKey(n)) {
                        map.put(n, map.get(n) + 1);
                    } else {
                        map.put(n, 1);
                    }
                    if (map.get(n) >= 2) {
                        count++;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
