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
        String[] numbers = new String[1000000];
        int[] nums = new int[1000000];
        int[] valid = new int[1000000];
        int[] pairs = new int[1000000];
        int[] idx = new int[1000000];
        int[] pairsCount = new int[1000000];
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        String inputLine = "";
        int n = 0;
        for (int i = 0; i < 1000000; i++) {
            inputLine = in.readLine();
            if (inputLine == null || inputLine.trim().isEmpty()) continue;
            try {
                int val = Integer.parseInt(inputLine.trim());
                if (val >= 0 && val <= 2**63 - 1) {
                    nums[i] = val;
                    valid[i] = 1;
                    if (val == target) {
                        count++;
                    }
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        int[] pairCount = new int[count];
        for (int i = 0; i < count; i++) {
            for (int j = i + 1; j < count; j++) {
                if (nums[i] + nums[j] == target) {
                    pairCount[i] += 1;
                    pairCount[j] += 1;
                }
            }
        }
        for (int i = 0; i < count; i++) {
            if (pairCount[i] > 0) {
                pairsCount[i] = pairCount[i] / 2;
            }
        }
        for (int i = 0; i < pairsCount.length; i++) {
            if (pairsCount[i] > 0) {
                pairsCount[i] *= 2;
            }
        }
        int pairsTotal = 0;
        for (int i = 0; i < pairsCount.length; i++) {
            pairsTotal += pairsCount[i];
        }
        System.out.println("pairs=" + pairsTotal);
    }
}
