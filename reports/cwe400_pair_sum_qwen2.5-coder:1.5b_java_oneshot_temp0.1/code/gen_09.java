import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int pairs = 0;
        boolean first = true;
        int[] numbers = new int[1000000];
        int count = 0;
        while ((line = br.readLine()) != null) {
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (first) {
                        numbers[count++] = n;
                        first = false;
                    } else {
                        for (int i = 0; i < count; i++) {
                            if (numbers[i] + n == target) {
                                pairs++;
                            }
                        }
                        numbers[count++] = n;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
