import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = Long.parseLong(line.trim());
        int pairs = 0;
        int i = 0;
        int j = 1;
        while (j < target) {
            if (i == j) j++;
            else if (i == target - j) i++;
            else {
                if (i < target - j) i++;
                else j++;
            }
            pairs++;
        }
        System.out.println("pairs=" + pairs);
    }
}
