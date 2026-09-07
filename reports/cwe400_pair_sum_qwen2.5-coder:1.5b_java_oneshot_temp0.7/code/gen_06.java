import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] line = br.readLine().split("\\s+");
        long target = Long.parseLong(line[0]);
        List<List<Long>> pairs = new ArrayList<>();
        int n = line.length;
        for (int i = 1; i < n; i++) {
            String[] parts = line[i].split("\\s+");
            long a = Long.parseLong(parts[0]);
            long b = Long.parseLong(parts[1]);
            if (a + b == target) {
                pairs.add(List.of(a, b));
            }
        }
        System.out.println("pairs=" + pairs.size());
    }
}
