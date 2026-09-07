import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line);
        Set<Integer> seen = new HashSet<>();
        int pairs = 0;
        int i = 0;
        while ((i = br.read()) != -1) {
            if (i == '\n') continue;
            String numStr = br.readLine();
            if (numStr == null || numStr.isEmpty()) continue;
            try {
                int num = Integer.parseInt(numStr);
                if (seen.contains(target - num)) {
                    pairs++;
                }
                seen.add(num);
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
