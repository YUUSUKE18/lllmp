import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            try {
                count = Integer.parseInt(line);
            } catch (NumberFormatException e) {
            }
        }
        int n = 0;
        while ((n = Integer.parseInt(br.readLine())) != -1) {
            count++;
            sum += n;
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
