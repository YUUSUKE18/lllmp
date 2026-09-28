import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());
        Map<Long, Integer> countMap = new HashMap<>();
        int pairs = 0;

        for (String line = br.readLine(); line != null; line = br.readLine()) {
            String[] tokens = line.trim().split("\\s+");
            for (String token : tokens) {
                if (token.isEmpty()) continue;
                try {
                    long n = Long.parseLong(token);
                    long complement = target - n;
                    
                    Integer c = countMap.get(complement);
                    if (c != null) {
                        pairs += c;
                    }
                    countMap.put(n, countMap.getOrDefault(n, 0) + 1);
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
