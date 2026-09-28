import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        int pairs = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
            int[] nums = new int[1000000];
            int count = 0;
            for (int i = 0; i < 1000000; i++) {
                String f = br.readLine();
                if (f == null || f.trim().isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f.trim());
                    if (n == target) {
                        pairs++;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
