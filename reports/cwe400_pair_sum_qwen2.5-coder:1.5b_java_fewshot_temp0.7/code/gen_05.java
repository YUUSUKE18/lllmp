import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        Set<Integer> set = new HashSet<>();
        int pairs = 0;
        int i = 1;
        while ((line = br.readLine()) != null) {
            if (line.isEmpty()) continue;
            int n = Integer.parseInt(line.trim());
            if (n == target) {
                pairs++;
            } else {
                if (set.contains(target - n)) {
                    pairs++;
                }
                set.add(n);
            }
            i++;
        }
        System.out.println("pairs=" + pairs);
    }
}
