import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        boolean first = true;
        int count = 0;
        int[] numbers = new int[1000000];
        int[] valid = new int[1000000];
        int[] validIndices = new int[1000000];

        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
        }

        for (int i = 0; i < 1000000; i++) {
            String numStr = br.readLine();
            if (numStr == null || numStr.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(numStr.trim());
                if (n >= 0 && n <= 2**63 - 1) {
                    valid[i] = 1;
                    validIndices[i] = i;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int pairs = 0;
        for (int i = 0; i < 1000000; i++) {
            if (valid[i]) {
                for (int j = i + 1; j < 1000000; j++) {
                    if (valid[j] && (numbers[i] + numbers[j]) == target) {
                        pairs++;
                    }
                }
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
