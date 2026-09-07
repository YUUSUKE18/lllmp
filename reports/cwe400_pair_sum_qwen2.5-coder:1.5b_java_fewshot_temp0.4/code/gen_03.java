import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int pairs = 0;
        int[] numbers = new int[1000000];
        int count = 0;
        while ((line = br.readLine()) != null) {
            count++;
            if (count > 1000000) break;
            for (String num : line.trim().split("\\s+")) {
                if (!num.trim().isEmpty()) {
                    numbers[count] = Integer.parseInt(num);
                }
            }
        }
        for (int i = 0; i < count - 1; i++) {
            for (int j = i + 1; j < count; j++) {
                if (numbers[i] + numbers[j] == target) {
                    pairs++;
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
