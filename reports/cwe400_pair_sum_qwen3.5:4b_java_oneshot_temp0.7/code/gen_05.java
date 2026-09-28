import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());
        TreeMap<Long, Integer> map = new TreeMap<>();
        long count = 0;

        while ((targetLine = br.readLine()) != null) {
            if (targetLine.trim().isEmpty()) continue;
            try {
                long num = Long.parseLong(targetLine.trim());
                long complement = target - num;
                
                if (map.containsKey(complement)) {
                    count += map.get(complement);
                }
                map.put(num, map.getOrDefault(num, 0) + 1);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("pairs=" + count);
    }
}
