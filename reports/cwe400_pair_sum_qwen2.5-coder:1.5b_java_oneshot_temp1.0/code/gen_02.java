import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] lines = br.readLine().trim().split("\\s+");

        int target = Integer.parseInt(lines[0]);
        int[] numbers = Arrays.stream(lines, 1, lines.length).mapToInt(Integer::parseInt).toArray();

        int pairs = 0;
        for (int i = 0; i < numbers.length; i++) {
            for (int j = i + 1; j < numbers.length; j++) {
                if (numbers[i] + numbers[j] == target) {
                    pairs++;
                }
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
