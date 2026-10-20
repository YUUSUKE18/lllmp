import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        java.util.HashSet<Integer> uniqueNumbers = new java.util.HashSet<>();
        java.util.Map<Integer, Long> countMap = new java.util.Map<>();
        java.util.Map<Integer, Long> sumMap = new java.util.Map<>();
        if (line != null) {
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    uniqueNumbers.add(n);
                    countMap.put(n, countMap.getOrDefault(n, 0L) + 1);
                    sumMap.put(n, sumMap.getOrDefault(n, 0L) + n);
                } catch (NumberFormatException e) {
                }
            }
        }
        java.util.Map<Integer, Long> result = new java.util.Map<>();
        for (Integer key : uniqueNumbers) {
            result.put(key, countMap.getOrDefault(key, 0L));
            result.put(key, sumMap.getOrDefault(key, 0L));
        }
        System.out.println("count=" + result.size() + " sum=" + result.values().stream().mapToLong(Long::doubleValue).sum());
    }
}
