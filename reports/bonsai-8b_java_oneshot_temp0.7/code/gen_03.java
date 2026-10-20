import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        java.util.Set<Integer> unique = new java.util.HashSet<>();
        java.util.Map<Integer, Long> count = new java.util.HashMap<>();
        java.util.Map<Integer, Long> sum = new java.util.HashMap<>();
        if (line != null) {
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    unique.add(n);
                    count.put(n, count.getOrDefault(n, 0L) + 1);
                    sum.put(n, sum.getOrDefault(n, 0L) + n);
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count.size() + " sum=" + sum.values().stream().mapToLong(Long::doubleValue).sum());
    }
}
