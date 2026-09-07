import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = Long.parseLong(line.trim());
        int pairs = 0;
        int i = 0, j = 1;
        while (j < target) {
            if (i < target) {
                i++;
            } else {
                j++;
            }
            if (i < target && j < target) {
                pairs++;
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
