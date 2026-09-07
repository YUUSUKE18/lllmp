import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int target = Integer.parseInt(br.readLine());
        int pairs = 0;
        int[] numbers = new int[100000];
        int numCount = 0;
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            if (line.isEmpty() || !line.matches("[0-9]+")) continue;
            numbers[numCount++] = Integer.parseInt(line);
        }
        for (int i = 0; i < numCount - 1; i++) {
            for (int j = i + 1; j < numCount; j++) {
                if (numbers[i] + numbers[j] == target) {
                    pairs++;
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
