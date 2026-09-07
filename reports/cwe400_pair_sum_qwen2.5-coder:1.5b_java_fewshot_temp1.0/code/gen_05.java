import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int goal = Integer.parseInt(line);
        int[] arr = Arrays.stream(br.readLine().split("\\s+"))
                           .mapToInt(Integer::parseInt)
                           .toArray();

        int pairs = 0;
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[i] + arr[j] == goal) {
                    pairs++;
                }
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
