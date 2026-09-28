import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int pairs = 0;
        int[] numbers = new int[1000000];
        int index = 0;
        if (line != null) {
            for (int i = 0; i < 1000000; i++) {
                line = br.readLine();
                if (line == null) break;
                String f = line.trim();
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (n == target || n == target + target) {
                        pairs++;
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
