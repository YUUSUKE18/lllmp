import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int pairs = 0;
        int i = 0, j = 0;
        while ((i = br.readLine()) != null) {
            String num = i.trim();
            if (num.isEmpty()) continue;
            try {
                int n = Integer.parseInt(num);
                if (n == target) pairs++;
                i++;
                j++;
            } catch (NumberFormatException e) {
            }
            i++;
        }
        System.out.println("pairs=" + pairs);
    }
}
