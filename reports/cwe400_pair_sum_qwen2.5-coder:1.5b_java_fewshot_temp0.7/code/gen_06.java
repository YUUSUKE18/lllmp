import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line);
        int pairs = 0;
        boolean first = true;
        int i = 0;
        int[] arr = new int[1000000];
        while ((line = br.readLine()) != null) {
            for (String n : line.trim().split("\\s+")) {
                if (n.isEmpty()) continue;
                try {
                    int num = Integer.parseInt(n);
                    if (first) {
                        arr[i++] = num;
                        first = false;
                    } else {
                        arr[i++] = num;
                        if (arr[i - 1] + arr[i - 2] == target) pairs++;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
