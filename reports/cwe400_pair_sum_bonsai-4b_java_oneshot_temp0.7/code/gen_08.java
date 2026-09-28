import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
        }
        int count = 0;
        int[] numbers = new int[1000000];
        int[] seen = new int[1000000];
        boolean first = true;
        int index = 0;
        for (int i = 0; i < 1000000; i++) {
            String input = br.readLine();
            if (input == null || input.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(input.trim());
                if (n >= target) {
                    if (seen[n] == 0) {
                        seen[n] = 1;
                        count++;
                    } else {
                        count--;
                    }
                } else {
                    seen[n] = 0;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("pairs=" + count);
    }
}
